import { useState } from 'react';
import { Box, Typography, Grid, Paper, Button, Snackbar, Alert, CircularProgress } from '@mui/material';
import { CheckCircle, Warning, FilePdf, ArrowLeft, FloppyDisk } from 'phosphor-react';
import { useUser } from '@clerk/clerk-react';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const s = { font: { fontFamily: '"DM Sans", sans-serif' } };

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
}

// Generate HTML content for PDF printing
export const generatePrintHTML = (image: string, result: AnalysisResult): string => {
  const isBenign = result.binary_prediction.toLowerCase() === 'benign';
  const now = new Date();
  const formattedDate = now.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const formattedTime = now.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <title>DermaAI Analysis Report - ${formattedDate}</title>
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
          .diagnosis { display: flex; align-items: center; gap: 12px; padding: 12px; border-radius: 8px; margin-bottom: 12px; }
          .diagnosis.benign { background: #e8f5e9; border: 1px solid #a5d6a7; }
          .diagnosis.malignant { background: #ffebee; border: 1px solid #ef9a9a; }
          .diagnosis .icon { font-size: 28px; }
          .diagnosis .title { font-weight: 700; font-size: 16px; }
          .diagnosis .subtitle { font-size: 11px; margin-top: 2px; }
          .diagnosis.benign .title, .diagnosis.benign .subtitle { color: #2e7d32; }
          .diagnosis.malignant .title, .diagnosis.malignant .subtitle { color: #c62828; }
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
          .detail-box.orange .value { font-size: 14px; }
          .grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 8px; margin-bottom: 8px; }
          .grid .detail-box { margin-bottom: 0; text-align: center; }
          .disclaimer { background: #fff8e1; border: 1px solid #ffe082; border-radius: 6px; padding: 10px 14px; margin-bottom: 12px; }
          .disclaimer .title { font-weight: 700; color: #f57c00; font-size: 11px; margin-bottom: 4px; }
          .disclaimer .text { color: #795548; font-size: 10px; line-height: 1.5; }
          .footer { text-align: center; padding-top: 8px; }
          .footer .main { color: #999; font-size: 10px; }
          @media print {
            body { padding: 15px 25px; }
            @page { margin: 0.3in; size: A4 portrait; }
          }
          @page { size: A4 portrait; margin: 0.3in; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🏥 DermaAI</h1>
          <p>AI-Powered Skin Analysis Report</p>
        </div>
        
        <hr class="divider" />
        
        <div class="date-time">
          <div>
            <div class="label">Report Date</div>
            <div class="value">${formattedDate}</div>
          </div>
          <div style="text-align: right;">
            <div class="label">Report Time</div>
            <div class="value">${formattedTime}</div>
          </div>
        </div>
        
        <div class="section-title">📷 Analyzed Image</div>
        <div class="image-container">
          <img src="${image}" alt="Analyzed skin condition" />
          <div class="filename">File: ${result.filename}</div>
        </div>
        
        <div class="section-title">🔬 Diagnosis Result</div>
        <div class="diagnosis ${isBenign ? 'benign' : 'malignant'}">
          <div class="icon">${isBenign ? '✅' : '⚠️'}</div>
          <div class="content">
            <div class="title">${isBenign ? 'Likely Benign' : 'Needs Medical Attention'}</div>
            <div class="subtitle">${isBenign ? 'The analyzed lesion appears to be non-cancerous' : 'We recommend consulting a dermatologist'}</div>
          </div>
        </div>
        
        <div class="section-title">📊 Detailed Analysis</div>
        <div class="grid">
          <div class="detail-box gray">
            <div class="label">Detected Condition</div>
            <div class="value">${result.lesion_name}</div>
          </div>
          <div class="detail-box blue">
            <div class="label">Confidence</div>
            <div class="value">${result.confidence}%</div>
          </div>
          <div class="detail-box purple">
            <div class="label">Code</div>
            <div class="value">${result.lesion_code}</div>
          </div>
        </div>
        <div class="detail-box orange">
          <div class="label">Binary Classification</div>
          <div class="value" style="color: ${isBenign ? '#2e7d32' : '#c62828'};">${result.binary_prediction}</div>
        </div>
        
        <div class="disclaimer">
          <div class="title">⚠️ Important Disclaimer</div>
          <div class="text">This AI-generated analysis is for informational purposes only. Please consult a qualified dermatologist for proper medical advice and treatment.</div>
        </div>
        
        <hr class="divider" />
        
        <div class="footer">
          <div class="main">Report generated by DermaAI • Powered by Advanced Machine Learning</div>
        </div>
        
        <script>
          window.onload = function() {
            setTimeout(function() {
              window.print();
            }, 500);
          };
        </script>
      </body>
    </html>
  `;
};

export default function AnalysisReport({ image, result, onClose }: AnalysisReportProps) {
  const { user } = useUser();
  const isBenign = result.binary_prediction.toLowerCase() === 'benign';
  const [saving, setSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState<string | null>(null);

  // Save report to database
  const saveReportToDatabase = async () => {
    setSaving(true);
    setSaveError(null);
    try {
      const now = new Date();
      const response = await fetch(`${API_URL}/api/reports/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
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
          generated_at: now.toISOString(),
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to save report');
      }

      setSaveSuccess(true);
    } catch (err) {
      setSaveError(err instanceof Error ? err.message : 'Failed to save report');
    } finally {
      setSaving(false);
    }
  };

  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (!printWindow) {
      alert('Please allow popups to save the report as PDF');
      return;
    }
    printWindow.document.write(generatePrintHTML(image, result));
    printWindow.document.close();
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        bgcolor: '#f5f7fa',
        zIndex: 9999,
        overflow: 'auto',
      }}
    >
      {/* Report Header */}
      <Box
        sx={{
          position: 'sticky',
          top: 0,
          bgcolor: '#1976d2',
          color: 'white',
          p: 2,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 10,
        }}
      >
        <Button
          startIcon={<ArrowLeft size={20} />}
          onClick={onClose}
          sx={{ color: 'white', textTransform: 'none', fontWeight: 600 }}
        >
          Back to Analysis
        </Button>
        <Typography sx={{ ...s.font, fontWeight: 700 }}>📄 Analysis Report</Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            variant="contained"
            startIcon={saving ? <CircularProgress size={18} color="inherit" /> : <FloppyDisk size={18} />}
            onClick={saveReportToDatabase}
            disabled={saving}
            sx={{
              bgcolor: '#ff9800',
              color: 'white',
              textTransform: 'none',
              fontWeight: 700,
              '&:hover': { bgcolor: '#f57c00' },
              '&:disabled': { bgcolor: '#ffcc80', color: 'white' },
            }}
          >
            {saving ? 'Saving...' : '💾 Save Report'}
          </Button>
          <Button
            variant="contained"
            startIcon={<FilePdf size={18} />}
            onClick={handlePrint}
            sx={{
              bgcolor: '#2e7d32',
              textTransform: 'none',
              fontWeight: 700,
              '&:hover': { bgcolor: '#1b5e20' },
            }}
          >
            🖨️ Print / Save PDF
          </Button>
        </Box>
      </Box>

      {/* Success/Error Snackbars */}
      <Snackbar open={saveSuccess} autoHideDuration={4000} onClose={() => setSaveSuccess(false)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="success" onClose={() => setSaveSuccess(false)} sx={{ width: '100%' }}>
          Report saved successfully!
        </Alert>
      </Snackbar>
      <Snackbar open={!!saveError} autoHideDuration={4000} onClose={() => setSaveError(null)} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
        <Alert severity="error" onClose={() => setSaveError(null)} sx={{ width: '100%' }}>
          {saveError}
        </Alert>
      </Snackbar>

      {/* Report Content */}
      <Box sx={{ p: 4, maxWidth: 800, mx: 'auto' }}>
        <Paper sx={{ p: 4, borderRadius: 3 }}>
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 3 }}>
            <Typography variant="h4" sx={{ ...s.font, fontWeight: 800, color: '#1976d2' }}>
              DermaAI
            </Typography>
            <Typography sx={{ ...s.font, color: '#666' }}>
              AI-Powered Skin Analysis Report
            </Typography>
          </Box>

          <Box sx={{ borderTop: '1px solid #e0e0e0', my: 3 }} />

          {/* Date Time */}
          <Box sx={{ display: 'flex', justifyContent: 'space-between', bgcolor: '#f8f9fa', p: 2, borderRadius: 2, mb: 3 }}>
            <Box>
              <Typography sx={{ ...s.font, color: '#666', fontSize: '0.75rem' }}>Report Date</Typography>
              <Typography sx={{ ...s.font, fontWeight: 600 }}>
                {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
              </Typography>
            </Box>
            <Box sx={{ textAlign: 'right' }}>
              <Typography sx={{ ...s.font, color: '#666', fontSize: '0.75rem' }}>Report Time</Typography>
              <Typography sx={{ ...s.font, fontWeight: 600 }}>
                {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
              </Typography>
            </Box>
          </Box>

          {/* Image */}
          <Typography sx={{ ...s.font, fontWeight: 700, mb: 1.5 }}>Analyzed Image</Typography>
          <Box sx={{ border: '1px solid #e0e0e0', borderRadius: 3, p: 2, textAlign: 'center', bgcolor: '#fafafa', mb: 3 }}>
            <img src={image} alt="Analyzed" style={{ maxWidth: '100%', maxHeight: 280, borderRadius: 8 }} />
            <Typography sx={{ ...s.font, color: '#999', fontSize: '0.75rem', mt: 1 }}>File: {result.filename}</Typography>
          </Box>

          {/* Diagnosis */}
          <Typography sx={{ ...s.font, fontWeight: 700, mb: 1.5 }}>Diagnosis Result</Typography>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 2.5,
              borderRadius: 3,
              bgcolor: isBenign ? '#e8f5e9' : '#ffebee',
              border: `1px solid ${isBenign ? '#c8e6c9' : '#ffcdd2'}`,
              mb: 3,
            }}
          >
            {isBenign ? <CheckCircle size={36} color="#4caf50" weight="fill" /> : <Warning size={36} color="#f44336" weight="fill" />}
            <Box>
              <Typography sx={{ ...s.font, fontWeight: 700, fontSize: '1.2rem', color: isBenign ? '#2e7d32' : '#c62828' }}>
                {isBenign ? 'Likely Benign' : 'Needs Medical Attention'}
              </Typography>
              <Typography sx={{ ...s.font, color: isBenign ? '#388e3c' : '#d32f2f', fontSize: '0.85rem' }}>
                {isBenign ? 'The analyzed lesion appears to be non-cancerous' : 'We recommend consulting a dermatologist'}
              </Typography>
            </Box>
          </Box>

          {/* Details */}
          <Typography sx={{ ...s.font, fontWeight: 700, mb: 1.5 }}>Detailed Analysis</Typography>
          <Box sx={{ bgcolor: '#f8f9fa', borderRadius: 2, p: 2, border: '1px solid #e0e0e0', mb: 2 }}>
            <Typography sx={{ ...s.font, color: '#666', fontSize: '0.75rem' }}>Detected Condition</Typography>
            <Typography sx={{ ...s.font, fontWeight: 700, fontSize: '1.3rem' }}>{result.lesion_name}</Typography>
          </Box>

          <Grid container spacing={2} sx={{ mb: 2 }}>
            <Grid item xs={6}>
              <Box sx={{ bgcolor: '#e3f2fd', borderRadius: 2, p: 2, textAlign: 'center', border: '1px solid #bbdefb' }}>
                <Typography sx={{ ...s.font, fontWeight: 800, fontSize: '2rem', color: '#1976d2' }}>{result.confidence}%</Typography>
                <Typography sx={{ ...s.font, color: '#666', fontSize: '0.8rem' }}>Confidence Score</Typography>
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box sx={{ bgcolor: '#f3e5f5', borderRadius: 2, p: 2, textAlign: 'center', border: '1px solid #e1bee7' }}>
                <Typography sx={{ ...s.font, fontWeight: 700, fontSize: '1.5rem', color: '#7b1fa2' }}>{result.lesion_code}</Typography>
                <Typography sx={{ ...s.font, color: '#666', fontSize: '0.8rem' }}>Classification Code</Typography>
              </Box>
            </Grid>
          </Grid>

          <Box sx={{ bgcolor: '#fff3e0', borderRadius: 2, p: 2, border: '1px solid #ffe0b2', mb: 3 }}>
            <Typography sx={{ ...s.font, color: '#666', fontSize: '0.75rem' }}>Binary Classification</Typography>
            <Typography sx={{ ...s.font, fontWeight: 700, fontSize: '1.1rem', color: isBenign ? '#2e7d32' : '#c62828' }}>
              {result.binary_prediction}
            </Typography>
          </Box>

          {/* Disclaimer */}
          <Box sx={{ bgcolor: '#fff8e1', borderRadius: 2, p: 2, border: '1px solid #ffecb3', mb: 3 }}>
            <Typography sx={{ ...s.font, fontWeight: 700, color: '#f57c00', fontSize: '0.85rem', mb: 0.5 }}>
              ⚠️ Important Disclaimer
            </Typography>
            <Typography sx={{ ...s.font, color: '#795548', fontSize: '0.8rem' }}>
              This AI-generated analysis is for informational purposes only. Please consult a qualified dermatologist for proper medical advice.
            </Typography>
          </Box>

          <Box sx={{ borderTop: '1px solid #e0e0e0', my: 2 }} />

          {/* Footer */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography sx={{ ...s.font, color: '#999', fontSize: '0.75rem' }}>
              Report generated by DermaAI • Powered by Advanced Machine Learning
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}
