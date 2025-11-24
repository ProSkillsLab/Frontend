import { Container, Typography, Box, Grid, Paper, Chip } from '@mui/material';
import { UploadSimple, Brain, ChartBar, Lightbulb } from 'phosphor-react';

function HowItWorksSection() {
  const steps = [
    {
      icon: <UploadSimple size={40} weight="duotone" color="#1976d2" />,
      bg: 'linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)',
      title: 'Upload Image',
      description: 'Upload a clear dermoscopic image of the skin lesion you want to analyze',
      step: '01'
    },
    {
      icon: <Brain size={40} weight="duotone" color="#9C27B0" />,
      bg: 'linear-gradient(135deg, #F3E5F5 0%, #E1BEE7 100%)',
      title: 'AI Analysis',
      description: 'Our advanced CNN model analyzes the image across nine recognized skin cancer types',
      step: '02'
    },
    {
      icon: <ChartBar size={40} weight="duotone" color="#ED6C02" />,
      bg: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
      title: 'Get Results',
      description: 'Receive up to three possible classifications with confidence scores for each diagnosis',
      step: '03'
    }
  ];

  return (
    <Box sx={{ bgcolor: 'white', py: 12 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'left', mb: 8 }}>
          <Chip 
            label="Simple Process" 
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
            How It Works
          </Typography>
          <Typography 
            variant="body1" 
            color="text.secondary" 
            sx={{ 
              fontSize: '1.1rem',
              maxWidth: '850px'
            }}
          >
            Our AI-powered platform makes skin cancer detection simple and accessible. Just follow these three easy steps to get your analysis.
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {steps.map((step, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  height: '100%',
                  textAlign: 'left',
                  position: 'relative',
                  bgcolor: 'white',
                  borderRadius: 4,
                  border: '1px solid',
                  borderColor: 'rgba(0,0,0,0.06)',
                  boxShadow: '0 4px 24px rgba(0,0,0,0.02)',
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                    borderColor: 'primary.main',
                    '& .step-icon': {
                      transform: 'scale(1.1)'
                    }
                  }
                }}
              >
                {/* Step number background */}
                <Typography
                  sx={{
                    position: 'absolute',
                    top: -20,
                    right: -20,
                    fontSize: '8rem',
                    fontWeight: 900,
                    color: 'rgba(0,0,0,0.02)',
                    lineHeight: 1,
                    pointerEvents: 'none',
                    userSelect: 'none'
                  }}
                >
                  {step.step}
                </Typography>

                {/* Icon */}
                <Box
                  className="step-icon"
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: 3,
                    background: step.bg,
                    mb: 3,
                    transition: 'transform 0.3s ease',
                    boxShadow: '0 8px 16px rgba(0,0,0,0.04)'
                  }}
                >
                  {step.icon}
                </Box>

                {/* Title */}
                <Typography 
                  variant="h5" 
                  component="h3" 
                  gutterBottom 
                  sx={{ 
                    fontWeight: 700,
                    mb: 2
                  }}
                >
                  {step.title}
                </Typography>

                {/* Description */}
                <Typography 
                  variant="body1" 
                  color="text.secondary"
                  sx={{ 
                    lineHeight: 1.6,
                    position: 'relative',
                    zIndex: 1
                  }}
                >
                  {step.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Info Note */}
        <Box 
          sx={{ 
            mt: 8, 
            p: 3, 
            bgcolor: '#F8F9FA', 
            borderRadius: 3, 
            display: 'flex', 
            alignItems: 'flex-start', 
            gap: 2,
            maxWidth: '800px',
            mx: 'auto',
            border: '1px dashed',
            borderColor: 'divider'
          }}
        >
          <Lightbulb size={24} weight="fill" color="#F59E0B" style={{ flexShrink: 0, marginTop: 2 }} />
          <Typography variant="body1" color="text.secondary" sx={{ fontSize: '0.95rem', lineHeight: 1.6 }}>
            <Box component="span" fontWeight="bold" color="text.primary">Did you know?</Box> Our system analyzes images across nine recognized skin cancer types and provides up to three possible classifications with confidence scores to help you make informed decisions about seeking medical care.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default HowItWorksSection;