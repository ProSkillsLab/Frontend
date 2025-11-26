import { Box, Container, Typography, Button, Grid, keyframes } from '@mui/material';
import { useNavigate } from 'react-router-dom';

// Keyframe animations
const fadeInUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const fadeInLeft = keyframes`
  from {
    opacity: 0;
    transform: translateX(-30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const fadeInRight = keyframes`
  from {
    opacity: 0;
    transform: translateX(30px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`;

const pulse = keyframes`
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.4);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.05);
    box-shadow: 0 0 20px 5px rgba(255, 255, 255, 0.2);
  }
`;

const float = keyframes`
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
`;

// Common font style
const dmSansFont = { fontFamily: '"DM Sans", sans-serif' };

// Corner bracket style generator
const cornerBracket = (position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight') => {
  const styles: Record<string, object> = {
    topLeft: { top: -8, left: -8, borderTop: '3px solid white', borderLeft: '3px solid white' },
    topRight: { top: -8, right: -8, borderTop: '3px solid white', borderRight: '3px solid white' },
    bottomLeft: { bottom: -8, left: -8, borderBottom: '3px solid white', borderLeft: '3px solid white' },
    bottomRight: { bottom: -8, right: -8, borderBottom: '3px solid white', borderRight: '3px solid white' },
  };
  return { position: 'absolute', width: 16, height: 16, ...styles[position] };
};

// Steps data
const steps = [
  { image: '/step1.jpg', step: 'STEP 1', title: 'Take a photo of a skin problem', bgColor: '#4FC3F7' },
  { image: '/step2.jpg', step: 'STEP 2', title: 'AI instantly analyzes your photo', bgColor: '#1E88E5' },
  { image: '/step3.jpg', step: 'STEP 3', title: 'Get a personalized PDF report', bgColor: '#26A69A' },
  { image: '/step4.jpg', step: 'STEP 4', title: 'AI Consultant explains your result', bgColor: '#AB47BC' },
];

// Step Card Component with animation delay based on index
const StepCard = ({ image, step, title, bgColor, index }: typeof steps[0] & { index: number }) => (
  <Box 
    sx={{ 
      display: 'flex', 
      alignItems: 'center', 
      gap: { xs: 1.5, sm: 2 },
      animation: `${fadeInUp} 0.6s ease-out forwards`,
      animationDelay: `${0.2 + index * 0.15}s`,
      opacity: 0,
      '&:hover': {
        transform: 'translateX(5px)',
        transition: 'transform 0.3s ease',
      },
    }}
  >
    <Box
      sx={{
        width: { xs: 55, sm: 70 },
        height: { xs: 55, sm: 70 },
        minWidth: { xs: 55, sm: 70 },
        borderRadius: '50%',
        overflow: 'hidden',
        bgcolor: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'scale(1.1)',
          boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
        },
      }}
    >
      <Box component="img" src={image} alt={title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography
        sx={{
          ...dmSansFont,
          bgcolor: '#1E88E5',
          color: 'white',
          px: { xs: 1, sm: 1.5 },
          py: 0.3,
          borderRadius: 1,
          fontSize: { xs: '0.6rem', sm: '0.7rem' },
          fontWeight: 700,
          display: 'inline-block',
          mb: 0.5,
        }}
      >
        {step}
      </Typography>
      <Typography sx={{ ...dmSansFont, color: 'white', fontWeight: 500, fontSize: { xs: '0.85rem', sm: '1rem' }, lineHeight: 1.3 }}>
        {title}
      </Typography>
    </Box>
  </Box>
);

function HeroSection() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 50%, #1A237E 100%)',
        color: 'white',
        py: { xs: 4, sm: 6, md: 8 },
        px: { xs: 2, sm: 0 },
        position: 'relative',
        overflowX: 'hidden',
        width: '100%',
        maxWidth: '100vw',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 3, md: 4 }} alignItems="center">
          {/* Left side - Steps */}
          <Grid item xs={12} md={7} sx={{ textAlign: { xs: 'center', md: 'left' } }}>
            <Typography
              variant="h2"
              component="h1"
              sx={{ 
                ...dmSansFont, 
                fontWeight: 800, 
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' }, 
                mb: { xs: 3, sm: 4, md: 5 }, 
                fontStyle: 'italic',
                animation: `${fadeInLeft} 0.8s ease-out forwards`,
                opacity: 0,
              }}
            >
              Check your skin!
            </Typography>

            <Grid container spacing={{ xs: 2, sm: 3 }} justifyContent={{ xs: 'center', md: 'flex-start' }}>
              {steps.map((step, index) => (
                <Grid item xs={6} sm={6} key={index}>
                  <StepCard {...step} index={index} />
                </Grid>
              ))}
            </Grid>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/sign-up')}
              sx={{
                ...dmSansFont,
                mt: { xs: 3, sm: 4, md: 5 },
                bgcolor: '#EF5350',
                color: 'white',
                px: { xs: 3, sm: 5 },
                py: { xs: 1.2, sm: 1.5 },
                fontSize: { xs: '0.85rem', sm: '1rem' },
                fontWeight: 700,
                borderRadius: 2,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 15px rgba(239, 83, 80, 0.4)',
                animation: `${fadeInUp} 0.6s ease-out 0.8s forwards`,
                opacity: 0,
                '&:hover': { bgcolor: '#E53935', transform: 'translateY(-4px) scale(1.02)', boxShadow: '0 8px 25px rgba(239, 83, 80, 0.5)' },
                transition: 'all 0.3s ease',
              }}
            >
              Get Instant Result
            </Button>

            <Typography 
              sx={{ 
                ...dmSansFont, 
                mt: { xs: 2, sm: 3, md: 4 }, 
                color: 'rgba(255,255,255,0.8)', 
                fontSize: { xs: '0.75rem', sm: '0.85rem' }, 
                maxWidth: '600px', 
                mx: { xs: 'auto', md: 0 },
                animation: `${fadeInUp} 0.6s ease-out 1s forwards`,
                opacity: 0,
              }}
            >
              * The scan result is not a diagnosis. To obtain an accurate diagnosis and a recommendation for treatment - consult your doctor.
            </Typography>
          </Grid>

          {/* Right side - Skin scan image */}
          <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
            <Box 
              sx={{ 
                position: 'relative', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                animation: `${fadeInRight} 0.8s ease-out 0.3s forwards`,
                opacity: 0,
              }}
            >
              <Box sx={{ position: 'relative', width: '100%', maxWidth: 500 }}>
                <Box
                  component="img"
                  src="/skincancer.webp"
                  alt="Skin analysis demonstration"
                  sx={{ 
                    width: '100%', 
                    height: { xs: 350, sm: 450, md: 500 }, 
                    borderRadius: 4, 
                    objectFit: 'cover',
                    transition: 'transform 0.5s ease',
                    '&:hover': {
                      transform: 'scale(1.02)',
                    },
                  }}
                />

                {/* Scan frame overlay */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '85%',
                    left: '60%',
                    transform: 'translate(-50%, -50%)',
                    width: 100,
                    height: 100,
                    border: '3px solid white',
                    borderRadius: 2,
                    bgcolor: 'rgba(255,255,255,0.1)',
                    backdropFilter: 'blur(2px)',
                    animation: `${pulse} 2s ease-in-out infinite`,
                    '&::before': { content: '""', ...cornerBracket('topLeft') },
                    '&::after': { content: '""', ...cornerBracket('topRight') },
                  }}
                >
                  <Box sx={cornerBracket('bottomLeft')} />
                  <Box sx={cornerBracket('bottomRight')} />
                </Box>

                {/* Info tooltip */}
                <Box
                  sx={{
                    position: 'absolute',
                    top: '65%',
                    left: '75%',
                    bgcolor: 'rgba(255,255,255,0.95)',
                    color: '#333',
                    px: 2,
                    py: 1.5,
                    borderRadius: 2,
                    maxWidth: 180,
                    boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
                    animation: `${float} 3s ease-in-out infinite`,
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      left: -10,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      border: '6px solid transparent',
                      borderRight: '6px solid rgba(255,255,255,0.95)',
                    },
                  }}
                >
                  <Typography sx={{ ...dmSansFont, fontSize: '0.8rem', fontWeight: 500, lineHeight: 1.4 }}>
                    Take a photo with a mole and receive your risk assessment *
                  </Typography>
                </Box>

                {/* Connecting line */}
                <Box sx={{ position: 'absolute', top: '78%', left: '68%', width: '8%', height: 2, bgcolor: 'white' }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default HeroSection;