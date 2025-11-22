import { Container, Typography, Box, Grid, Paper } from '@mui/material';
import { UploadSimple, Brain, ChartBar } from 'phosphor-react';

function HowItWorksSection() {
  const steps = [
    {
      icon: <UploadSimple size={48} weight="duotone" />,
      title: 'Upload Image',
      description: 'Upload a clear dermoscopic image of the skin lesion you want to analyze',
      step: '01'
    },
    {
      icon: <Brain size={48} weight="duotone" />,
      title: 'AI Analysis',
      description: 'Our advanced CNN model analyzes the image across nine recognized skin cancer types',
      step: '02'
    },
    {
      icon: <ChartBar size={48} weight="duotone" />,
      title: 'Get Results',
      description: 'Receive up to three possible classifications with confidence scores for each diagnosis',
      step: '03'
    }
  ];

  return (
    <Box sx={{ bgcolor: '#f9fafb', py: 10 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography 
            variant="h2" 
            component="h2" 
            gutterBottom 
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.25rem', sm: '2.75rem', md: '3.25rem' },
              mb: 3,
              color: '#1a1a1a',
              letterSpacing: '-0.01em'
            }}
          >
            How It Works
          </Typography>
          <Typography 
            component="p" 
            sx={{ 
              maxWidth: '850px', 
              mx: 'auto', 
              lineHeight: 1.8,
              fontSize: { xs: '1.05rem', sm: '1.15rem', md: '1.2rem' },
              color: 'text.secondary',
              fontWeight: 400,
              px: { xs: 2, sm: 0 }
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
                  textAlign: 'center',
                  position: 'relative',
                  bgcolor: 'white',
                  borderRadius: 3,
                  border: '1px solid',
                  borderColor: 'divider',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
                    borderColor: 'primary.main',
                  }
                }}
              >
                {/* Step number */}
                <Typography
                  sx={{
                    position: 'absolute',
                    top: 20,
                    right: 20,
                    fontSize: '3rem',
                    fontWeight: 800,
                    color: 'rgba(25, 118, 210, 0.1)',
                    lineHeight: 1
                  }}
                >
                  {step.step}
                </Typography>

                {/* Icon */}
                <Box
                  sx={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 80,
                    height: 80,
                    borderRadius: '50%',
                    bgcolor: 'rgba(25, 118, 210, 0.1)',
                    color: 'primary.main',
                    mb: 3,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'primary.main',
                      color: 'white',
                    }
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
                    mb: 2,
                    color: '#1a1a1a'
                  }}
                >
                  {step.title}
                </Typography>

                {/* Description */}
                <Typography 
                  variant="body1" 
                  sx={{ 
                    color: 'text.secondary',
                    lineHeight: 1.7,
                    fontSize: '1rem'
                  }}
                >
                  {step.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        {/* Bottom info box */}
        <Box
          sx={{
            mt: 8,
            p: 4,
            bgcolor: 'rgba(25, 118, 210, 0.05)',
            borderRadius: 3,
            textAlign: 'center',
            border: '1px solid',
            borderColor: 'divider',
          }}
        >
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              fontSize: '1.05rem',
              lineHeight: 1.8,
              fontWeight: 500
            }}
          >
            💡 Our system analyzes images across <strong>nine recognized skin cancer types</strong> and provides up to <strong>three possible classifications</strong> with confidence scores to help you make informed decisions about seeking medical care.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default HowItWorksSection;