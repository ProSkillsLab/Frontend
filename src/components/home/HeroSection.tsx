import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { RocketLaunch, SignIn } from 'phosphor-react';
import { useState, useEffect } from 'react';

function HeroSection() {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    { src: '/ISIC_0000010.jpg', alt: 'Skin analysis sample 1' },
    { src: '/ISIC_0001113.jpg', alt: 'Skin analysis sample 2' },
    { src: '/ISIC_0001156.jpg', alt: 'Skin analysis sample 3' },
  ];

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, [images.length]);

  return (
    <Box
      sx={{
        bgcolor: '#222222',
        color: 'white',
        py: 12,
        pb: 16,
        borderRadius: '0 0 80px 80px', // Rounded bottom corners
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 50%, rgba(66, 135, 245, 0.15) 0%, transparent 50%)',
          pointerEvents: 'none',
        }
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left side - Text content */}
          <Grid item xs={12} md={6}>
            <Typography 
              variant="h1" 
              component="h1" 
              gutterBottom 
              sx={{ 
                textAlign: 'left',
                fontSize: { xs: '2.75rem', sm: '3.5rem', md: '4rem', lg: '4.5rem' },
                fontWeight: 800,
                lineHeight: 1.1,
                mb: 3,
                letterSpacing: '-0.02em'
              }}
            >
              Discover Your Skin Health with AI
            </Typography>
            <Typography 
              component="p" 
              sx={{ 
                mb: 5, 
                opacity: 0.85, 
                lineHeight: 1.7, 
                textAlign: 'left',
                fontWeight: 400,
                fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.75rem' },
                color: 'rgba(255, 255, 255, 0.9)',
                maxWidth: '90%'
              }}
            >
              Fast, Accurate and Early Detection You Can Trust.
            </Typography>
            <Box sx={{ display: 'flex', gap: 2.5, flexWrap: 'wrap', mt: 4 }}>
              <Button
                variant="contained"
                size="large"
                startIcon={<RocketLaunch size={24} weight="bold" />}
                sx={{ 
                  bgcolor: 'primary.main', 
                  color: 'white', 
                  px: 5,
                  py: 1.75,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  fontWeight: 700,
                  borderRadius: 2.5,
                  textTransform: 'none',
                  boxShadow: '0 4px 14px rgba(25, 118, 210, 0.3)',
                  '&:hover': { 
                    bgcolor: 'primary.dark',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 6px 20px rgba(25, 118, 210, 0.4)',
                  },
                  transition: 'all 0.3s ease'
                }}
                onClick={() => navigate('/sign-up')}
              >
                Get Started
              </Button>
              <Button
                variant="outlined"
                size="large"
                startIcon={<SignIn size={24} weight="bold" />}
                sx={{ 
                  borderColor: 'primary.main', 
                  color: 'primary.main',
                  px: 5,
                  py: 1.75,
                  fontSize: { xs: '1rem', sm: '1.1rem' },
                  fontWeight: 700,
                  borderRadius: 2.5,
                  borderWidth: 2,
                  textTransform: 'none',
                  '&:hover': { 
                    borderColor: 'primary.dark',
                    borderWidth: 2,
                    bgcolor: 'rgba(25, 118, 210, 0.04)',
                    transform: 'translateY(-2px)',
                  },
                  transition: 'all 0.3s ease'
                }}
                onClick={() => navigate('/sign-in')}
              >
                Sign In
              </Button>
            </Box>
          </Grid>

          {/* Right side - Image collage slider */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                position: 'relative',
                width: '100%',
                height: { xs: '400px', sm: '500px', md: '520px' },
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              {/* Main large image with slider */}
              <Box
                component="img"
                src={images[currentImageIndex].src}
                alt={images[currentImageIndex].alt}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'opacity 0.5s ease',
                }}
              />

              {/* Dots indicator */}
              <Box
                sx={{
                  position: 'absolute',
                  bottom: 20,
                  left: '50%',
                  transform: 'translateX(-50%)',
                  display: 'flex',
                  gap: 1.5,
                }}
              >
                {images.map((_, index) => (
                  <Box
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    sx={{
                      width: 12,
                      height: 12,
                      borderRadius: '50%',
                      bgcolor: currentImageIndex === index ? 'white' : 'rgba(255, 255, 255, 0.5)',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        bgcolor: 'white',
                        transform: 'scale(1.2)',
                      },
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroSection;