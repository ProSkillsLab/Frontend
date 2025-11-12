import { Container, Typography, Grid, Paper } from '@mui/material';

function FeaturesSection() {
  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Typography variant="h3" component="h2" textAlign="center" gutterBottom fontWeight="bold">
        Features By DermaAI
      </Typography>
      <Typography variant="body1" textAlign="center" color="text.secondary" sx={{ mb: 6 }}>
        Empowering healthcare professionals with cutting-edge technology
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, height: '100%', textAlign: 'center' }}>
            <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
              AI Analysis
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Advanced machine learning algorithms for accurate dermatological assessments
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, height: '100%', textAlign: 'center' }}>
            <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
              Patient Management
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Comprehensive tools to track and manage patient records efficiently
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 4, height: '100%', textAlign: 'center' }}>
            <Typography variant="h5" component="h3" gutterBottom fontWeight="bold">
              Analytics Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Real-time insights and analytics to improve decision-making
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default FeaturesSection;
