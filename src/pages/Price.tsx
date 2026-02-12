import { Box, Container, Typography, Paper, Button, Chip, Grid, AppBar, Toolbar, IconButton, CircularProgress } from '@mui/material';
import { Check, Lightning, Star, Crown, List as MenuIcon } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { UserButton, useUser } from '@clerk/clerk-react';
import LeftNavbar, { drawerWidth } from '../components/LeftNavbar';
import Navbar from '../components/Navbar';
import { loadStripe } from '@stripe/stripe-js';

const s = { font: { fontFamily: '"DM Sans", sans-serif' } };
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const plans = [
    {
        name: 'Free',
        price: '0',
        scans: '5',
        period: '/unlimited',
        icon: <Star size={32} weight="duotone" />,
        color: '#64B5F6',
        gradient: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
        features: ['5 skin scans per month', 'Basic AI analysis', 'View scan history', 'Email support'],
        buttonText: 'Current Plan',
        buttonVariant: 'outlined' as const,
        popular: false,
        id: 'free',
    },
    {
        name: 'Pro',
        price: '25',
        scans: '50',
        period: '/unlimited',
        icon: <Lightning size={32} weight="duotone" />,
        color: '#7C4DFF',
        gradient: 'linear-gradient(135deg, #EDE7F6 0%, #D1C4E9 100%)',
        features: ['50 skin scans per month', 'Advanced AI analysis', 'Priority processing', 'Detailed reports', 'Priority support', 'Email report'],
        buttonText: 'Upgrade to Pro',
        buttonVariant: 'contained' as const,
        popular: true,
        id: import.meta.env.VITE_STRIPE_PRO_PRODUCT_ID,
    },
    {
        name: 'Express',
        price: '50',
        scans: 'Unlimited',
        period: '/unlimited',
        icon: <Crown size={32} weight="duotone" />,
        color: '#FFB300',
        gradient: 'linear-gradient(135deg, #FFF8E1 0%, #FFECB3 100%)',
        features: ['Unlimited skin scans', 'Premium AI analysis', 'Instant processing', 'Advanced reports', 'Dedicated support', 'Email report'],
        buttonText: 'Go Express',
        buttonVariant: 'contained' as const,
        popular: false,
        id: import.meta.env.VITE_STRIPE_EXPRESS_PRODUCT_ID,
    },
];

const API_URL = import.meta.env.VITE_API_URL;

// Reusable Pricing Card Component
const PricingCard = ({
    plan,
    currentPlan,
    loading,
    onCheckout,
    onCancel
}: {
    plan: any,
    currentPlan: string,
    loading: string | null,
    onCheckout: (id: string) => void;
    onCancel: () => void;
}) => {
    const isCurrentPlan = plan.name.toLowerCase() === currentPlan;
    const isProcessing = loading === plan.id;
    const isDisabled = isCurrentPlan || loading !== null;

    return (
        <Grid item xs={12} md={4}>
            <Paper
                elevation={plan.popular ? 8 : 2}
                sx={{
                    p: 4,
                    borderRadius: 4,
                    height: '100%',
                    position: 'relative',
                    background: plan.popular ? 'white' : plan.gradient,
                    border: plan.popular ? '3px solid #7C4DFF' : '1px solid rgba(0,0,0,0.08)',
                    transform: plan.popular ? 'scale(1.05)' : 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': { transform: plan.popular ? 'scale(1.08)' : 'scale(1.03)', boxShadow: '0 20px 60px rgba(0,0,0,0.15)' },
                }}
            >
                {plan.popular && (
                    <Chip
                        label="Most Popular"
                        size="small"
                        sx={{ position: 'absolute', top: -12, left: '50%', transform: 'translateX(-50%)', bgcolor: '#7C4DFF', color: 'white', fontWeight: 700, ...s.font }}
                    />
                )}

                {/* Icon & Name */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                    <Box sx={{ width: 56, height: 56, borderRadius: 3, bgcolor: `${plan.color}20`, display: 'flex', alignItems: 'center', justifyContent: 'center', color: plan.color }}>
                        {plan.icon}
                    </Box>
                    <Typography sx={{ ...s.font, fontWeight: 700, fontSize: '1.5rem', color: '#1a1a2e' }}>{plan.name}</Typography>
                </Box>

                {/* Price */}
                <Box sx={{ mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
                        <Typography sx={{ ...s.font, fontSize: '0.9rem', color: '#666' }}>€</Typography>
                        <Typography sx={{ ...s.font, fontWeight: 800, fontSize: '3.5rem', color: '#1a1a2e', lineHeight: 1 }}>{plan.price}</Typography>
                        <Typography sx={{ ...s.font, color: '#666' }}>{plan.period}</Typography>
                    </Box>
                    <Chip label={`${plan.scans} scans`} size="small" sx={{ mt: 1, bgcolor: `${plan.color}20`, color: plan.color, fontWeight: 600, ...s.font }} />
                </Box>

                {/* Features */}
                <Box sx={{ mb: 4 }}>
                    {plan.features.map((feature: string, i: number) => (
                        <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1.5 }}>
                            <Check size={20} weight="bold" color={plan.color} />
                            <Typography sx={{ ...s.font, color: '#555', fontSize: '0.95rem' }}>{feature}</Typography>
                        </Box>
                    ))}
                </Box>

                {/* Action Button */}
                <Button
                    fullWidth
                    variant={isCurrentPlan ? 'outlined' : plan.buttonVariant}
                    size="large"
                    disabled={isDisabled}
                    onClick={() => {
                        if (plan.id && plan.id !== 'free') {
                            onCheckout(plan.id);
                        }
                    }}
                    sx={{
                        ...s.font,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: '1rem',
                        bgcolor: isCurrentPlan ? 'transparent' : (plan.buttonVariant === 'contained' ? plan.color : 'transparent'),
                        borderColor: plan.color,
                        color: isCurrentPlan ? plan.color : (plan.buttonVariant === 'contained' ? 'white' : plan.color),
                        '&:hover': {
                            bgcolor: isCurrentPlan ? 'transparent' : (plan.buttonVariant === 'contained' ? plan.color : `${plan.color}10`),
                            borderColor: plan.color,
                            filter: 'brightness(1.1)',
                        },
                        '&:disabled': {
                            bgcolor: 'transparent',
                            borderColor: '#ccc',
                            color: '#888',
                        },
                    }}
                >
                    {isProcessing ? 'Processing...' : (isCurrentPlan ? 'Current Plan' : plan.buttonText)}
                </Button>

                {isCurrentPlan && plan.id !== 'free' && (
                    <Button
                        fullWidth
                        variant="text"
                        color="error"
                        size="small"
                        disabled={loading !== null}
                        onClick={onCancel}
                        sx={{ mt: 1, ...s.font, fontWeight: 600, textTransform: 'none', color: '#ef4444' }}
                    >
                        {loading === 'cancel' ? 'Cancelling...' : 'Cancel Subscription'}
                    </Button>
                )}
            </Paper>
        </Grid>
    );
};

export default function Price() {
    const navigate = useNavigate();
    const [mobileOpen, setMobileOpen] = useState(false);
    const { isSignedIn, user, isLoaded } = useUser();
    const [loading, setLoading] = useState<string | null>(null);
    const [currentPlan, setCurrentPlan] = useState<string>('free');

    useEffect(() => {
        const fetchUserPlan = async () => {
            if (isLoaded && user) {
                try {
                    const response = await fetch(`${API_URL}/api/user/plan/${user.id}`);
                    const data = await response.json();
                    if (data.success) {
                        setCurrentPlan(data.plan);
                    }
                } catch (error) {
                    console.error("Failed to fetch user plan", error);
                }
            }
        };
        fetchUserPlan();
    }, [isLoaded, user]);

    // Prevent flash of wrong content while auth loads
    if (!isLoaded) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    const handleCheckout = async (planId: string) => {
        if (!isSignedIn) {
            navigate('/sign-in');
            return;
        }

        try {
            setLoading(planId);
            const stripe = await stripePromise;
            if (!stripe) throw new Error('Stripe failed to load');

            const response = await fetch(`${API_URL}/api/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    priceId: planId, // Although named prod_, backend usually handles mapping or creates price
                    userId: user?.id,
                    email: user?.primaryEmailAddress?.emailAddress,
                }),
            });

            const { sessionId, url, error } = await response.json();

            if (error) {
                console.error('Checkout error:', error);
                alert(`Checkout Failed: ${error}`);
                return;
            }

            if (url) {
                window.location.href = url;
            } else if (sessionId) {
                // Fallback for legacy session ID approach if needed, though url is preferred
                // @ts-ignore
                const result = await stripe.redirectToCheckout({
                    sessionId,
                });
                if (result.error) {
                    console.error('Stripe redirect error:', result.error);
                    alert(result.error.message);
                }
            } else {
                alert('No checkout URL received.');
            }
        } catch (err) {
            console.error('Checkout exception:', err);
            alert('An unexpected error occurred.');
        } finally {
            setLoading(null);
        }
    };

    const handleCancel = async () => {
        if (!confirm('Are you sure you want to cancel your subscription? You will be downgraded to the Free plan immediately.')) return;

        try {
            setLoading('cancel');
            const response = await fetch(`${API_URL}/api/cancel-subscription`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user?.id }),
            });
            const data = await response.json();
            if (data.success) {
                alert('Subscription cancelled successfully.');
                setCurrentPlan('free');
            } else {
                alert(data.error || 'Failed to cancel subscription.');
            }
        } catch (err) {
            console.error(err);
            alert('Error cancelling subscription.');
        } finally {
            setLoading(null);
        }
    };


    return (
        <Box sx={{ display: 'flex', flexDirection: isSignedIn ? 'row' : 'column', minHeight: '100vh', bgcolor: '#f8fafc' }}>
            {isSignedIn && <LeftNavbar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />}

            {isSignedIn && (
                <AppBar
                    position="fixed"
                    elevation={0}
                    sx={{
                        width: { sm: `calc(100% - ${drawerWidth}px)` },
                        ml: { sm: `${drawerWidth}px` },
                        bgcolor: 'white',
                        borderBottom: '1px solid #e2e8f0'
                    }}
                >
                    <Toolbar>
                        <IconButton
                            edge="start"
                            onClick={() => setMobileOpen(true)}
                            sx={{ mr: 2, display: { sm: 'none' }, color: '#334155' }}
                        >
                            <MenuIcon size={24} />
                        </IconButton>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
                            <Box sx={{
                                width: 40,
                                height: 40,
                                borderRadius: 2,
                                bgcolor: '#fff7ed',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}>
                                <Crown size={22} color="#ea580c" weight="duotone" />
                            </Box>
                            <Box>
                                <Typography sx={{ ...s.font, fontWeight: 700, color: '#0f172a', fontSize: '1.1rem', lineHeight: 1.2 }}>
                                    Pricing Plans
                                </Typography>
                                <Typography sx={{ ...s.font, color: '#64748b', fontSize: '0.75rem' }}>
                                    Choose the best plan for you
                                </Typography>
                            </Box>
                        </Box>
                        <UserButton afterSignOutUrl="/" />
                    </Toolbar>
                </AppBar>
            )}

            {/* Public Header for non-authenticated users */}
            {!isSignedIn && <Navbar />}

            <Box component="main" sx={{ flexGrow: 1, pt: isSignedIn ? 11 : 0, width: isSignedIn ? { sm: `calc(100% - ${drawerWidth}px)` } : '100%' }}>
                {/* Header - Only for public */}
                {!isSignedIn && (
                    <Box sx={{ bgcolor: 'white', py: { xs: 6, md: 8 }, px: 2 }}>
                        <Container maxWidth="lg">
                            <Typography variant="h3" sx={{ ...s.font, fontWeight: 800, textAlign: 'center', mb: 2, fontSize: { xs: '2rem', md: '3rem' }, color: '#1a1a2e' }}>
                                Choose Your Plan
                            </Typography>
                            <Typography sx={{ ...s.font, textAlign: 'center', color: 'text.secondary', maxWidth: 600, mx: 'auto', fontSize: { xs: '1rem', md: '1.2rem' } }}>
                                Get the most accurate AI-powered skin analysis with our flexible pricing options
                            </Typography>
                        </Container>
                    </Box>
                )}

                {/* Pricing Cards */}
                <Container maxWidth="lg" sx={{ pb: { xs: 4, md: 8 }, mt: isSignedIn ? 4 : 0 }}>
                    <Grid container spacing={4} justifyContent="center" alignItems="stretch">
                        {plans.map((plan, index) => (
                            <PricingCard
                                key={index}
                                plan={plan}
                                currentPlan={currentPlan}
                                loading={loading}
                                onCheckout={handleCheckout}
                                onCancel={handleCancel}
                            />
                        ))}
                    </Grid>

                    {/* FAQ or Note */}
                    <Box sx={{ textAlign: 'center', mt: 8 }}>
                        <Typography sx={{ ...s.font, color: '#666', fontSize: '0.9rem' }}>
                            All plans include secure data storage and GDPR compliance.
                        </Typography>
                        <Typography sx={{ ...s.font, color: '#666', fontSize: '0.9rem', mt: 1 }}>
                            Questions? <Button onClick={() => navigate('/support')} sx={{ ...s.font, textTransform: 'none', fontWeight: 600 }}>Contact Support</Button>
                        </Typography>
                    </Box>
                </Container>
            </Box>
        </Box>
    );
}
