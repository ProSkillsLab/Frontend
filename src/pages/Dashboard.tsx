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
  Snackbar,
  Alert,
  keyframes,
} from '@mui/material';
import {
  List as MenuIcon,
  Users as PeopleIcon,
  ChartLine as AssessmentIcon,
  Camera,
  FileText,
  Clock,
  CheckCircle,
} from 'phosphor-react';
import { useNavigate } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';
import LeftNavbar, { drawerWidth } from '../components/LeftNavbar';

// Animations
const animations = {
  fadeInUp: keyframes`from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); }`,
  fadeInLeft: keyframes`from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); }`,
  fadeInRight: keyframes`from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); }`,
};

// Shared styles
const s = {
  font: { fontFamily: '"DM Sans", sans-serif' },
  iconSize: { xs: 50, sm: 60 },
  card: {
    borderRadius: 3,
    bgcolor: 'white',
    border: '1px solid rgba(0,0,0,0.06)',
    transition: 'all 0.3s ease',
  },
  cardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
  },
  sectionTitle: { fontWeight: 700, color: '#1A237E', mb: 2 },
  anim: (type: keyof typeof animations, delay = 0) => ({
    animation: `${animations[type]} 0.6s ease-out ${delay}s forwards`,
    opacity: 0,
  }),
  iconBox: (bg: string, size = 50) => ({
    width: size,
    height: size,
    minWidth: size,
    borderRadius: 2,
    bgcolor: bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }),
};

// Data
const statsData = [
  { icon: <PeopleIcon size={28} weight="duotone" />, value: '1,234', label: 'Total Scans', bgColor: '#4FC3F7' },
  { icon: <Clock size={28} weight="duotone" />, value: '24', label: 'This Week', bgColor: '#1E88E5' },
  { icon: <CheckCircle size={28} weight="duotone" />, value: '8', label: 'Pending Reviews', bgColor: '#26A69A' },
  { icon: <FileText size={28} weight="duotone" />, value: '156', label: 'Reports Generated', bgColor: '#AB47BC' },
];

const quickActions = [
  { icon: <Camera size={24} weight="duotone" />, title: 'New Scan', description: 'Start a new skin analysis', route: '/analysis', bgColor: '#E3F2FD' },
  { icon: <FileText size={24} weight="duotone" />, title: 'View Reports', description: 'Access your scan history', route: '/reports', bgColor: '#E8F5E9' },
  { icon: <AssessmentIcon size={24} weight="duotone" />, title: 'Analytics', description: 'View detailed insights', route: '/analytics', bgColor: '#FFF3E0' },
];

// Components
const StatCard = ({ icon, value, label, bgColor, index }: typeof statsData[0] & { index: number }) => (
  <Paper elevation={0} sx={{ ...s.card, p: { xs: 2, sm: 3 }, display: 'flex', alignItems: 'center', gap: 2, ...s.anim('fadeInUp', 0.1 + index * 0.1), '&:hover': s.cardHover }}>
    <Box sx={{ ...s.iconBox(bgColor, s.iconSize.sm), color: 'white', boxShadow: `0 4px 15px ${bgColor}50` }}>{icon}</Box>
    <Box>
      <Typography sx={{ ...s.font, fontWeight: 800, fontSize: { xs: '1.5rem', sm: '2rem' }, color: '#1A237E', lineHeight: 1 }}>{value}</Typography>
      <Typography sx={{ ...s.font, color: 'text.secondary', fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>{label}</Typography>
    </Box>
  </Paper>
);

const QuickActionCard = ({ icon, title, description, route, bgColor, index }: typeof quickActions[0] & { index: number }) => {
  const navigate = useNavigate();
  return (
    <Paper elevation={0} onClick={() => navigate(route)} sx={{ ...s.card, p: { xs: 2.5, sm: 3 }, cursor: 'pointer', ...s.anim('fadeInUp', 0.3 + index * 0.1), '&:hover': { ...s.cardHover, transform: 'translateY(-5px) scale(1.02)', '& .action-icon': { transform: 'scale(1.1)' } } }}>
      <Box className="action-icon" sx={{ ...s.iconBox(bgColor), color: '#1976d2', mb: 2, transition: 'transform 0.3s ease' }}>{icon}</Box>
      <Typography sx={{ ...s.font, fontWeight: 700, fontSize: '1.1rem', mb: 0.5, color: '#1A237E' }}>{title}</Typography>
      <Typography sx={{ ...s.font, color: 'text.secondary', fontSize: '0.85rem', lineHeight: 1.5 }}>{description}</Typography>
    </Paper>
  );
};

const SectionTitle = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <Typography variant="h6" sx={{ ...s.font, ...s.sectionTitle, ...s.anim('fadeInUp', delay) }}>{children}</Typography>
);

function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoaded && user && showWelcome) {
      const timer = setTimeout(() => setShowWelcome(false), 6000);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, user, showWelcome]);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f8fafc' }}>
      <LeftNavbar mobileOpen={mobileOpen} onMobileClose={() => setMobileOpen(false)} />
      
      <AppBar position="fixed" elevation={0} sx={{ width: { sm: `calc(100% - ${drawerWidth}px)` }, ml: { sm: `${drawerWidth}px` }, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <Toolbar>
          <IconButton color="inherit" edge="start" onClick={() => setMobileOpen(true)} sx={{ mr: 2, display: { sm: 'none' } }}>
            <MenuIcon size={24} />
          </IconButton>
          <Typography variant="h6" noWrap sx={{ ...s.font, fontWeight: 700, flexGrow: 1 }}>Dashboard</Typography>
          <UserButton afterSignOutUrl="/" />
        </Toolbar>
      </AppBar>

      <Box component="main" sx={{ flexGrow: 1, width: { sm: `calc(100% - ${drawerWidth}px)` } }}>
        {/* Hero Banner */}
        <Box sx={{ background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 50%, #1A237E 100%)', color: 'white', pt: { xs: 10, sm: 12 }, pb: { xs: 4, sm: 6 }, px: { xs: 2, sm: 4 } }}>
          <Container maxWidth="lg">
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={8}>
                <Typography variant="h3" component="h1" sx={{ ...s.font, fontWeight: 800, fontSize: { xs: '1.75rem', sm: '2.25rem', md: '2.75rem' }, mb: 1, ...s.anim('fadeInLeft') }}>
                  Welcome back, {user?.firstName || 'User'}! 👋
                </Typography>
                <Typography sx={{ ...s.font, color: 'rgba(255,255,255,0.8)', fontSize: { xs: '0.95rem', sm: '1.1rem' }, maxWidth: 600, ...s.anim('fadeInLeft', 0.1) }}>
                  Ready to check your skin health? Start a new analysis or review your previous scans.
                </Typography>
              </Grid>
              <Grid item xs={12} md={4} sx={{ textAlign: { xs: 'left', md: 'right' } }}>
                <Button variant="contained" size="large" startIcon={<Camera size={20} weight="bold" />} onClick={() => navigate('/analysis')} sx={{ ...s.font, bgcolor: '#EF5350', color: 'white', px: { xs: 3, sm: 4 }, py: { xs: 1.2, sm: 1.5 }, fontSize: { xs: '0.9rem', sm: '1rem' }, fontWeight: 700, borderRadius: 2, textTransform: 'none', boxShadow: '0 4px 15px rgba(239, 83, 80, 0.4)', ...s.anim('fadeInRight', 0.2), '&:hover': { bgcolor: '#E53935', transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(239, 83, 80, 0.5)' }, transition: 'all 0.3s ease' }}>
                  Start New Scan
                </Button>
              </Grid>
            </Grid>
          </Container>
        </Box>

        {/* Main Content */}
        <Container maxWidth="lg" sx={{ py: { xs: 3, sm: 4 }, px: { xs: 2, sm: 3 } }}>
          <SectionTitle>Overview</SectionTitle>
          <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 4, sm: 5 } }}>
            {statsData.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}><StatCard {...stat} index={index} /></Grid>
            ))}
          </Grid>

          <SectionTitle delay={0.2}>Quick Actions</SectionTitle>
          <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mb: { xs: 4, sm: 5 } }}>
            {quickActions.map((action, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}><QuickActionCard {...action} index={index} /></Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Snackbar open={showWelcome} autoHideDuration={6000} onClose={() => setShowWelcome(false)} anchorOrigin={{ vertical: 'top', horizontal: 'right' }} sx={{ zIndex: 9999, mt: 8 }}>
        <Alert onClose={() => setShowWelcome(false)} severity="success" sx={{ width: '100%', fontSize: '1rem', ...s.font }} variant="filled">
          Welcome {user?.fullName || user?.firstName || user?.username || 'User'} to DermaAI!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Dashboard;