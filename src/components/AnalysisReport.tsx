import { useState } from 'react';
import { Box, Typography, Grid, Paper, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import type { SxProps } from '@mui/material';
import { CheckCircle, Warning, FilePdf, ArrowLeft, FloppyDisk } from 'phosphor-react';
import { useUser } from '@clerk/clerk-react';

const API_URL = import.meta.env.VITE_API_URL;

const font: SxProps = { fontFamily: '"DM Sans", sans-serif' };

export type AnalysisResult = {
  filename: string;
  lesion_code: string;
  lesion_name: string;
  binary_prediction: string;
  confidence: number;
}

interface AnalysisReportProps {
  image: string;
  result: AnalysisResult;
  onClose: () => void;
  hideSave?: boolean;
}

// Helper functions
const formatDateTime = () => {
  const now = new Date();
  return {
    date: now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    time: now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
  };
};

const getDiagnosisInfo = (isBenign: boolean) => ({
  title: isBenign ? 'Likely Benign' : 'Needs Medical Attention',
  subtitle: isBenign ? 'The analyzed lesion appears to be non-cancerous' : 'We recommend consulting a dermatologist',
  bg: isBenign ? '#e8f5e9' : '#ffebee',
  border: isBenign ? '#c8e6c9' : '#ffcdd2',
  text: isBenign ? '#2e7d32' : '#c62828',
});

// Reusable Components
const Label = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ ...font, color: '#666', fontSize: '0.75rem' }}>{children}</Typography>
);

const Value = ({ children, sx }: { children: React.ReactNode; sx?: SxProps }) => (
  <Typography sx={{ ...font, fontWeight: 600, ...sx }}>{children}</Typography>
);

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <Typography sx={{ ...font, fontWeight: 700, mb: 1.5 }}>{children}</Typography>
);

const InfoBox = ({ label, value, bgcolor = '#f8f9fa', border = '#e0e0e0', valueProps }: {
  label: string; value: string | number; bgcolor?: string; border?: string; valueProps?: SxProps;
}) => (
  <Box sx={{ bgcolor, borderRadius: 2, p: 2, border: `1px solid ${border}` }}>
    <Label>{label}</Label>
    <Value sx={valueProps}>{value}</Value>
  </Box>
);

const StatBox = ({ label, value, bgcolor, border, color, large }: {
  label: string; value: string | number; bgcolor: string; border: string; color: string; large?: boolean;
}) => (
  <Box sx={{ bgcolor, borderRadius: 2, p: 2, textAlign: 'center', border: `1px solid ${border}` }}>
    <Typography sx={{ ...font, fontWeight: large ? 800 : 700, fontSize: large ? '2rem' : '1.5rem', color }}>{value}</Typography>
    <Label>{label}</Label>
  </Box>
);

const HeaderBtn = ({ onClick, disabled, children }: { onClick: () => void; disabled?: boolean; children: React.ReactNode }) => (
  <Button
    onClick={onClick}
    disabled={disabled}
    sx={{
      bgcolor: 'rgba(255,255,255,0.15)',
      color: 'white',
      textTransform: 'none',
      fontWeight: 500,
      fontSize: '0.85rem',
      px: 2,
      py: 0.75,
      borderRadius: 1.5,
      border: '1px solid rgba(255,255,255,0.2)',
      display: 'flex',
      alignItems: 'center',
      gap: 0.75,
      minWidth: 'auto',
      '&:hover': { bgcolor: 'rgba(255,255,255,0.25)' },
      '&:disabled': { bgcolor: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.5)' }
    }}
  >
    {children}
  </Button>
);

const Divider = () => <Box sx={{ borderTop: '1px solid #e0e0e0', my: 3 }} />;

// Generate HTML content for PDF printing
export const generatePrintHTML = (image: string, result: AnalysisResult): string => {
  const isBenign = result.binary_prediction.toLowerCase() === 'benign';
  const { date, time } = formatDateTime();
  const diagnosis = getDiagnosisInfo(isBenign);

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>DermaAI Analysis Report - ${date}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&display=swap');
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'DM Sans', sans-serif; background: #fff; padding: 20px 30px; max-width: 100%; margin: 0 auto; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          .header { text-align: center; margin-bottom: 12px; }
          .header h1 { color: #1976d2; font-size: 26px; font-weight: 800; margin-bottom: 2px; }
          .header p { color: #666; font-size: 12px; }
          .divider { border: none; border-top: 1px solid #e0e0e0; margin: 12px 0; }
          .date-time { display: flex; justify-content: space-between; background: #f5f5f5; padding: 10px 16px; border-radius: 6px; margin-bottom: 12px; }
          .date-time .label { color: #666; font-size: 9px; text-transform: uppercase; letter-spacing: 0.5px; }
          .date-time .value { font-weight: 600; color: #1a1a2e; font-size: 12px; margin-top: 1px; }
          .section-title { font-weight: 700; color: #1a1a2e; font-size: 13px; margin-bottom: 8px; }
          .image-container { border: 1px solid #e0e0e0; border-radius: 8px; padding: 12px; text-align: center; background: #fafafa; margin-bottom: 12px; }
          .image-container img { max-width: 100%; max-height: 200px; border-radius: 6px; }
          .image-container .filename { color: #999; font-size: 10px; margin-top: 6px; }
          .diagnosis { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; margin-bottom: 12px; background: ${diagnosis.bg}; border: 1px solid ${diagnosis.border}; }
          .diagnosis .title { font-weight: 700; font-size: 16px; color: ${diagnosis.text}; }
          .diagnosis .subtitle { font-size: 11px; margin-top: 2px; color: ${diagnosis.text}; }
          .detail-box { padding: 10px 14px; border-radius: 6px; margin-bottom: 8px; }
          .detail-box.gray { background: #f5f5f5; border: 1px solid #e0e0e0; }
          .detail-box.blue { background: #e3f2fd; border: 1px solid #90caf9; }
          .detail-box.purple { background: #f3e5f5; border: 1px solid #ce93d8; }
          .detail-box.orange { background: #fff3e0; border: 1px solid #ffcc80; }
          .detail-box .label { color: #666; font-size: 9px; text-transform: uppercase; letter-spacing: 0.5px; }
          .detail-box .value { font-weight: 700; font-size: 18px; margin-top: 2px; }
          .detail-box.gray .value { color: #1a1a2e; font-size: 16px; }
          .detail-box.blue .value { color: #1565c0; }
          .detail-box.purple .value { color: #7b1fa2; font-size: 16px; }
          .detail-box.orange .value { color: ${diagnosis.text}; font-size: 14px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 8px; }
          .grid .detail-box { margin-bottom: 0; text-align: center; }
          .disclaimer { background: #fff8e1; border: 1px solid #ffe082; border-radius: 6px; padding: 10px 14px; margin-bottom: 12px; }
          .disclaimer .title { font-weight: 700; color: #f57c00; font-size: 11px; margin-bottom: 4px; }
          .disclaimer .text { color: #795548; font-size: 10px; line-height: 1.5; }
          .footer { text-align: center; padding-top: 8px; }
          .footer .main { color: #999; font-size: 10px; }
          @media print { body { padding: 15px 25px; } @page { margin: 0.3in; size: A4 portrait; } }
          @page { size: A4 portrait; margin: 0.3in; }
        </style>
      </head>
      <body>
        <div class="header"><h1>DermaAI</h1><p>AI-Powered Skin Analysis Report</p></div>
        <hr class="divider" />
        <div class="date-time">
          <div><div class="label">Report Date</div><div class="value">${date}</div></div>
          <div style="text-align: right;"><div class="label">Report Time</div><div class="value">${time}</div></div>
        </div>
        <div class="section-title">Analyzed Image</div>
        <div class="image-container"><img src="${image}" alt="Analyzed skin condition" /><div class="filename">File: ${result.filename}</div></div>
        <div class="section-title">Diagnosis Result</div>
        <div class="diagnosis">
          <div class="content"><div class="title">${diagnosis.title}</div><div class="subtitle">${diagnosis.subtitle}</div></div>
        </div>
        <div class="section-title">Detailed Analysis</div>
        <div class="grid">
          <div class="detail-box gray"><div class="label">Detected Condition</div><div class="value">${result.lesion_name}</div></div>
          <div class="detail-box blue"><div class="label">Confidence</div><div class="value">${result.confidence}%</div></div>
          <div class="detail-box purple"><div class="label">Code</div><div class="value">${result.lesion_code}</div></div>
        </div>
        <div class="detail-box orange"><div class="label">Binary Classification</div><div class="value">${result.binary_prediction}</div></div>
        <div class="disclaimer"><div class="title">Important Disclaimer</div><div class="text">This AI-generated analysis is for informational purposes only. Please consult a qualified dermatologist for proper medical advice and treatment.</div></div>
        <hr class="divider" />
        <div class="footer"><div class="main">Report generated by DermaAI • Powered by Advanced Machine Learning</div></div>
        <script>window.onload = function() { setTimeout(function() { window.print(); }, 500); };</script>
      </body>
    </html>
  `;
};

export default function AnalysisReport({ image, result, onClose, hideSave }: AnalysisReportProps) {
  const { user } = useUser();
  const isBenign = result.binary_prediction.toLowerCase() === 'benign';
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);
  
  const { date, time } = formatDateTime();
  const diagnosis = getDiagnosisInfo(isBenign);

  const saveReportToDatabase = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const response = await fetch(`${API_URL}/api/reports/save`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user?.id,
          user_email: user?.primaryEmailAddress?.emailAddress,
          report_type: 'skin_analysis',
          filename: result.filename,
          lesion_code: result.lesion_code,
          lesion_name: result.lesion_name,
          binary_prediction: result.binary_prediction,
          confidence: result.confidence,
          image_data: image,
          report_html: generatePrintHTML(image, result),
          generated_at: new Date().toISOString(),
        }),
      });
      if (!response.ok) throw new Error('Failed to save report');
      setSaveSuccess(true);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save report');
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) return alert('Please allow popups to save the report as PDF');
    printWindow.document.write(generatePrintHTML(image, result));
    printWindow.document.close();
  };

  return (
    <Box sx={{ position: 'fixed', inset: 0, bgcolor: '#f5f7fa', zIndex: 9999, overflow: 'auto' }}>
      {/* Header */}
      <Box sx={{ position: 'sticky', top: 0, bgcolor: '#1976d2', color: 'white', py: 1.5, px: { xs: 2, sm: 4 }, display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10, boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
        <Button onClick={onClose} sx={{ color: 'white', minWidth: 'auto', p: 1, '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' } }}>
          <ArrowLeft size={22} />
        </Button>
        <Typography sx={{ ...font, fontWeight: 600, fontSize: '1rem' }}>Report</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {!hideSave && (
            <HeaderBtn onClick={saveReportToDatabase} disabled={saving}>
              {saving ? <CircularProgress size={16} color="inherit" /> : <FloppyDisk size={18} />}
              {saving ? 'Saving...' : 'Save'}
            </HeaderBtn>
          )}
          <HeaderBtn onClick={handlePrint}>
            <FilePdf size={18} />
            Export PDF
          </HeaderBtn>
        </Box>
      </Box>

      {/* Snackbars */}
      <Snackbar open={saveSuccess} autoHideDuration={4000} onClose={() => setSaveSuccess(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setSaveSuccess(false)}>Report saved successfully!</Alert>
      </Snackbar>
      <Snackbar open={!!saveError} autoHideDuration={4000} onClose={() => setSaveError(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="error" onClose={() => setSaveError(null)}>{saveError}</Alert>
      </Snackbar>

      {/* Report Content */}
      <Box sx={{ p: { xs: 2, sm: 4 }, maxWidth: 800, mx: 'auto' }}>
        <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ ...font, fontWeight: 800, color: '#1976d2' }}>DermaAI</Typography>
            <Typography sx={{ ...font, color: '#666' }}>AI-Powered Skin Analysis Report</Typography>
          </Box>

          <Divider />

          {/* Date Time */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: '#f8f9fa', p: 2, borderRadius: 2, mb: 3 }}>
            <Box><Label>Report Date</Label><Value>{date}</Value></Box>
            <Box sx={{ textAlign: 'right' }}><Label>Report Time</Label><Value>{time}</Value></Box>
          </Box>

          {/* Image */}
          <SectionTitle>Analyzed Image</SectionTitle>
          <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 3, p: 2, textAlign: 'center', bgcolor: '#fafafa', mb: 3 }}>
            <img src={image} alt="Analyzed" style={{ maxWidth: '100%', maxHeight: 280, borderRadius: 8 }} />
            <Typography sx={{ ...font, color: '#999', fontSize: '0.75rem', mt: 1 }}>File: {result.filename}</Typography>
          </Box>

          {/* Diagnosis */}
          <SectionTitle>Diagnosis Result</SectionTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 2.5, borderRadius: 3, bgcolor: diagnosis.bg, border: `1px solid ${diagnosis.border}`, mb: 3 }}>
            {isBenign ? <CheckCircle size={36} color="#4caf50" weight="fill" /> : <Warning size={36} color="#f44336" weight="fill" />}
            <Box>
              <Typography sx={{ ...font, fontWeight: 700, fontSize: '1.2rem', color: diagnosis.text }}>{diagnosis.title}</Typography>
              <Typography sx={{ ...font, color: diagnosis.text, fontSize: '0.85rem' }}>{diagnosis.subtitle}</Typography>
            </Box>
          </Box>

          {/* Details */}
          <SectionTitle>Detailed Analysis</SectionTitle>
          <InfoBox label="Detected Condition" value={result.lesion_name} />
          
          <Grid container spacing={2} sx={{ my: 2 }}>
            <Grid item xs={6}>
              <StatBox label="Confidence Score" value={`${result.confidence}%`} bgcolor="#e3f2fd" border="#bbdefb" color="#1976d2" large />
            </Grid>
            <Grid item xs={6}>
              <StatBox label="Classification Code" value={result.lesion_code} bgcolor="#f3e5f5" border="#e1bee7" color="#7b1fa2" />
            </Grid>
          </Grid>

          <InfoBox label="Binary Classification" value={result.binary_prediction} bgcolor="#fff3e0" border="#ffe0b2" valueProps={{ color: diagnosis.text, fontSize: '1.1rem' }} />

          {/* Disclaimer */}
          <Box sx={{ bgcolor: '#fff8e1', borderRadius: 2, p: 2, border: '1px solid #ffecb3', my: 3 }}>
            <Typography sx={{ ...font, fontWeight: 700, color: '#f57c00', fontSize: '0.85rem', mb: 0.5 }}>⚠️ Important Disclaimer</Typography>
            <Typography sx={{ ...font, color: '#795548', fontSize: '0.8rem' }}>
              This AI-generated analysis is for informational purposes only. Please consult a qualified dermatologist for proper medical advice.
            </Typography>
          </Box>

          <Divider />

          {/* Footer */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ ...font, color: '#999', fontSize: '0.75rem' }}>Report generated by DermaAI • Powered by Advanced Machine Learning</Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
