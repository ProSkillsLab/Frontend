import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Paper,
  Skeleton,
  Alert,
  ToggleButton,
  ToggleButtonGroup,
} from '@mui/material';
import {
  List as MenuIcon,
  ChartBar,
  CalendarBlank,
  TrendUp,
  Camera,
} from 'phosphor-react';
import { UserButton, useUser } from '@clerk/clerk-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
} from 'recharts';
import LeftNavbar, { drawerWidth } from '../components/LeftNavbar';

const API_URL = import.meta.env.VITE_API_URL;
const s = { font: { fontFamily: '"DM Sans", sans-serif' } };

interface ReportData {
  generated_at: string;
  lesion_name: string;
  binary_prediction: string;
}

interface MonthlyData {
  month: string;
  fullMonth: string;
  count: number;
  benign: number;
  malignant: number;
}

// Helper to get month name
const getMonthName = (monthIndex: number, short = false) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 
                  'July', 'August', 'September', 'October', 'November', 'December'];
  const shortMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return short ? shortMonths[monthIndex] : months[monthIndex];
};

// Process data to get monthly statistics
const processMonthlyData = (reports: ReportData[]): MonthlyData[] => {
  const monthlyMap = new Map<string, { count: number; benign: number; malignant: number }>();
  
  // Initialize last 12 months
  const now = new Date();
  for (let i = 11; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    monthlyMap.set(key, { count: 0, benign: 0, malignant: 0 });
  }
  
  // Count reports per month
  reports.forEach(report => {
    const date = new Date(report.generated_at);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    
    if (monthlyMap.has(key)) {
      const data = monthlyMap.get(key)!;
      data.count++;
      if (report.binary_prediction.toLowerCase() === 'benign') {
        data.benign++;
      } else {
        data.malignant++;
      }
    }
  });
  
  // Convert to array
  return Array.from(monthlyMap.entries()).map(([key, data]) => {
    const [year, month] = key.split('-');
    const monthIndex = parseInt(month) - 1;
    return {
      month: getMonthName(monthIndex, true),
      fullMonth: `${getMonthName(monthIndex)} ${year}`,
      count: data.count,
      benign: data.benign,
      malignant: data.malignant,
    };
  });
};

// Stat Card Component
const StatCard = ({ label, value, icon, color, bg }: { 
  label: string; 
  value: number | string; 
  icon: React.ReactNode; 
  color: string; 
  bg: string;
}) => (
  <Paper sx={{ 
    flex: { xs: '1 1 calc(50% - 8px)', md: '1 1 200px' }, 
    p: { xs: 2, sm: 3 }, 
    borderRadius: 3, 
    border: '1px solid #e2e8f0', 
    boxShadow: 'none', 
    display: 'flex', 
    alignItems: 'center', 
    gap: 2 
  }}>
    <Box sx={{ 
      width: { xs: 44, sm: 52 }, 
      height: { xs: 44, sm: 52 }, 
      borderRadius: 3, 
      bgcolor: bg, 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center', 
      color 
    }}>
      {icon}
    </Box>
    <Box>
      <Typography sx={{ ...s.font, fontSize: { xs: '1.5rem', sm: '1.8rem' }, fontWeight: 800, color: '#0f172a', lineHeight: 1 }}>
        {value}
      </Typography>
      <Typography sx={{ ...s.font, fontSize: { xs: '0.75rem', sm: '0.85rem' }, color: '#64748b' }}>
        {label}
      </Typography>
    </Box>
  </Paper>
);

// Loading Skeleton
const LoadingSkeleton = () => (
  <Box>
    <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
      {[1, 2, 3, 4].map(i => (
        <Skeleton key={i} variant="rounded" width={200} height={90} sx={{ flex: '1 1 200px', borderRadius: 3 }} />
      ))}
    </Box>
    <Skeleton variant="rounded" height={400} sx={{ borderRadius: 3 }} />
  </Box>
);

// Custom Tooltip
const CustomTooltip = ({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number; name: string; color: string }>; label?: string }) => {
  if (active && payload && payload.length) {
    return (
      <Paper sx={{ p: 2, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.15)' }}>
        <Typography sx={{ ...s.font, fontWeight: 700, mb: 1 }}>{label}</Typography>
        {payload.map((entry, index) => (
          <Typography key={index} sx={{ ...s.font, fontSize: '0.85rem', color: entry.color }}>
            {entry.name}: {entry.value}
          </Typography>
        ))}
      </Paper>
    );
  }
  return null;
};

export default function Analytics() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [monthlyData, setMonthlyData] = useState<MonthlyData[]>([]);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'area'>('bar');
  const { user, isLoaded } = useUser();

  // Calculate stats
  const totalScans = monthlyData.reduce((sum, m) => sum + m.count, 0);
  const totalBenign = monthlyData.reduce((sum, m) => sum + m.benign, 0);
  const totalMalignant = monthlyData.reduce((sum, m) => sum + m.malignant, 0);
  const mostActiveMonth = monthlyData.reduce((max, m) => m.count > max.count ? m : max, { fullMonth: 'N/A', count: 0 });

  useEffect(() => {
    if (!isLoaded || !user) return;

    const fetchAnalytics = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${API_URL}/api/reports/${user.id}`);
        if (res.ok) {
          const data = await res.json();
          const reports = data.reports || [];
          setMonthlyData(processMonthlyData(reports));
        } else {
          setError('Failed to fetch analytics data');
        }
      } catch {
        setError('Failed to load analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, [isLoaded, user]);

  const renderChart = () => {
    const commonProps = {
      data: monthlyData,
      margin: { top: 20, right: 30, left: 20, bottom: 5 },
    };

    switch (chartType) {
      case 'line':
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 12 }} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Line type="monotone" dataKey="count" name="Total Scans" stroke="#3b82f6" strokeWidth={3} dot={{ fill: '#3b82f6', strokeWidth: 2, r: 5 }} />
            <Line type="monotone" dataKey="benign" name="Benign" stroke="#22c55e" strokeWidth={2} dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }} />
            <Line type="monotone" dataKey="malignant" name="Needs Attention" stroke="#ef4444" strokeWidth={2} dot={{ fill: '#ef4444', strokeWidth: 2, r: 4 }} />
          </LineChart>
        );
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 12 }} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="benign" name="Benign" stackId="1" stroke="#22c55e" fill="#bbf7d0" />
            <Area type="monotone" dataKey="malignant" name="Needs Attention" stackId="1" stroke="#ef4444" fill="#fecaca" />
          </AreaChart>
        );
      default:
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 12 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 12 }} allowDecimals={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="benign" name="Benign" fill="#22c55e" radius={[4, 4, 0, 0]} />
            <Bar dataKey="malignant" name="Needs Attention" fill="#ef4444" radius={[4, 4, 0, 0]} />
          </BarChart>
        );
    }
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <LeftNavbar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />

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
              bgcolor: '#f0fdf4', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <ChartBar size={22} color="#22c55e" weight="duotone" />
            </Box>
            <Box>
              <Typography sx={{ ...s.font, fontWeight: 700, color: '#0f172a', fontSize: '1.1rem', lineHeight: 1.2 }}>
                Analytics
              </Typography>
              <Typography sx={{ ...s.font, color: '#64748b', fontSize: '0.75rem' }}>
                Track your scan activity
              </Typography>
            </Box>
          </Box>
          <UserButton afterSignOutUrl="/" />
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, pt: 11, pb: 4, px: { xs: 2, sm: 3 } }}>
        <Container maxWidth="xl">
          {error && <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>{error}</Alert>}

          {loading ? (
            <LoadingSkeleton />
          ) : (
            <>
              {/* Stats Cards */}
              <Box sx={{ display: 'flex', gap: 2, mb: 4, flexWrap: 'wrap' }}>
                <StatCard 
                  label="Total Scans" 
                  value={totalScans} 
                  icon={<Camera size={24} />} 
                  color="#3b82f6" 
                  bg="#eff6ff" 
                />
                <StatCard 
                  label="Benign Results" 
                  value={totalBenign} 
                  icon={<TrendUp size={24} />} 
                  color="#22c55e" 
                  bg="#f0fdf4" 
                />
                <StatCard 
                  label="Needs Attention" 
                  value={totalMalignant} 
                  icon={<TrendUp size={24} />} 
                  color="#ef4444" 
                  bg="#fef2f2" 
                />
                <StatCard 
                  label="Most Active Month" 
                  value={mostActiveMonth.count > 0 ? mostActiveMonth.fullMonth.split(' ')[0] : 'N/A'} 
                  icon={<CalendarBlank size={24} />} 
                  color="#8b5cf6" 
                  bg="#f5f3ff" 
                />
              </Box>

              {/* Chart Section */}
              <Paper sx={{ p: { xs: 2, sm: 4 }, borderRadius: 3, border: '1px solid #e2e8f0', boxShadow: 'none' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3, flexWrap: 'wrap', gap: 2 }}>
                  <Box>
                    <Typography sx={{ ...s.font, fontWeight: 700, fontSize: '1.2rem', color: '#0f172a' }}>
                      Monthly Scan Activity
                    </Typography>
                    <Typography sx={{ ...s.font, color: '#64748b', fontSize: '0.85rem' }}>
                      Your scan history over the last 12 months
                    </Typography>
                  </Box>
                  <ToggleButtonGroup
                    value={chartType}
                    exclusive
                    onChange={(_, value) => value && setChartType(value)}
                    size="small"
                    sx={{ 
                      '& .MuiToggleButton-root': { 
                        ...s.font, 
                        textTransform: 'none',
                        px: 2,
                        '&.Mui-selected': { 
                          bgcolor: '#3b82f6', 
                          color: 'white',
                          '&:hover': { bgcolor: '#2563eb' }
                        }
                      }
                    }}
                  >
                    <ToggleButton value="bar">Bar</ToggleButton>
                    <ToggleButton value="line">Line</ToggleButton>
                    <ToggleButton value="area">Area</ToggleButton>
                  </ToggleButtonGroup>
                </Box>

                <Box sx={{ width: '100%', height: { xs: 300, sm: 400 } }}>
                  <ResponsiveContainer width="100%" height="100%">
                    {renderChart()}
                  </ResponsiveContainer>
                </Box>

                {/* Legend */}
                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mt: 3 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: '#22c55e' }} />
                    <Typography sx={{ ...s.font, fontSize: '0.85rem', color: '#64748b' }}>Benign</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Box sx={{ width: 12, height: 12, borderRadius: 1, bgcolor: '#ef4444' }} />
                    <Typography sx={{ ...s.font, fontSize: '0.85rem', color: '#64748b' }}>Needs Attention</Typography>
                  </Box>
                </Box>
              </Paper>

              {/* Additional Info */}
              {totalScans === 0 && (
                <Paper sx={{ 
                  mt: 3, 
                  p: { xs: 4, sm: 6 }, 
                  textAlign: 'center', 
                  borderRadius: 3, 
                  border: '2px dashed #e2e8f0', 
                  bgcolor: 'transparent' 
                }}>
                  <Box sx={{ 
                    width: 80, 
                    height: 80, 
                    borderRadius: '50%', 
                    bgcolor: '#f1f5f9', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    mx: 'auto', 
                    mb: 3 
                  }}>
                    <ChartBar size={36} color="#94a3b8" />
                  </Box>
                  <Typography sx={{ ...s.font, fontWeight: 700, color: '#334155', fontSize: '1.2rem', mb: 1 }}>
                    No scan data yet
                  </Typography>
                  <Typography sx={{ ...s.font, color: '#64748b', maxWidth: 400, mx: 'auto' }}>
                    Start analyzing skin conditions to see your activity trends here.
                  </Typography>
                </Paper>
              )}
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
}
