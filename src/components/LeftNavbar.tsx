import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  IconButton,
} from '@mui/material';
import {
  SquaresFour as DashboardIcon,
  ChartLine as AssessmentIcon,
  FileText as ReportsIcon,
  ChartBar as AnalyticsIcon,
  X as CloseIcon,
} from 'phosphor-react';
import { Link as RouterLink, useLocation } from 'react-router-dom';

const drawerWidth = 240;

const s = {
  font: { fontFamily: '"DM Sans", sans-serif' },
};

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon size={24} />, route: '/dashboard' },
  { text: 'Analysis', icon: <AssessmentIcon size={24} />, route: '/analysis' },
  { text: 'Reports', icon: <ReportsIcon size={24} />, route: '/reports' },
  { text: 'Analytics', icon: <AnalyticsIcon size={24} />, route: '/analytics' },
];

interface LeftNavbarProps {
  mobileOpen?: boolean;
  onMobileClose?: () => void;
}

function LeftNavbar({ mobileOpen = false, onMobileClose }: LeftNavbarProps) {
  const location = useLocation();

  const drawerContent = (
    <Box sx={{ background: 'linear-gradient(180deg, #1565C0 0%, #0D47A1 100%)', height: '100%', color: 'white' }}>
      <Toolbar sx={{ borderBottom: '1px solid rgba(255,255,255,0.1)', justifyContent: 'space-between' }}>
        <Typography
          variant="h6"
          noWrap
          component={RouterLink}
          to="/"
          sx={{
            ...s.font,
            fontWeight: 800,
            textDecoration: 'none',
            color: 'inherit',
            cursor: 'pointer',
            '&:hover': { opacity: 0.9 },
          }}
        >
          DermaAI
        </Typography>
        <IconButton onClick={onMobileClose} sx={{ color: 'white', display: { sm: 'none' } }}>
          <CloseIcon size={24} />
        </IconButton>
      </Toolbar>
      <List sx={{ px: 1, pt: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.route;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                component={RouterLink}
                to={item.route}
                onClick={onMobileClose}
                sx={{
                  borderRadius: 2,
                  bgcolor: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
                }}
              >
                <ListItemIcon sx={{ color: 'white', minWidth: 40 }}>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} primaryTypographyProps={{ sx: s.font }} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Box component="nav" sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}>
      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none' },
        }}
      >
        {drawerContent}
      </Drawer>
      
      {/* Desktop Drawer */}
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: 'none', sm: 'block' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, border: 'none' },
        }}
        open
      >
        {drawerContent}
      </Drawer>
    </Box>
  );
}

export { drawerWidth };
export default LeftNavbar;
