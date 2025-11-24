import { Box, Container, Typography, Grid, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MagnifyingGlass, ShieldCheck, Users } from 'phosphor-react';

function Explore() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <MagnifyingGlass size={40} weight="duotone" />,
      title: 'Deep Analysis',
      description: 'Our AI examines skin lesions pixel-by-pixel to identify patterns invisible to the naked eye.'
    },
    {
      icon: <ShieldCheck size={40} weight="duotone" />,
      title: 'Clinical Validation',
      description: 'Trained on thousands of dermoscopic images verified by dermatologists.'
    },
    {
      icon: <Users size={40} weight="duotone" />,
      title: 'Community Driven',
      description: 'Join a growing community of users dedicated to proactive skin health monitoring.'
    }
  ];

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>
      <Navbar />
      
      {/* Hero Section for Explore */}
      <Box sx={{ bgcolor: '#f9fafb', py: 10 }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" component="h1" gutterBottom fontWeight="800" sx={{ color: '#1a1a1a' }}>
            Explore DermaAI
          </Typography>
          <Typography variant="h5" color="text.secondary" sx={{ mb: 4, maxWidth: 800, mx: 'auto', lineHeight: 1.6 }}>
            Discover the technology and research behind our advanced skin analysis platform.
          </Typography>
        </Container>
      </Box>

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ py: 10, flex: 1 }}>
        <Grid container spacing={6}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  height: '100%', 
                  border: '1px solid', 
                  borderColor: 'divider',
                  borderRadius: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    borderColor: 'primary.main'
                  }
                }}
              >
                <Box sx={{ color: 'primary.main', mb: 2 }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" gutterBottom fontWeight="bold">
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Additional Info Section */}
        <Box sx={{ mt: 12, textAlign: 'center' }}>
          <Typography variant="h3" gutterBottom fontWeight="bold">
            Ready to take control?
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Sign up today to access our full suite of analysis tools.
          </Typography>
          <Button 
            variant="contained" 
            size="large" 
            onClick={() => navigate('/sign-up')}
            sx={{ px: 6, py: 1.5, borderRadius: 2, textTransform: 'none', fontSize: '1.1rem' }}
          >
            Create Free Account
          </Button>
        </Box>
      </Container>

      <Footer />
    </Box>
  );
}

export default Explore;
