import { UserButton, useUser } from '@clerk/clerk-react';
import { Alert, AppBar, Box, Button, Chip, Container, Grid, IconButton, LinearProgress, Paper, Toolbar, Typography } from '@mui/material';
import { CheckCircle, CloudArrowUp, FilePdf, Image as ImageIcon, MagnifyingGlass, List as MenuIcon, Warning } from 'phosphor-react';
import { useState } from 'react';
import AnalysisReport, { type AnalysisResult, generatePrintHTML } from '../components/AnalysisReport';
import LeftNavbar, { drawerWidth } from '../components/LeftNavbar';


const API_URL = import.meta.env.VITE_API_URL;
const s = { font: { fontFamily: '"DM Sans", sans-serif' } };


interface DermoscopyError {
  filename: string;
  is_dermoscopic: boolean;
  dermoscopy_score: number;
  message: string;
  signals: {
    edge_means: number[];
    edge_std: number;
    border_uniform_score: number;
    clutter: number;
    clutter_score: number;
  };
}


export default function Analysis() {
  const { user } = useUser();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [image, setImage] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [dermoscopyError, setDermoscopyError] = useState<DermoscopyError | null>(null);
  const [showReport, setShowReport] = useState(false);


  const onUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      // Validate file type
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(f.type)) {
        setError('Please upload a valid image file (JPG or PNG).');
        return;
      }


      // Validate file size (10MB)
      if (f.size > 10 * 1024 * 1024) {
        setError('File size exceeds 10MB limit.');
        return;
      }


      setFile(f);
      setResult(null);
      setError(null);
      setDermoscopyError(null);
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result as string);
      reader.readAsDataURL(f);
    }
  };


  // Save analysis result to database and get scan count
  const saveAnalysisToDatabase = async (analysisResult: AnalysisResult, imageBase64: string): Promise<number | null> => {
    try {
      const response = await fetch(`${API_URL}/api/analysis/save`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: user?.id,
          user_email: user?.primaryEmailAddress?.emailAddress,
          filename: analysisResult.filename,
          lesion_code: analysisResult.lesion_code,
          lesion_name: analysisResult.lesion_name,
          binary_prediction: analysisResult.binary_prediction,
          confidence: analysisResult.confidence,
          image_data: imageBase64,
          analyzed_at: new Date().toISOString(),
        }),
      });
      
      if (!response.ok) {
        console.error('Failed to save analysis to database');
        return null;
      }
      
      // Get the response with scan count
      const data = await response.json();
      return data.total_scans || null;
    } catch (err) {
      console.error('Error saving analysis to database:', err);
      return null;
    }
  };


  // Save report to database automatically
  const saveReportToDatabase = async (analysisResult: AnalysisResult, imageBase64: string) => {
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
          filename: analysisResult.filename,
          lesion_code: analysisResult.lesion_code,
          lesion_name: analysisResult.lesion_name,
          binary_prediction: analysisResult.binary_prediction,
          confidence: analysisResult.confidence,
          image_data: imageBase64,
          report_html: generatePrintHTML(imageBase64, analysisResult),
          generated_at: now.toISOString(),
        }),
      });


      if (!response.ok) {
        console.error('Failed to save report to database');
      }
    } catch (err) {
      console.error('Error saving report to database:', err);
    }
  };


  const analyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setDermoscopyError(null);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await fetch(`${API_URL}/predict`, { method: 'POST', body: form });
      
      // Handle non-dermoscopic image (status 400)
      if (res.status === 400) {
        const errorData = await res.json() as DermoscopyError;
        setDermoscopyError(errorData);
        setResult(null);
        setLoading(false);
        return;
      }
      
      if (!res.ok) {
        throw new Error(`Analysis failed: ${res.statusText}`);
      }
      
      const data = await res.json();
      const analysisResult: AnalysisResult = {
        filename: data.filename || file.name,
        lesion_code: data.lesion_code || 'Unknown',
        lesion_name: data.lesion_name || 'Unknown',
        binary_prediction: data.binary_prediction || 'Unknown',
        confidence: data.confidence ? parseFloat((data.confidence * 100).toFixed(1)) : 0,
      };
      setResult(analysisResult);
      setDermoscopyError(null);
      
      // Save analysis and report to database automatically
      if (image) {
        await saveAnalysisToDatabase(analysisResult, image);
        await saveReportToDatabase(analysisResult, image);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to analyze image');
      setResult(null);
    } finally {
      setLoading(false);
    }
  };


  const isBenign = result?.binary_prediction.toLowerCase() === 'benign';


  // Show report view
  if (showReport && image && result) {
    return <AnalysisReport image={image} result={result} onClose={() => setShowReport(false)} hideSave />;
  }


  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      <LeftNavbar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />


      <AppBar position="fixed" elevation={0} sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, bgcolor: 'white', borderBottom: '1px solid #e0e0e0' }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => setMobileOpen(true)} sx={{ mr: 2, display: { sm: 'none' }, color: '#333' }}>
            <MenuIcon size={24} />
          </IconButton>
          <Typography variant="h6" sx={{ ...s.font, fontWeight: 700, color: '#1a1a2e', flexGrow: 1 }}>
            Skin Analysis
          </Typography>
          <UserButton afterSignOutUrl="/" />
        </Toolbar>
      </AppBar>


      <Box component="main" sx={{ flexGrow: 1, pt: 10, pb: 4, px: { xs: 2, sm: 4 } }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h4" sx={{ ...s.font, fontWeight: 800, color: '#1a1a2e', mb: 1 }}>
              AI-Powered Skin Analysis
            </Typography>
            <Typography sx={{ ...s.font, color: '#666', maxWidth: 500, mx: 'auto' }}>
              Upload a clear dermoscopic image of your skin condition for instant AI diagnosis
            </Typography>
          </Box>


          <Grid container spacing={3} justifyContent="center">
            {/* Upload Card */}
            <Grid item xs={12} md={5}>
              <Paper sx={{ p: 3, borderRadius: 4, bgcolor: 'white', height: '100%', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
                <Box
                  component="label"
                  sx={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                    border: '2px dashed #ccc', borderRadius: 3, p: 4, minHeight: 280, cursor: 'pointer',
                    transition: 'all 0.2s', bgcolor: '#fafafa',
                    '&:hover': { borderColor: '#1976d2', bgcolor: '#f0f7ff' },
                  }}
                >
                  {image ? (
                    <Box sx={{ textAlign: 'center' }}>
                      <img src={image} alt="Preview" style={{ maxWidth: '100%', maxHeight: 220, borderRadius: 12, marginBottom: 12 }} />
                      <Typography sx={{ ...s.font, color: '#666', fontSize: '0.85rem' }}>Click to change image</Typography>
                    </Box>
                  ) : (
                    <>
                      <CloudArrowUp size={56} color="#1976d2" weight="duotone" />
                      <Typography sx={{ ...s.font, fontWeight: 600, mt: 2, color: '#333' }}>Drop image here or click to upload</Typography>
                      <Typography sx={{ ...s.font, color: '#999', fontSize: '0.8rem', mt: 0.5 }}>JPG, PNG up to 10MB</Typography>
                    </>
                  )}
                  <input type="file" hidden accept="image/*" onChange={onUpload} />
                </Box>


                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={!image || loading}
                  onClick={analyze}
                  startIcon={<MagnifyingGlass size={20} weight="bold" />}
                  sx={{ mt: 2, py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 700, ...s.font, bgcolor: '#1976d2', '&:hover': { bgcolor: '#1565c0' } }}
                >
                  {loading ? 'Analyzing...' : 'Analyze Image'}
                </Button>


                {loading && <LinearProgress sx={{ mt: 2, borderRadius: 1 }} />}
                {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
              </Paper>
            </Grid>


            {/* Results Card */}
            <Grid item xs={12} md={5}>
              <Paper sx={{ p: 3, borderRadius: 4, bgcolor: 'white', height: '100%', boxShadow: '0 2px 20px rgba(0,0,0,0.06)' }}>
                {/* Dermoscopy Error (Not dermoscopic image) */}
                {dermoscopyError && !result ? (
                  <Box>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                      <Warning size={28} color="#ff9800" weight="fill" />
                      <Typography sx={{ ...s.font, fontWeight: 700, fontSize: '1.1rem', color: '#ff9800' }}>
                        Not a Dermoscopic Image
                      </Typography>
                    </Box>

                    <Alert severity="warning" sx={{ mb: 2 }}>
                      {dermoscopyError.message}
                    </Alert>

                    {/* Dermoscopy Score */}
                    <Box sx={{ bgcolor: '#fff3e0', borderRadius: 3, p: 2.5, mb: 2 }}>
                      <Typography sx={{ ...s.font, color: '#666', fontSize: '0.8rem', mb: 0.5 }}>Dermoscopy Score</Typography>
                      <Typography sx={{ ...s.font, fontWeight: 700, fontSize: '1.4rem', color: '#ff9800' }}>
                        {(dermoscopyError.dermoscopy_score * 100).toFixed(1)}%
                      </Typography>
                      <Typography sx={{ ...s.font, color: '#999', fontSize: '0.75rem', mt: 1 }}>
                        Score below 13% indicates non-dermoscopic image
                      </Typography>
                    </Box>

                    {/* Signals Breakdown */}
                    <Box sx={{ bgcolor: '#f5f5f5', borderRadius: 2, p: 2, mb: 2 }}>
                      <Typography sx={{ ...s.font, fontWeight: 600, fontSize: '0.9rem', mb: 1, color: '#333' }}>
                        Analysis Signals:
                      </Typography>
                      <Grid container spacing={1}>
                        <Grid item xs={6}>
                          <Box sx={{ bgcolor: 'white', borderRadius: 1, p: 1 }}>
                            <Typography sx={{ ...s.font, fontSize: '0.7rem', color: '#999' }}>Border Uniformity</Typography>
                            <Typography sx={{ ...s.font, fontWeight: 700, fontSize: '0.95rem', color: '#1976d2' }}>
                              {(dermoscopyError.signals.border_uniform_score * 100).toFixed(0)}%
                            </Typography>
                          </Box>
                        </Grid>
                        <Grid item xs={6}>
                          <Box sx={{ bgcolor: 'white', borderRadius: 1, p: 1 }}>
                            <Typography sx={{ ...s.font, fontSize: '0.7rem', color: '#999' }}>Clutter Score</Typography>
                            <Typography sx={{ ...s.font, fontWeight: 700, fontSize: '0.95rem', color: '#f44336' }}>
                              {(dermoscopyError.signals.clutter_score * 100).toFixed(0)}%
                            </Typography>
                          </Box>
                        </Grid>
                      </Grid>
                    </Box>

                    <Alert severity="info" sx={{ ...s.font, fontSize: '0.8rem' }}>
                      Please upload a clear dermoscopic/dermatological image for accurate analysis
                    </Alert>
                  </Box>
                ) : !result ? (
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 380, color: '#999' }}>
                    <ImageIcon size={64} weight="duotone" />
                    <Typography sx={{ ...s.font, mt: 2 }}>Results will appear here</Typography>
                  </Box>
                ) : (
                  <Box>
                    {/* Diagnosis Header */}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
                      {isBenign ? <CheckCircle size={28} color="#4caf50" weight="fill" /> : <Warning size={28} color="#f44336" weight="fill" />}
                      <Typography sx={{ ...s.font, fontWeight: 700, fontSize: '1.1rem', color: isBenign ? '#4caf50' : '#f44336' }}>
                        {isBenign ? 'Likely Benign' : 'Needs Attention'}
                      </Typography>
                    </Box>


                    {/* Condition */}
                    <Box sx={{ bgcolor: '#f8f9fa', borderRadius: 3, p: 2.5, mb: 2 }}>
                      <Typography sx={{ ...s.font, color: '#666', fontSize: '0.8rem', mb: 0.5 }}>Detected Condition</Typography>
                      <Typography sx={{ ...s.font, fontWeight: 700, fontSize: '1.4rem', color: '#1a1a2e' }}>{result.lesion_name}</Typography>
                    </Box>


                    {/* Stats */}
                    <Grid container spacing={2} sx={{ mb: 2 }}>
                      <Grid item xs={6}>
                        <Box sx={{ bgcolor: '#e3f2fd', borderRadius: 2, p: 2, textAlign: 'center' }}>
                          <Typography sx={{ ...s.font, fontWeight: 800, fontSize: '1.5rem', color: '#1976d2' }}>{result.confidence}%</Typography>
                          <Typography sx={{ ...s.font, color: '#666', fontSize: '0.75rem' }}>Confidence</Typography>
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box sx={{ bgcolor: '#f3e5f5', borderRadius: 2, p: 2, textAlign: 'center' }}>
                          <Typography sx={{ ...s.font, fontWeight: 700, fontSize: '1rem', color: '#7b1fa2' }}>{result.lesion_code}</Typography>
                          <Typography sx={{ ...s.font, color: '#666', fontSize: '0.75rem' }}>Classification</Typography>
                        </Box>
                      </Grid>
                    </Grid>


                    {/* Chips */}
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                      <Chip label={result.binary_prediction} color={isBenign ? 'success' : 'error'} size="small" sx={{ fontWeight: 600 }} />
                      <Chip label={result.filename} variant="outlined" size="small" />
                    </Box>


                    {/* Disclaimer */}
                    <Alert severity="info" sx={{ ...s.font, fontSize: '0.8rem', mb: 2 }}>
                      This is an AI prediction. Please consult a dermatologist for proper diagnosis.
                    </Alert>


                    {/* Generate Report Button */}
                    <Button
                      fullWidth
                      variant="contained"
                      startIcon={<FilePdf size={20} weight="bold" />}
                      onClick={() => setShowReport(true)}
                      sx={{
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 700,
                        fontSize: '1rem',
                        ...s.font,
                        bgcolor: '#2e7d32',
                        color: 'white',
                        '&:hover': { bgcolor: '#1b5e20' },
                      }}
                    >
                      📄 Generate Report
                    </Button>
                  </Box>
                )}
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}
