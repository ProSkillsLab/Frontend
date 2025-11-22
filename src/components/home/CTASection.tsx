import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CTASection() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'grey.100', py: 8, mt: 8 }}>
      <Container maxWidth="md" sx={{ textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom fontWeight="bold">
          A Smarter Path to Skin Health
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8, fontSize: '1.1rem' }}>
          Our mission is to make early skin cancer detection easier, faster, and more accessible through responsible and innovative use of AI technology. While our system does not replace professional medical diagnosis, it offers a powerful tool to support awareness and prompt action.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/sign-up')}
        >
          Get Started Today
        </Button>
      </Container>
    </Box>
  );
}

export default CTASection;
