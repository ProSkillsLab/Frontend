import { useState, useRef, useEffect } from 'react';
import { Box, Paper, Typography, TextField, IconButton, Fab, Zoom, Avatar, CircularProgress, Tooltip, keyframes } from '@mui/material';
import { Robot, PaperPlaneTilt, X, ArrowDown, Sparkle } from 'phosphor-react';
import ReactMarkdown from 'react-markdown';
import { DERMABOT_CONFIG, DERMABOT_SYSTEM_PROMPT, DERMABOT_ACK } from '../config/prompt';

// Types & Config
interface Message { role: 'user' | 'assistant'; content: string; }
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const API_URL = import.meta.env.VITE_GEMINI_API_URL;

// Animations
const pulse = keyframes`0%, 100% { transform: scale(1); } 50% { transform: scale(1.05); }`;
const float = keyframes`0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); }`;
const typing = keyframes`0%, 60%, 100% { opacity: 0.3; } 30% { opacity: 1; }`;

// Shared Styles
const styles = {
    chatWindow: {
        position: 'fixed', bottom: { xs: 80, sm: 100 }, right: { xs: 16, sm: 24 },
        width: { xs: 'calc(100vw - 32px)', sm: 380 }, maxWidth: 400, height: { xs: 480, sm: 520 },
        borderRadius: 4, overflow: 'hidden', display: 'flex', flexDirection: 'column', zIndex: 1300,
        background: 'linear-gradient(180deg, #fff 0%, #f8fafc 100%)', border: '1px solid rgba(25,118,210,0.1)',
    },
    header: {
        background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)',
        color: 'white', p: 2, display: 'flex', alignItems: 'center', gap: 1.5,
    },
    messageArea: {
        flex: 1, overflowY: 'auto', p: 2, display: 'flex', flexDirection: 'column', gap: 1.5,
        '&::-webkit-scrollbar': { width: 6 }, '&::-webkit-scrollbar-thumb': { bgcolor: 'rgba(0,0,0,0.2)', borderRadius: 3 },
    },
    inputArea: { p: 2, borderTop: '1px solid rgba(0,0,0,0.08)', bgcolor: 'white', display: 'flex', gap: 1, alignItems: 'flex-end' },
    sendBtn: { bgcolor: '#1976d2', color: 'white', width: 44, height: 44, '&:hover': { bgcolor: '#1565c0' }, '&.Mui-disabled': { bgcolor: '#e0e0e0', color: '#999' } },
    markdown: {
        fontSize: '0.9rem', lineHeight: 1.6, wordBreak: 'break-word',
        '& p': { m: 0, mb: 1 }, '& p:last-child': { mb: 0 }, '& strong': { fontWeight: 700 },
        '& ul, & ol': { m: 0, pl: 2, mb: 1 }, '& li': { mb: 0.5 },
        '& code': { bgcolor: 'rgba(0,0,0,0.05)', px: 0.5, borderRadius: 0.5, fontFamily: 'monospace' },
    },
};

// Message Bubble Component
const MessageBubble = ({ msg }: { msg: Message }) => {
    const isUser = msg.role === 'user';
    return (
        <Box sx={{ display: 'flex', justifyContent: isUser ? 'flex-end' : 'flex-start', animation: 'fadeIn 0.3s ease-out', '@keyframes fadeIn': { from: { opacity: 0, transform: 'translateY(10px)' }, to: { opacity: 1, transform: 'translateY(0)' } } }}>
            <Box sx={{ maxWidth: '85%', p: 1.5, borderRadius: isUser ? '16px 16px 4px 16px' : '16px 16px 16px 4px', bgcolor: isUser ? '#1976d2' : 'white', color: isUser ? 'white' : '#333', boxShadow: isUser ? '0 2px 8px rgba(25,118,210,0.3)' : '0 2px 8px rgba(0,0,0,0.08)', border: !isUser ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                {isUser ? (
                    <Typography sx={{ fontSize: '0.9rem', lineHeight: 1.6, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>{msg.content}</Typography>
                ) : (
                    <Box sx={styles.markdown}><ReactMarkdown>{msg.content}</ReactMarkdown></Box>
                )}
            </Box>
        </Box>
    );
};

// Typing Indicator Component
const TypingIndicator = () => (
    <Box sx={{ display: 'flex', justifyContent: 'flex-start' }}>
        <Box sx={{ bgcolor: 'white', p: 1.5, borderRadius: '16px 16px 16px 4px', boxShadow: '0 2px 8px rgba(0,0,0,0.08)', display: 'flex', gap: 0.5 }}>
            {[0, 1, 2].map(i => <Box key={i} sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: '#1976d2', animation: `${typing} 1.4s infinite`, animationDelay: `${i * 0.2}s` }} />)}
        </Box>
    </Box>
);

// Quick Action Chip
const QuickAction = ({ label, onClick }: { label: string; onClick: () => void }) => (
    <Box onClick={onClick} sx={{ px: 1.5, py: 0.75, borderRadius: 3, bgcolor: '#e3f2fd', color: '#1976d2', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', '&:hover': { bgcolor: '#1976d2', color: 'white', transform: 'scale(1.02)' } }}>
        {label}
    </Box>
);

export default function DermaBot() {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', content: DERMABOT_CONFIG.welcomeMessage }]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [showScroll, setShowScroll] = useState(false);
    const endRef = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => endRef.current?.scrollIntoView({ behavior: 'smooth' });

    useEffect(() => { if (isOpen) scrollToBottom(); }, [messages, isOpen]);

    const handleScroll = () => {
        if (containerRef.current) {
            const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
            setShowScroll(scrollHeight - scrollTop - clientHeight > 100);
        }
    };

    const sendMessage = async () => {
        if (!input.trim() || loading) return;
        const userMsg = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
        setLoading(true);

        try {
            const history = messages.slice(-4).map(m => ({ role: m.role === 'user' ? 'user' : 'model', parts: [{ text: m.content }] }));
            const contents = [
                { role: 'user', parts: [{ text: DERMABOT_SYSTEM_PROMPT }] },
                { role: 'model', parts: [{ text: DERMABOT_ACK }] },
                ...history,
                { role: 'user', parts: [{ text: userMsg }] },
            ];

            const res = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'x-goog-api-key': API_KEY },
                body: JSON.stringify({ contents, generationConfig: DERMABOT_CONFIG.generationConfig }),
            });

            if (!res.ok) throw new Error(`API Error: ${res.status}`);
            const data = await res.json();
            const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || DERMABOT_CONFIG.errorMessages.parseError;
            setMessages(prev => [...prev, { role: 'assistant', content: reply }]);
        } catch (err) {
            console.error('DermaBot:', err);
            setMessages(prev => [...prev, { role: 'assistant', content: DERMABOT_CONFIG.errorMessages.connectionError }]);
        } finally {
            setLoading(false);
        }
    };

    const handleKey = (e: React.KeyboardEvent) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); } };

    return (
        <>
            {/* Chat Window */}
            <Zoom in={isOpen}>
                <Paper elevation={12} sx={styles.chatWindow}>
                    {/* Header */}
                    <Box sx={styles.header}>
                        <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', width: 44, height: 44, animation: `${float} 3s ease-in-out infinite` }}>
                            <Robot size={26} weight="duotone" />
                        </Avatar>
                        <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontWeight: 700, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                {DERMABOT_CONFIG.name} <Sparkle size={16} weight="fill" color="#FFD700" />
                            </Typography>
                            <Typography sx={{ fontSize: '0.75rem', opacity: 0.9 }}>{DERMABOT_CONFIG.title}</Typography>
                        </Box>
                        <IconButton onClick={() => setIsOpen(false)} sx={{ color: 'white' }}><X size={22} weight="bold" /></IconButton>
                    </Box>

                    {/* Messages */}
                    <Box ref={containerRef} onScroll={handleScroll} sx={styles.messageArea}>
                        {messages.map((msg, i) => <MessageBubble key={i} msg={msg} />)}
                        {loading && <TypingIndicator />}
                        <div ref={endRef} />
                    </Box>

                    {/* Scroll Button */}
                    <Zoom in={showScroll}>
                        <IconButton onClick={scrollToBottom} size="small" sx={{ position: 'absolute', bottom: 140, right: 16, bgcolor: 'white', boxShadow: 2, '&:hover': { bgcolor: '#f5f5f5' } }}>
                            <ArrowDown size={18} />
                        </IconButton>
                    </Zoom>

                    {/* Quick Actions */}
                    {messages.length === 1 && (
                        <Box sx={{ px: 2, pb: 1, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                            {DERMABOT_CONFIG.quickActions.map((a, i) => <QuickAction key={i} label={a.label} onClick={() => setInput(a.query)} />)}
                        </Box>
                    )}

                    {/* Input */}
                    <Box sx={styles.inputArea}>
                        <TextField fullWidth multiline maxRows={3} placeholder="Ask about DermaAI..." value={input} onChange={e => setInput(e.target.value)} onKeyDown={handleKey} disabled={loading}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3, bgcolor: '#f8fafc', fontSize: '0.9rem', '& fieldset': { borderColor: 'rgba(0,0,0,0.1)' }, '&:hover fieldset': { borderColor: '#1976d2' }, '&.Mui-focused fieldset': { borderColor: '#1976d2' } } }}
                        />
                        <IconButton onClick={sendMessage} disabled={!input.trim() || loading} sx={styles.sendBtn}>
                            {loading ? <CircularProgress size={20} sx={{ color: 'white' }} /> : <PaperPlaneTilt size={22} weight="fill" />}
                        </IconButton>
                    </Box>
                </Paper>
            </Zoom>

            {/* FAB */}
            <Tooltip title="Chat with DermaBot" placement="left" arrow>
                <Fab onClick={() => setIsOpen(!isOpen)} sx={{ position: 'fixed', bottom: { xs: 16, sm: 24 }, right: { xs: 16, sm: 24 }, width: 60, height: 60, background: isOpen ? 'linear-gradient(135deg, #ef5350 0%, #c62828 100%)' : 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)', color: 'white', boxShadow: '0 4px 20px rgba(25,118,210,0.4)', animation: isOpen ? 'none' : `${pulse} 2s ease-in-out infinite`, transition: 'all 0.3s', '&:hover': { boxShadow: '0 6px 28px rgba(25,118,210,0.5)', transform: 'scale(1.05)' }, zIndex: 1300 }}>
                    {isOpen ? <X size={26} weight="bold" /> : <Robot size={28} weight="duotone" />}
                </Fab>
            </Tooltip>
        </>
    );
}
