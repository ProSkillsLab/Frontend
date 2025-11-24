import { Box, Container, Grid, Typography, Paper, Button, Chip } from '@mui/material';
import { Sun, Activity, FirstAid, UploadSimple, ArrowRight, ShieldCheck } from 'phosphor-react';
import { useNavigate } from 'react-router-dom';

function EducationSection() {
  const navigate = useNavigate();

  const infoCards = [
    {
      icon: <Sun size={32} weight="duotone" color="#F59E0B" />,
      bg: 'linear-gradient(135deg, #FFFBEB 0%, #FEF3C7 100%)',
      title: 'Why Skin Cancer is Common',
      description: 'Skin cancer is the most common cancer globally, largely due to increased UV exposure and changing environmental factors affecting our skin health.'
    },
    {
      icon: <Activity size={32} weight="duotone" color="#EF4444" />,
      bg: 'linear-gradient(135deg, #FEF2F2 0%, #FEE2E2 100%)',
      title: 'Reasons for Skin Cancer',
      description: 'Major risk factors include excessive sun exposure, history of sunburns, fair skin, family history, and a weakened immune system.'
    },
    {
      icon: <FirstAid size={32} weight="duotone" color="#10B981" />,
      bg: 'linear-gradient(135deg, #ECFDF5 0%, #D1FAE5 100%)',
      title: 'Early Detection is Treatable',
      description: 'When detected early, the 5-year survival rate for melanoma is 99%. Regular screening and self-exams are your best defense.'
    }
  ];

  return (
    <Box sx={{ py: 12, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <Grid container spacing={8} alignItems="center">
          {/* Left Side - 3 Info Boxes */}
          <Grid item xs={12} md={7}>
            <Box sx={{ mb: 6 }}>
              <Chip 
                label="Skin Health Awareness" 
                size="small" 
                sx={{ 
                  mb: 2, 
                  bgcolor: 'primary.main', 
                  color: 'white', 
                  fontWeight: 600,
                  fontSize: '0.75rem'
                }} 
              />
              <Typography variant="h3" fontWeight="800" sx={{ mb: 2, letterSpacing: '-0.02em' }}>
                Understanding the Risks
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                Knowledge is your first line of defense. Stay informed about the causes and prevention of skin cancer.
              </Typography>
            </Box>

            <Grid container spacing={3}>
              {infoCards.map((card, index) => (
                <Grid item xs={12} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      display: 'flex',
                      gap: 3,
                      alignItems: 'flex-start',
                      bgcolor: 'white',
                      borderRadius: 4,
                      border: '1px solid',
                      borderColor: 'rgba(0,0,0,0.06)',
                      boxShadow: '0 4px 24px rgba(0,0,0,0.02)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      cursor: 'default',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        borderColor: 'primary.main',
                        boxShadow: '0 12px 32px rgba(25, 118, 210, 0.12)',
                        '& .icon-box': {
                          transform: 'scale(1.1)'
                        }
                      }
                    }}
                  >
                    <Box 
                      className="icon-box"
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: 3,
                        background: card.bg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                        transition: 'transform 0.3s ease'
                      }}
                    >
                      {card.icon}
                    </Box>
                    <Box sx={{ pt: 0.5 }}>
                      <Typography variant="h6" gutterBottom fontWeight="bold" sx={{ fontSize: '1.15rem' }}>
                        {card.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7, fontSize: '0.95rem' }}>
                        {card.description}
                      </Typography>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Grid>

          {/* Right Side - Upload Area */}
          <Grid item xs={12} md={5}>
            <Box sx={{ position: 'relative' }}>
              {/* Decorative background blob */}
              <Box sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: '120%',
                height: '120%',
                background: 'radial-gradient(circle, rgba(25, 118, 210, 0.08) 0%, rgba(255,255,255,0) 70%)',
                zIndex: 0,
                pointerEvents: 'none'
              }} />
              
              <Paper
                elevation={0}
                sx={{
                  position: 'relative',
                  zIndex: 1,
                  p: 5,
                  bgcolor: 'white',
                  borderRadius: 5,
                  border: '1px dashed',
                  borderColor: 'primary.main',
                  textAlign: 'center',
                  boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  overflow: 'hidden',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 30px 60px rgba(25, 118, 210, 0.15)',
                    borderColor: 'primary.dark',
                    '& .upload-icon': {
                      transform: 'scale(1.1)',
                      color: 'primary.main'
                    }
                  }
                }}
                onClick={() => navigate('/analysis')}
              >
                <Box sx={{ mb: 4, display: 'inline-flex', position: 'relative' }}>
                  <Box sx={{
                    width: 90,
                    height: 90,
                    borderRadius: '50%',
                    bgcolor: '#F0F7FF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 1
                  }}>
                    <UploadSimple className="upload-icon" size={48} color="#1976d2" weight="duotone" style={{ transition: 'all 0.3s ease' }} />
                  </Box>
                  <Box sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: -10,
                    bgcolor: 'white',
                    borderRadius: '50%',
                    p: 0.5,
                    boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
                  }}>
                    <ShieldCheck size={24} color="#10B981" weight="fill" />
                  </Box>
                </Box>

                <Typography variant="h5" gutterBottom fontWeight="800">
                  Start Analysis
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4, px: 2 }}>
                  Upload a clear image of the skin lesion for an instant AI assessment.
                </Typography>

                <Button 
                  variant="contained" 
                  size="large"
                  endIcon={<ArrowRight weight="bold" />}
                  sx={{ 
                    borderRadius: 3,
                    px: 5,
                    py: 1.5,
                    textTransform: 'none',
                    fontSize: '1rem',
                    fontWeight: 600,
                    boxShadow: '0 8px 20px rgba(25, 118, 210, 0.3)',
                    '&:hover': {
                      boxShadow: '0 12px 25px rgba(25, 118, 210, 0.4)',
                    }
                  }}
                >
                  Upload Image
                </Button>
                
                <Typography variant="caption" display="block" sx={{ mt: 3, color: 'text.disabled' }}>
                  Secure & Private Processing
                </Typography>
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default EducationSection;
