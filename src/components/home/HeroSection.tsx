import { Box, Container, Typography, Button, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';

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

// Step Card Component
const StepCard = ({ image, step, title, bgColor }: typeof steps[0]) => (
  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
    <Box
      sx={{
        width: 70,
        height: 70,
        minWidth: 70,
        borderRadius: '50%',
        overflow: 'hidden',
        bgcolor: bgColor,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 4px 15px rgba(0,0,0,0.2)',
      }}
    >
      <Box component="img" src={image} alt={title} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
    </Box>
    <Box>
      <Typography
        sx={{
          ...dmSansFont,
          bgcolor: '#1E88E5',
          color: 'white',
          px: 1.5,
          py: 0.3,
          borderRadius: 1,
          fontSize: '0.7rem',
          fontWeight: 700,
          display: 'inline-block',
          mb: 0.5,
        }}
      >
        {step}
      </Typography>
      <Typography sx={{ ...dmSansFont, color: 'white', fontWeight: 500, fontSize: { xs: '0.95rem', sm: '1rem' }, lineHeight: 1.4 }}>
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
        py: { xs: 6, md: 8 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4} alignItems="center">
          {/* Left side - Steps */}
          <Grid item xs={12} md={7}>
            <Typography
              variant="h2"
              component="h1"
              sx={{ ...dmSansFont, fontWeight: 800, fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' }, mb: 5, fontStyle: 'italic' }}
            >
              Check your skin!
            </Typography>

            <Grid container spacing={3}>
              {steps.map((step, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <StepCard {...step} />
                </Grid>
              ))}
            </Grid>

            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/sign-up')}
              sx={{
                ...dmSansFont,
                mt: 5,
                bgcolor: '#EF5350',
                color: 'white',
                px: 5,
                py: 1.5,
                fontSize: '1rem',
                fontWeight: 700,
                borderRadius: 2,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: '0 4px 15px rgba(239, 83, 80, 0.4)',
                '&:hover': { bgcolor: '#E53935', transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(239, 83, 80, 0.5)' },
                transition: 'all 0.3s ease',
              }}
            >
              Get Instant Result
            </Button>

            <Typography sx={{ ...dmSansFont, mt: 4, color: 'rgba(255,255,255,0.8)', fontSize: '0.85rem', maxWidth: '600px' }}>
              * The scan result is not a diagnosis. To obtain an accurate diagnosis and a recommendation for treatment - consult your doctor.
            </Typography>
          </Grid>

          {/* Right side - Skin scan image */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: 'relative', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <Box sx={{ position: 'relative', width: '100%', maxWidth: 500 }}>
                <Box
                  component="img"
                  src="/skincancer.webp"
                  alt="Skin analysis demonstration"
                  sx={{ width: '100%', height: { xs: 350, sm: 450, md: 500 }, borderRadius: 4, objectFit: 'cover' }}
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