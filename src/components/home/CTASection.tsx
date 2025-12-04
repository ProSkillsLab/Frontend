import { Box, Container, Typography, Button, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function CTASection() {
  const navigate = useNavigate();

  return (
    <Box sx={{ bgcolor: 'white', py: 12 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'left', mb: 8 }}>
          <Chip 
            label="Our Mission" 
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
            A Smarter Path to Skin Health
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              fontSize: '1.1rem',
              maxWidth: '850px',
              lineHeight: 1.8
            }}
          >
            Our mission is to make early skin cancer detection easier, faster, and more accessible through responsible and innovative use of AI technology. While our system does not replace professional medical diagnosis, it offers a powerful tool to support awareness and prompt action.
          </Typography>
        </Box>
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
