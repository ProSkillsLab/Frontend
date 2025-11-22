import { useState, useEffect } from 'react';
import {
  Box,
  Container,
  AppBar,
  Toolbar,
  Typography,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Grid,
  Card,
  CardContent,
  Paper,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  List as MenuIcon,
  SquaresFour as DashboardIcon,
  Users as PeopleIcon,
  ChartLine as AssessmentIcon,
  Info as InfoIcon,
} from 'phosphor-react';
import { Link as RouterLink } from 'react-router-dom';
import { UserButton, useUser } from '@clerk/clerk-react';

const drawerWidth = 240;

function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true); // Changed to true by default
  const { user, isLoaded } = useUser();

  useEffect(() => {
    // Simple timer to hide the welcome message after 6 seconds
    if (isLoaded && user && showWelcome) {
      const timer = setTimeout(() => {
        setShowWelcome(false);
      }, 6000);
      
      return () => clearTimeout(timer);
    }
  }, [isLoaded, user, showWelcome]);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleCloseWelcome = () => {
    setShowWelcome(false);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon size={24} />, route: '/dashboard' },
    { text: 'Patients', icon: <PeopleIcon size={24} /> },
    { text: 'Analysis', icon: <AssessmentIcon size={24} />, route: '/analysis' },
    { text: 'About', icon: <InfoIcon size={24} />, route: '/about' },
  ];

  const drawer = (
    <Box>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          DermaAI
        </Typography>
      </Toolbar>
      <List>
        {menuItems.map((item) => (
          <ListItem key={item.text} disablePadding>
            {item.route ? (
              <ListItemButton component={RouterLink} to={item.route}>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            ) : (
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            )}
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon size={24} />
          </IconButton>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Dashboard
          </Typography>
          <UserButton afterSignOutUrl="/" />
        </Toolbar>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Total Patients
                  </Typography>
                  <Typography variant="h4" component="div">
                    1,234
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Today's Appointments
                  </Typography>
                  <Typography variant="h4" component="div">
                    24
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={4}>
              <Card>
                <CardContent>
                  <Typography color="textSecondary" gutterBottom>
                    Pending Reviews
                  </Typography>
                  <Typography variant="h4" component="div">
                    8
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Activity
                </Typography>
                <Typography variant="body1">
                  Welcome to DermaAI Dashboard. Your medical data analysis platform.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Snackbar 
        open={showWelcome} 
        autoHideDuration={6000} 
        onClose={handleCloseWelcome}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        sx={{ zIndex: 9999, mt: 8 }}
      >
        <Alert 
          onClose={handleCloseWelcome} 
          severity="success" 
          sx={{ width: '100%', fontSize: '1.1rem' }}
          variant="filled"
        >
          Welcome {user?.fullName || user?.firstName || user?.username || 'User'} to DermaAI!
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default Dashboard;