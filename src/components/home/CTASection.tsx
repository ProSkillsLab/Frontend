import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CTASection() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'grey.100', py: 8, mt: 8 }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
          Ready to Get Started?
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Join thousands of healthcare professionals using DermaAI
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/sign-up')}
        >
          Create Your Account
        </Button>
      </Container>
    </Box>
  );
}

export default CTASection;
