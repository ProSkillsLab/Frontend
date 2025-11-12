import { useState } from 'react';
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
  Button,
  LinearProgress,
  Chip,
  Alert,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Assessment as AssessmentIcon,
  Info as InfoIcon,
  CloudUpload as CloudUploadIcon,
  Image as ImageIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const drawerWidth = 240;

interface AnalysisResult {
  id: string;
  condition: string;
  confidence: number;
  severity: 'Low' | 'Medium' | 'High';
  recommendations: string[];
  timestamp: Date;
}

function Analysis() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, route: '/dashboard' },
    { text: 'Patients', icon: <PeopleIcon /> },
    { text: 'Analysis', icon: <AssessmentIcon />, route: '/analysis' },
    { text: 'About', icon: <InfoIcon />, route: '/about' },
  ];

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage(reader.result as string);
        setAnalysisResult(null);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simulate AI analysis (replace with actual API call)
    setTimeout(() => {
      setAnalysisResult({
        id: Math.random().toString(36).substr(2, 9),
        condition: 'Dermatitis',
        confidence: 87.5,
        severity: 'Medium',
        recommendations: [
          'Apply topical corticosteroid cream twice daily',
          'Avoid harsh soaps and detergents',
          'Keep the affected area moisturized',
          'Follow up in 2 weeks if no improvement',
        ],
        timestamp: new Date(),
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'Low':
        return 'success';
      case 'Medium':
        return 'warning';
      case 'High':
        return 'error';
      default:
        return 'default';
    }
  };

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
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            AI Analysis
          </Typography>
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
            {/* Upload Section */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Upload Image
                </Typography>
                <Box
                  sx={{
                    border: '2px dashed',
                    borderColor: 'primary.main',
                    borderRadius: 2,
                    p: 4,
                    textAlign: 'center',
                    bgcolor: 'background.default',
                    cursor: 'pointer',
                    '&:hover': {
                      bgcolor: 'action.hover',
                    },
                  }}
                >
                  {selectedImage ? (
                    <Box>
                      <img
                        src={selectedImage}
                        alt="Selected"
                        style={{
                          maxWidth: '100%',
                          maxHeight: '300px',
                          borderRadius: '8px',
                        }}
                      />
                      <Button
                        variant="outlined"
                        component="label"
                        sx={{ mt: 2 }}
                      >
                        Change Image
                        <input
                          type="file"
                          hidden
                          accept="image/*"
                          onChange={handleImageUpload}
                        />
                      </Button>
                    </Box>
                  ) : (
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<CloudUploadIcon />}
                      size="large"
                    >
                      Choose Image
                      <input
                        type="file"
                        hidden
                        accept="image/*"
                        onChange={handleImageUpload}
                      />
                    </Button>
                  )}
                </Box>
                
                {selectedImage && (
                  <Box sx={{ mt: 3 }}>
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      onClick={handleAnalyze}
                      disabled={isAnalyzing}
                      startIcon={<AssessmentIcon />}
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Start Analysis'}
                    </Button>
                  </Box>
                )}

                {isAnalyzing && (
                  <Box sx={{ mt: 2 }}>
                    <LinearProgress />
                    <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                      AI is analyzing the image...
                    </Typography>
                  </Box>
                )}
              </Paper>
            </Grid>

            {/* Results Section */}
            <Grid item xs={12} md={6}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Typography variant="h6" gutterBottom>
                  Analysis Results
                </Typography>
                
                {!analysisResult && !isAnalyzing && (
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: 300,
                      color: 'text.secondary',
                    }}
                  >
                    <ImageIcon sx={{ fontSize: 80, mb: 2, opacity: 0.3 }} />
                    <Typography variant="body1">
                      Upload an image to see analysis results
                    </Typography>
                  </Box>
                )}

                {analysisResult && (
                  <Box>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      Analysis completed successfully
                    </Alert>

                    <Card variant="outlined" sx={{ mb: 2 }}>
                      <CardContent>
                        <Typography variant="subtitle2" color="text.secondary">
                          Detected Condition
                        </Typography>
                        <Typography variant="h5" gutterBottom>
                          {analysisResult.condition}
                        </Typography>
                        
                        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                          <Chip
                            label={`${analysisResult.confidence}% Confidence`}
                            color="primary"
                            size="small"
                          />
                          <Chip
                            label={`${analysisResult.severity} Severity`}
                            color={getSeverityColor(analysisResult.severity)}
                            size="small"
                          />
                        </Box>

                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
                          Recommendations
                        </Typography>
                        <List dense>
                          {analysisResult.recommendations.map((rec, index) => (
                            <ListItem key={index} sx={{ pl: 0 }}>
                              <ListItemIcon sx={{ minWidth: 32 }}>
                                {analysisResult.severity === 'High' ? (
                                  <WarningIcon color="error" fontSize="small" />
                                ) : (
                                  <CheckCircleIcon color="success" fontSize="small" />
                                )}
                              </ListItemIcon>
                              <ListItemText primary={rec} />
                            </ListItem>
                          ))}
                        </List>

                        <Typography variant="caption" color="text.secondary">
                          Analyzed at: {analysisResult.timestamp.toLocaleString()}
                        </Typography>
                      </CardContent>
                    </Card>

                    <Box sx={{ display: 'flex', gap: 2 }}>
                      <Button variant="outlined" fullWidth>
                        Save Report
                      </Button>
                      <Button variant="outlined" fullWidth>
                        Share
                      </Button>
                    </Box>
                  </Box>
                )}
              </Paper>
            </Grid>

            {/* Recent Analyses */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Recent Analyses
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Your analysis history will appear here. Connect to backend to load previous results.
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}

export default Analysis;
