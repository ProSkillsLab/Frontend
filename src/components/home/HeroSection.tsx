import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        bgcolor: '#222222',
        color: 'white',
        py: 12,
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Box
          component="img"
          src="/dermaai.gif"
          alt="DermaAI logo"
          sx={{ width: 140, height: 'auto', mx: 'auto', mb: 3 }}
        />
        <Typography variant="h2" component="h1" gutterBottom fontWeight="bold">
          Welcome to DermaAI
        </Typography>
        <Typography variant="h5" component="p" sx={{ mb: 4, opacity: 0.9 }}>
          Advanced AI-powered dermatological analysis and patient management
        </Typography>
        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
          <Button
            variant="contained"
            size="large"
            sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
            onClick={() => navigate('/sign-up')}
          >
            Get Started
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ borderColor: 'white', color: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
            onClick={() => navigate('/sign-in')}
          >
            Sign In
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default HeroSection;
