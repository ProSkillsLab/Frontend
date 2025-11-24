import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CTASection() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'white', py: 12 }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h3" component="h2" gutterBottom fontWeight="bold">
          A Smarter Path to Skin Health
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 6, lineHeight: 1.8, fontSize: '1.1rem' }}>
          Our mission is to make early skin cancer detection easier, faster, and more accessible through responsible and innovative use of AI technology. While our system does not replace professional medical diagnosis, it offers a powerful tool to support awareness and prompt action.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/sign-up')}
          sx={{ 
            px: 6, 
            py: 1.5, 
            borderRadius: 2,
            fontSize: '1.1rem',
            textTransform: 'none',
            fontWeight: 600
          }}
        >
          Get Started Today
        </Button>
      </Container>
    </Box>
  );
}

export default CTASection;
