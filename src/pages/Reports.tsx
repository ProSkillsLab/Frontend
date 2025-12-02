import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Grid,
  Paper,
  Button,
  Chip,
  Skeleton,
  Alert,
} from '@mui/material';
import {
  List as MenuIcon,
  FileText,
  Eye,
  Trash,
  CheckCircle,
  Warning,
  Calendar,
} from 'phosphor-react';
import { UserButton, useUser } from '@clerk/clerk-react';
import LeftNavbar, { drawerWidth } from '../components/LeftNavbar';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const s = { font: { fontFamily: '"DM Sans", sans-serif' } };

interface Report {
  id: number;
  filename: string;
  lesion_code: string;
  lesion_name: string;
  binary_prediction: string;
  confidence: number;
  image_data: string;
  report_html: string;
  generated_at: string;
}

export default function Reports() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoaded } = useUser();

  // Fetch user's reports
  useEffect(() => {
    const fetchReports = async () => {
      if (isLoaded && user) {
        try {
          setLoading(true);
          const response = await fetch(`${API_URL}/api/reports/${user.id}`);
          if (response.ok) {
            const data = await response.json();
            setReports(data.reports || []);
          } else {
            setError('Failed to fetch reports');
          }
        } catch (err) {
          console.error('Error fetching reports:', err);
          setError('Failed to load reports');
        } finally {
          setLoading(false);
        }
      }
    };
    fetchReports();
  }, [isLoaded, user]);

  // View report in new window
  const viewReport = (report: Report) => {
    const printWindow = window.open('', '_blank', 'width=800,height=600');
    if (printWindow && report.report_html) {
      printWindow.document.write(report.report_html);
      printWindow.document.close();
    }
  };

  // Delete report
  const deleteReport = async (reportId: number) => {
    if (!confirm('Are you sure you want to delete this report?')) return;
    
    try {
      const response = await fetch(`${API_URL}/api/reports/${reportId}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        setReports(reports.filter(r => r.id !== reportId));
      }
    } catch (err) {
      console.error('Error deleting report:', err);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f7fa' }}>
      <LeftNavbar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
          bgcolor: 'white',
          borderBottom: '1px solid #e0e0e0',
        }}
      >
        <Toolbar>
          <IconButton
            edge="start"
            onClick={() => setMobileOpen(true)}
            sx={{ mr: 2, display: { sm: 'none' }, color: '#333' }}
          >
            <MenuIcon size={24} />
          </IconButton>
          <FileText size={28} color="#1976d2" weight="duotone" style={{ marginRight: 12 }} />
          <Typography variant="h6" sx={{ ...s.font, fontWeight: 700, color: '#1a1a2e', flexGrow: 1 }}>
            My Reports
          </Typography>
          <UserButton afterSignOutUrl="/" />
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, pt: 10, pb: 4, px: { xs: 2, sm: 4 } }}>
        <Container maxWidth="lg">
          {/* Header */}
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ ...s.font, fontWeight: 800, color: '#1a1a2e', mb: 1 }}>
              Saved Reports
            </Typography>
            <Typography sx={{ ...s.font, color: '#666' }}>
              View and manage your saved skin analysis reports
            </Typography>
          </Box>

          {/* Error Alert */}
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          {/* Loading State */}
          {loading ? (
            <Grid container spacing={3}>
              {[1, 2, 3].map((i) => (
                <Grid item xs={12} md={6} lg={4} key={i}>
                  <Paper sx={{ p: 3, borderRadius: 3 }}>
                    <Skeleton variant="rectangular" height={120} sx={{ borderRadius: 2, mb: 2 }} />
                    <Skeleton variant="text" width="60%" />
                    <Skeleton variant="text" width="40%" />
                  </Paper>
                </Grid>
              ))}
            </Grid>
          ) : reports.length === 0 ? (
            /* Empty State */
            <Paper
              sx={{
                p: 6,
                textAlign: 'center',
                borderRadius: 3,
                bgcolor: 'white',
              }}
            >
              <FileText size={64} color="#ccc" weight="duotone" />
              <Typography sx={{ ...s.font, fontWeight: 600, color: '#666', mt: 2 }}>
                No reports saved yet
              </Typography>
              <Typography sx={{ ...s.font, color: '#999', mt: 1 }}>
                Generate and save a report from your skin analysis to see it here
              </Typography>
            </Paper>
          ) : (
            /* Reports Grid */
            <Grid container spacing={3}>
              {reports.map((report) => {
                const isBenign = report.binary_prediction.toLowerCase() === 'benign';
                return (
                  <Grid item xs={12} md={6} lg={4} key={report.id}>
                    <Paper
                      sx={{
                        p: 0,
                        borderRadius: 3,
                        overflow: 'hidden',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
                        },
                      }}
                    >
                      {/* Image Preview */}
                      {report.image_data && (
                        <Box
                          sx={{
                            height: 140,
                            bgcolor: '#f5f5f5',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                          }}
                        >
                          <img
                            src={report.image_data}
                            alt="Scan"
                            style={{
                              maxWidth: '100%',
                              maxHeight: '100%',
                              objectFit: 'cover',
                            }}
                          />
                        </Box>
                      )}

                      {/* Report Info */}
                      <Box sx={{ p: 2.5 }}>
                        {/* Status Chip */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
                          {isBenign ? (
                            <CheckCircle size={20} color="#4caf50" weight="fill" />
                          ) : (
                            <Warning size={20} color="#f44336" weight="fill" />
                          )}
                          <Chip
                            label={report.binary_prediction}
                            size="small"
                            color={isBenign ? 'success' : 'error'}
                            sx={{ fontWeight: 600 }}
                          />
                          <Chip
                            label={`${report.confidence}%`}
                            size="small"
                            variant="outlined"
                            sx={{ fontWeight: 600 }}
                          />
                        </Box>

                        {/* Lesion Name */}
                        <Typography sx={{ ...s.font, fontWeight: 700, fontSize: '1.1rem', color: '#1a1a2e', mb: 0.5 }}>
                          {report.lesion_name}
                        </Typography>

                        {/* Date */}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 2 }}>
                          <Calendar size={14} color="#999" />
                          <Typography sx={{ ...s.font, color: '#999', fontSize: '0.8rem' }}>
                            {formatDate(report.generated_at)}
                          </Typography>
                        </Box>

                        {/* Actions */}
                        <Box sx={{ display: 'flex', gap: 1 }}>
                          <Button
                            variant="contained"
                            size="small"
                            startIcon={<Eye size={16} />}
                            onClick={() => viewReport(report)}
                            sx={{
                              flex: 1,
                              textTransform: 'none',
                              fontWeight: 600,
                              bgcolor: '#1976d2',
                              '&:hover': { bgcolor: '#1565c0' },
                            }}
                          >
                            View
                          </Button>
                          <Button
                            variant="outlined"
                            size="small"
                            color="error"
                            onClick={() => deleteReport(report.id)}
                            sx={{
                              minWidth: 40,
                              p: 1,
                            }}
                          >
                            <Trash size={16} />
                          </Button>
                        </Box>
                      </Box>
                    </Paper>
                  </Grid>
                );
              })}
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
}
