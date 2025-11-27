import { Container, Typography, Grid, Paper, Box, Chip } from '@mui/material';
import { Lightning, FirstAid, GlobeHemisphereWest, ShieldCheck } from 'phosphor-react';

function FeaturesSection() {
  const features = [
    {
      icon: <Lightning size={60} weight="duotone" />,
      title: 'Advanced Accuracy',
      description: 'Built on fine-tuned pre-trained CNN models trained on 2,357 dermoscopic images.'
    },
    {
      icon: <FirstAid size={60} weight="duotone" />,
      title: 'Early Detection Support',
      description: 'Designed to assist in spotting issues early, when treatment is most effective.'
    },
    {
      icon: <GlobeHemisphereWest size={60} weight="duotone" />,
      title: 'Accessible for Everyone',
      description: 'Especially valuable in areas with limited access to dermatology specialists.'
    },
    {
      icon: <ShieldCheck size={60} weight="duotone" />,
      title: 'Safe & Non-Invasive',
      description: 'A simple image upload provides a quick preliminary assessment.'
    }
  ];

  return (
    <Box sx={{ py: 12, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'left', mb: 8 }}>
          <Chip 
            label="Key Features" 
            size="small"
            sx={{ 
              mb: 2, 
              bgcolor: 'primary.main', 
              color: 'white', 
              fontWeight: 600,
              fontSize: '0.75rem'
            }} 
          />
          <Typography 
            variant="h3" 
            component="h2" 
            sx={{ 
              fontWeight: 800, 
              mb: 2,
              letterSpacing: '-0.02em'
            }}
          >
            Why Choose Our System?
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              fontSize: '1.1rem',
              maxWidth: '850px'
            }}
          >
            Empowering early detection with cutting-edge AI technology designed for accuracy and ease of use.
          </Typography>
        </Box>
        
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper 
                elevation={0} 
                sx={{ 
                  p: 4, 
                  height: '100%', 
                  textAlign: 'left',
                  border: '1px solid',
                  borderColor: 'divider',
                  borderRadius: 4,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
                    borderColor: 'transparent'
                  }
                }}
              >
                <Box sx={{ mb: 3, color: 'primary.main' }}>
                  {feature.icon}
                </Box>
                <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
                  {feature.title}
                </Typography>
                <Typography variant="body1" color="text.secondary">
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default FeaturesSection;
