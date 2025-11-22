import { Container, Typography, Grid, Paper, Box } from '@mui/material';
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
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h2" textAlign="center" gutterBottom fontWeight="bold">
        Why Choose Our System?
      </Typography>
      <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
        Empowering early detection with cutting-edge AI technology
      </Typography>
      
      <Grid container spacing={4}>
        {features.map((feature, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Paper elevation={3} sx={{ p: 4, height: '100%', textAlign: 'center' }}>
              <Box sx={{ mb: 2 }}>
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
  );
}

export default FeaturesSection;
