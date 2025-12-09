import { useState, useEffect } from 'react';
import { Box, Container, AppBar, Toolbar, Typography, IconButton, Paper, Button, Chip, Skeleton, Alert, LinearProgress, Snackbar } from '@mui/material';
import { List as MenuIcon, FileText, Eye, Trash, CheckCircle, Warning, Calendar, MagnifyingGlass, SortAscending, FolderOpen } from 'phosphor-react';
import { UserButton, useUser } from '@clerk/clerk-react';
import LeftNavbar, { drawerWidth } from '../components/LeftNavbar';
import AnalysisReport from '../components/AnalysisReport';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
const s = { font: { fontFamily: '"DM Sans", sans-serif' } };

interface Report {
  _id: string;
  filename: string;
  lesion_code: string;
  lesion_name: string;
  binary_prediction: string;
  confidence: number;
  image_data: string;
  report_html: string;
  generated_at: string;
}

const formatDate = (dateString: string) => new Date(dateString).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
const formatTime = (dateString: string) => new Date(dateString).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

// Reusable Components
const StatCard = ({ label, value, icon, color, bg }: { label: string; value: number; icon: React.ReactNode; color: string; bg: string }) => (
  <Paper sx={{ flex: { xs: '1 1 calc(50% - 6px)', sm: '1 1 200px' }, p: { xs: 1.5, sm: 2.5 }, borderRadius: { xs: 2, sm: 3 }, border: '1px solid #e2e8f0', boxShadow: 'none', display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 2 } }}>
    <Box sx={{ width: { xs: 36, sm: 44 }, height: { xs: 36, sm: 44 }, borderRadius: { xs: 2, sm: 2.5 }, bgcolor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color }}>{icon}</Box>
    <Box>
      <Typography sx={{ ...s.font, fontSize: { xs: '1.2rem', sm: '1.5rem' }, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>{value}</Typography>
      <Typography sx={{ ...s.font, fontSize: { xs: '0.7rem', sm: '0.8rem' }, color: '#64748b' }}>{label}</Typography>
    </Box>
  </Paper>
);

const SearchBar = ({ value, onChange }: { value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void }) => (
  <Box sx={{ flex: 1, minWidth: { xs: '100%', sm: 200 }, display: 'flex', alignItems: 'center', gap: 1, bgcolor: '#f8fafc', borderRadius: 2, px: 2, py: 1, border: '1px solid #e2e8f0' }}>
    <MagnifyingGlass size={18} color="#94a3b8" />
    <input
      type="text"
      placeholder="Search reports..."
      value={value}
      onChange={onChange}
      style={{ border: 'none', outline: 'none', background: 'transparent', width: '100%', fontFamily: '"DM Sans", sans-serif', fontSize: '0.9rem', color: '#334155' }}
    />
  </Box>
);

const LoadingSkeleton = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
    {[1, 2, 3].map(i => (
      <Paper key={i} sx={{ p: 3, borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
        <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
          <Skeleton variant="rounded" width={80} height={80} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width="40%" height={28} />
            <Skeleton variant="text" width="25%" height={20} />
          </Box>
        </Box>
      </Paper>
    ))}
  </Box>
);

const EmptyState = ({ searchTerm }: { searchTerm: string }) => (
  <Paper sx={{ p: { xs: 4, sm: 8 }, textAlign: 'center', borderRadius: { xs: 3, sm: 4 }, border: '2px dashed #e2e8f0', bgcolor: 'transparent' }}>
    <Box sx={{ width: { xs: 60, sm: 80 }, height: { xs: 60, sm: 80 }, borderRadius: '50%', bgcolor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: { xs: 2, sm: 3 } }}>
      <FolderOpen size={36} color="#94a3b8" />
    </Box>
    <Typography sx={{ ...s.font, fontWeight: 700, color: '#334155', fontSize: { xs: '1rem', sm: '1.2rem' }, mb: 1 }}>
      {searchTerm ? 'No matching reports' : 'No reports yet'}
    </Typography>
    <Typography sx={{ ...s.font, color: '#64748b', maxWidth: 400, mx: 'auto', fontSize: { xs: '0.875rem', sm: '1rem' } }}>
      {searchTerm ? 'Try a different search term' : 'Start by analyzing a skin condition. Your reports will appear here.'}
    </Typography>
  </Paper>
);

const ConfidenceBar = ({ confidence }: { confidence: number }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, maxWidth: { xs: '100%', sm: 300 } }}>
    <Typography sx={{ ...s.font, fontSize: '0.75rem', color: '#64748b', minWidth: 70 }}>Confidence</Typography>
    <Box sx={{ flex: 1 }}>
      <LinearProgress 
        variant="determinate" 
        value={confidence} 
        sx={{ 
          height: 6, borderRadius: 3, bgcolor: '#e2e8f0',
          '& .MuiLinearProgress-bar': { borderRadius: 3, bgcolor: confidence > 80 ? '#22c55e' : confidence > 60 ? '#eab308' : '#ef4444' }
        }} 
      />
    </Box>
    <Typography sx={{ ...s.font, fontSize: '0.8rem', fontWeight: 700, color: '#0f172a', minWidth: 40 }}>{confidence}%</Typography>
  </Box>
);

const StatusChip = ({ isBenign, label }: { isBenign: boolean; label: string }) => (
  <Chip 
    icon={isBenign ? <CheckCircle size={14} weight="fill" /> : <Warning size={14} weight="fill" />}
    label={label} 
    size="small" 
    sx={{ 
      fontWeight: 600, fontSize: '0.7rem',
      bgcolor: isBenign ? '#f0fdf4' : '#fef2f2', 
      color: isBenign ? '#16a34a' : '#dc2626',
      border: `1px solid ${isBenign ? '#bbf7d0' : '#fecaca'}`,
      '& .MuiChip-icon': { color: 'inherit' }
    }} 
  />
);

const ReportCard = ({ report, onView, onDelete, isDeleting }: { report: Report; onView: () => void; onDelete: () => void; isDeleting: boolean }) => {
  const isBenign = report.binary_prediction.toLowerCase() === 'benign';
  
  return (
    <Paper sx={{ p: 0, borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none', overflow: 'hidden', transition: 'all 0.2s', '&:hover': { borderColor: '#3b82f6', boxShadow: '0 4px 20px rgba(59,130,246,0.1)' } }}>
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'stretch' }}>
        {/* Image */}
        {report.image_data && (
          <Box sx={{ width: { xs: '100%', sm: 140 }, height: { xs: 180, sm: 'auto' }, minHeight: { sm: 120 }, bgcolor: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, borderRight: { sm: '1px solid #e2e8f0' }, borderBottom: { xs: '1px solid #e2e8f0', sm: 'none' } }}>
            <img src={report.image_data} alt="Scan" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          </Box>
        )}
        
        {/* Content */}
        <Box sx={{ flex: 1, p: { xs: 2, sm: 2.5 }, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'flex-start', md: 'flex-start' }, justifyContent: 'space-between', gap: 2 }}>
            <Box sx={{ flex: 1, width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, flexWrap: 'wrap' }}>
                <Typography sx={{ ...s.font, fontWeight: 700, fontSize: { xs: '1rem', sm: '1.1rem' }, color: '#0f172a' }}>{report.lesion_name}</Typography>
                <StatusChip isBenign={isBenign} label={report.binary_prediction} />
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1.5, sm: 3 }, mb: 1.5, flexWrap: 'wrap' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                  <Calendar size={14} color="#94a3b8" />
                  <Typography sx={{ ...s.font, color: '#64748b', fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>{formatDate(report.generated_at)}</Typography>
                </Box>
                <Typography sx={{ ...s.font, color: '#94a3b8', fontSize: { xs: '0.75rem', sm: '0.8rem' } }}>{formatTime(report.generated_at)}</Typography>
                <Chip label={report.lesion_code} size="small" sx={{ ...s.font, fontSize: '0.7rem', fontWeight: 600, bgcolor: '#f1f5f9', color: '#475569' }} />
              </Box>

              <ConfidenceBar confidence={report.confidence} />
            </Box>

            {/* Actions */}
            <Box sx={{ display: 'flex', gap: 1, flexShrink: 0, width: { xs: '100%', md: 'auto' }, mt: { xs: 1, md: 0 } }}>
              <Button 
                variant="contained" 
                size="small" 
                startIcon={<Eye size={16} />} 
                onClick={onView} 
                sx={{ ...s.font, textTransform: 'none', fontWeight: 600, bgcolor: '#3b82f6', borderRadius: 2, px: 2, flex: { xs: 1, md: 'none' }, '&:hover': { bgcolor: '#2563eb' } }}
              >
                View
              </Button>
              <IconButton 
                size="small" 
                onClick={onDelete} 
                disabled={isDeleting}
                sx={{ color: '#ef4444', bgcolor: '#fef2f2', borderRadius: 2, '&:hover': { bgcolor: '#fee2e2' }, '&:disabled': { opacity: 0.5 } }}
              >
                <Trash size={18} />
              </IconButton>
            </Box>
          </Box>
        </Box>
      </Box>
    </Paper>
  );
};

// Stats data
const getStatsData = (total: number, benign: number, alert: number) => [
  { label: 'Total Reports', value: total, icon: <FileText size={20} />, color: '#3b82f6', bg: '#eff6ff' },
  { label: 'Benign', value: benign, icon: <CheckCircle size={20} weight="fill" />, color: '#22c55e', bg: '#f0fdf4' },
  { label: 'Needs Attention', value: alert, icon: <Warning size={20} weight="fill" />, color: '#ef4444', bg: '#fef2f2' },
];

export default function Reports() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [reports, setReports] = useState<Report[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleting, setDeleting] = useState<string | null>(null);
  const [snackbar, setSnackbar] = useState<{ open: boolean; message: string; severity: 'success' | 'error' }>({ open: false, message: '', severity: 'success' });
  const { user, isLoaded } = useUser();

  useEffect(() => {
    if (!isLoaded || !user) return;
    (async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/reports/${user.id}`);
        if (res.ok) setReports((await res.json()).reports || []);
        else setError('Failed to fetch reports');
      } catch { setError('Failed to load reports'); }
      finally { setLoading(false); }
    })();
  }, [isLoaded, user]);

  const deleteReport = async (reportId: string) => {
    if (!confirm('Are you sure you want to delete this report?')) return;
    
    // Handle MongoDB ObjectId - might be object like {$oid: "..."} or plain string
    const id = typeof reportId === 'object' ? (reportId as any).$oid || String(reportId) : reportId;
    console.log('Deleting report with ID:', id);
    
    setDeleting(id);
    try {
      const res = await fetch(`${API_URL}/api/report/${id}`, { 
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
      });
      const data = await res.json();
      if (data.success) {
        setReports(reports.filter(r => {
          const rId = typeof r._id === 'object' ? (r._id as any).$oid : r._id;
          return rId !== id;
        }));
        setSnackbar({ open: true, message: 'Report deleted successfully', severity: 'success' });
      } else {
        setSnackbar({ open: true, message: data.error || 'Failed to delete report', severity: 'error' });
      }
    } catch (e) { 
      console.error('Delete error:', e);
      setSnackbar({ open: true, message: 'Failed to delete report', severity: 'error' });
    } finally {
      setDeleting(null);
    }
  };

  const filteredReports = reports.filter(r => 
    r.lesion_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.binary_prediction.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const benignCount = reports.filter(r => r.binary_prediction.toLowerCase() === 'benign').length;
  const alertCount = reports.length - benignCount;

  if (selectedReport) {
    return (
      <AnalysisReport
        image={selectedReport.image_data}
        result={{ filename: selectedReport.filename, lesion_code: selectedReport.lesion_code, lesion_name: selectedReport.lesion_name, binary_prediction: selectedReport.binary_prediction, confidence: selectedReport.confidence }}
        onClose={() => setSelectedReport(null)}
        hideSave
      />
    );
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <LeftNavbar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

      <AppBar position="fixed" elevation={0} sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, bgcolor: 'white', borderBottom: '1px solid #e2e8f0' }}>
        <Toolbar>
          <IconButton edge="start" onClick={() => setMobileOpen(true)} sx={{ mr: 2, display: { sm: 'none' }, color: '#334155' }}><MenuIcon size={24} /></IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, flexGrow: 1 }}>
            <Box sx={{ width: 40, height: 40, borderRadius: 2, bgcolor: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FileText size={22} color="#3b82f6" weight="duotone" />
            </Box>
            <Box>
              <Typography sx={{ ...s.font, fontWeight: 700, color: '#0f172a', fontSize: '1.1rem', lineHeight: 1.2 }}>Reports</Typography>
              <Typography sx={{ ...s.font, color: '#64748b', fontSize: '0.75rem' }}>{reports.length} total reports</Typography>
            </Box>
          </Box>
          <UserButton afterSignOutUrl="/" />
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, pt: 11, pb: 4, px: { xs: 2, sm: 3 } }}>
        <Container maxWidth="xl">
          {/* Stats Cards */}
          <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2 }, mb: 3, flexWrap: 'wrap' }}>
            {getStatsData(reports.length, benignCount, alertCount).map((stat, i) => (
              <StatCard key={i} {...stat} />
            ))}
          </Box>

          {/* Search & Filter Bar */}
          <Paper sx={{ p: { xs: 1.5, sm: 2 }, mb: 3, borderRadius: { xs: 2, sm: 3 }, border: '1px solid #e2e8f0', boxShadow: 'none', display: 'flex', gap: { xs: 1, sm: 2 }, alignItems: 'center', flexWrap: 'wrap' }}>
            <SearchBar value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
            <Button startIcon={<SortAscending size={18} />} sx={{ ...s.font, textTransform: 'none', color: '#64748b', fontWeight: 600, display: { xs: 'none', sm: 'flex' } }}>
              Sort by Date
            </Button>
          </Paper>

          {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

          {/* Reports List */}
          {loading ? (
            <LoadingSkeleton />
          ) : filteredReports.length === 0 ? (
            <EmptyState searchTerm={searchTerm} />
          ) : (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {filteredReports.map(report => (
                <ReportCard
                  key={report._id}
                  report={report}
                  onView={() => setSelectedReport(report)}
                  onDelete={() => deleteReport(report._id)}
                  isDeleting={deleting === report._id}
                />
              ))}
            </Box>
          )}
        </Container>
      </Box>

      {/* Snackbar for feedback */}
      <Snackbar 
        open={snackbar.open} 
        autoHideDuration={4000} 
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
