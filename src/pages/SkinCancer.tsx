import { Box, Container, Typography, Grid, Paper, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Sun, ShieldCheck, Eye, FirstAidKit, Warning, UserCircle } from 'phosphor-react';

const s = { font: { fontFamily: '"DM Sans", sans-serif' } };

// Reusable Components
const SectionHeader = ({ title, subtitle, centered = false }: { title: string; subtitle?: string; centered?: boolean }) => (
  <>
    <Typography variant="h4" sx={{ ...s.font, fontWeight: 700, color: '#1A237E', mb: 3, textAlign: centered ? 'center' : 'left' }}>
      {title}
    </Typography>
    {subtitle && (
      <Typography sx={{ ...s.font, color: 'text.secondary', mb: 4, maxWidth: centered ? 700 : 900, mx: centered ? 'auto' : 0, textAlign: centered ? 'center' : 'left' }}>
        {subtitle}
      </Typography>
    )}
  </>
);

const InfoCard = ({ icon, title, description, color }: { icon: React.ReactNode; title: string; description: string; color: string }) => (
  <Paper
    elevation={0}
    sx={{
      p: 3,
      height: '100%',
      borderRadius: 3,
      border: '1px solid rgba(0,0,0,0.06)',
      transition: 'all 0.3s ease',
      '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 12px 30px rgba(0,0,0,0.12)' },
    }}
  >
    <Box sx={{ color, mb: 2 }}>{icon}</Box>
    <Typography sx={{ ...s.font, fontWeight: 700, fontSize: '1.1rem', mb: 1 }}>{title}</Typography>
    <Typography sx={{ ...s.font, color: 'text.secondary', fontSize: '0.95rem' }}>{description}</Typography>
  </Paper>
);

const ABCDECard = ({ letter, meaning, description }: { letter: string; meaning: string; description: string }) => (
  <Paper elevation={0} sx={{ p: 3, borderRadius: 3, border: '1px solid rgba(0,0,0,0.06)', display: 'flex', gap: 2, alignItems: 'flex-start' }}>
    <Box sx={{ width: 50, height: 50, borderRadius: 2, bgcolor: '#1976d2', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.5rem', flexShrink: 0 }}>
      {letter}
    </Box>
    <Box>
      <Typography sx={{ ...s.font, fontWeight: 700, fontSize: '1rem' }}>{meaning}</Typography>
      <Typography sx={{ ...s.font, color: 'text.secondary', fontSize: '0.9rem' }}>{description}</Typography>
    </Box>
  </Paper>
);

// Data
const cancerTypes = [
  { icon: <ShieldCheck size={40} weight="duotone" />, title: 'Basal Cell Carcinoma', description: 'The most common type. Usually appears as a pearly bump or pinkish patch. Rarely spreads but should be treated.', color: '#10b981' },
  { icon: <Warning size={40} weight="duotone" />, title: 'Squamous Cell Carcinoma', description: 'Second most common. Appears as red, scaly patches or open sores. Can spread if untreated.', color: '#f59e0b' },
  { icon: <FirstAidKit size={40} weight="duotone" />, title: 'Melanoma', description: 'Less common but most dangerous. Can develop from existing moles or appear as new dark spots.', color: '#ef4444' },
];

const riskFactors = [
  { icon: <UserCircle size={36} weight="duotone" />, title: 'Fair Skin', description: 'Less melanin means less protection from UV radiation.', color: '#8b5cf6' },
  { icon: <Sun size={36} weight="duotone" />, title: 'Sun Exposure', description: 'History of sunburns or excessive sun exposure increases risk.', color: '#f97316' },
  { icon: <Eye size={36} weight="duotone" />, title: 'Many Moles', description: 'Having many moles or unusual moles increases melanoma risk.', color: '#3b82f6' },
  { icon: <UserCircle size={36} weight="duotone" />, title: 'Family History', description: 'Genetic factors can increase your likelihood of skin cancer.', color: '#ec4899' },
];

const abcdeRules = [
  { letter: 'A', meaning: 'Asymmetry', description: 'One half of the mole does not match the other half.' },
  { letter: 'B', meaning: 'Border', description: 'Edges are irregular, ragged, or blurred.' },
  { letter: 'C', meaning: 'Color', description: 'Color is not uniform; may include shades of brown, black, or patches of pink, red, white, or blue.' },
  { letter: 'D', meaning: 'Diameter', description: 'Spot is larger than 6mm (about the size of a pencil eraser).' },
  { letter: 'E', meaning: 'Evolving', description: 'Mole is changing in size, shape, or color.' },
];

function SkinCancer() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>
      <Navbar />

      {/* Hero Section */}
      <Box sx={{ background: 'linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%)', color: 'white', py: 10 }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" component="h1" sx={{ ...s.font, fontWeight: 800, mb: 2 }}>
            Skin Cancer Information
          </Typography>
          <Typography variant="h5" sx={{ ...s.font, opacity: 0.9, maxWidth: 700, mx: 'auto', mb: 4 }}>
            Early detection saves lives. Learn about skin cancer types, risk factors, and warning signs.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/sign-up')}
            sx={{ bgcolor: 'white', color: '#dc2626', px: 4, py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 700, '&:hover': { bgcolor: '#f5f5f5' } }}
          >
            Get Your Skin Checked
          </Button>
        </Container>
      </Box>

      {/* Important Notice */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Alert severity="warning" sx={{ ...s.font, borderRadius: 2 }}>
          <strong>Important:</strong> This information is for educational purposes only. Always consult a dermatologist for professional diagnosis and treatment.
        </Alert>
      </Container>

      {/* Types of Skin Cancer */}
      <Container maxWidth="lg" sx={{ pb: 10 }}>
        <SectionHeader title="Types of Skin Cancer" subtitle="Understanding the different types helps in early identification and treatment." centered />
        <Grid container spacing={4}>
          {cancerTypes.map((item, index) => (
            <Grid item xs={12} md={4} key={index}>
              <InfoCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* ABCDE Rule */}
      <Box sx={{ bgcolor: '#f8fafc', py: 10 }}>
        <Container maxWidth="lg">
          <SectionHeader title="The ABCDE Rule" subtitle="Use this guide to identify warning signs of melanoma." centered />
          <Grid container spacing={2}>
            {abcdeRules.map((rule, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <ABCDECard {...rule} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Risk Factors */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <SectionHeader title="Risk Factors" subtitle="Knowing your risk can help you take preventive measures." centered />
        <Grid container spacing={4}>
          {riskFactors.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <InfoCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* CTA Section */}
      <Box sx={{ bgcolor: '#1976d2', color: 'white', py: 10 }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h3" sx={{ ...s.font, fontWeight: 800, mb: 2 }}>
            Don't Wait - Get Checked Today
          </Typography>
          <Typography sx={{ ...s.font, opacity: 0.9, mb: 4, maxWidth: 600, mx: 'auto' }}>
            Our AI-powered analysis can help identify potential concerns. Early detection is key to successful treatment.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/sign-up')}
            sx={{ bgcolor: 'white', color: '#1976d2', px: 5, py: 1.5, borderRadius: 2, textTransform: 'none', fontSize: '1.1rem', fontWeight: 600, '&:hover': { bgcolor: '#f5f5f5' } }}
          >
            Start Free Analysis
          </Button>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

export default SkinCancer;
