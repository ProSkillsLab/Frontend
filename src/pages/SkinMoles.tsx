import { Box, Container, Typography, Grid, Paper, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Sun, Camera, FirstAidKit, ShieldCheck, Eye, Warning } from 'phosphor-react';

const s = {
  font: { fontFamily: '"DM Sans", sans-serif' },
  card: {
    borderRadius: 3,
    bgcolor: 'white',
    border: '1px solid rgba(0,0,0,0.06)',
    transition: 'all 0.3s ease',
  },
  cardHover: {
    transform: 'translateY(-5px)',
    boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
  },
  sectionTitle: { fontWeight: 700, color: '#1A237E', mb: 3 },
};

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

// Data
const skinSpotTypes = [
  { icon: <Sun size={40} weight="duotone" />, title: 'Freckles', description: 'Small, flat brown spots that often appear after sun exposure. Usually harmless and common in fair-skinned individuals.', color: '#f59e0b' },
  { icon: <Eye size={40} weight="duotone" />, title: 'Sun/Age Spots', description: 'Flat, brown spots caused by years of sun exposure. Common in adults over 50 but can appear earlier.', color: '#8b5cf6' },
  { icon: <ShieldCheck size={40} weight="duotone" />, title: 'Benign Moles', description: 'Round or oval growths that can be flat or raised. Most moles are harmless but should be monitored for changes.', color: '#10b981' },
  { icon: <Warning size={40} weight="duotone" />, title: 'Atypical Moles', description: 'Irregular moles with uneven borders or multiple colors. Higher risk of developing into melanoma.', color: '#ef4444' },
];

const whenToCheck = [
  { icon: <Camera size={36} weight="duotone" />, title: 'Monthly Self-Exams', description: 'Check your skin monthly for any new spots or changes to existing moles.', color: '#3b82f6' },
  { icon: <FirstAidKit size={36} weight="duotone" />, title: 'Annual Dermatologist Visits', description: 'Schedule yearly skin checks with a dermatologist, especially if you have many moles.', color: '#ec4899' },
  { icon: <Warning size={36} weight="duotone" />, title: 'ABCDE Rule', description: 'Watch for Asymmetry, Border irregularity, Color changes, Diameter >6mm, and Evolving spots.', color: '#f97316' },
];

function SkinMoles() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: 'white' }}>
      <Navbar />

      {/* Hero Section */}
      <Box sx={{ background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 50%, #1A237E 100%)', color: 'white', py: 10 }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" component="h1" sx={{ ...s.font, fontWeight: 800, mb: 2 }}>
            Understanding Skin Spots & Moles
          </Typography>
          <Typography variant="h5" sx={{ ...s.font, opacity: 0.9, maxWidth: 700, mx: 'auto', mb: 4 }}>
            Learn to identify different types of skin spots and when to seek professional advice.
          </Typography>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/sign-up')}
            sx={{ bgcolor: '#EF5350', px: 4, py: 1.5, borderRadius: 2, textTransform: 'none', fontWeight: 700, '&:hover': { bgcolor: '#E53935' } }}
          >
            Analyze Your Skin Now
          </Button>
        </Container>
      </Box>

      {/* Types of Skin Spots */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <SectionHeader title="Types of Skin Spots" subtitle="Understanding the different types of skin spots can help you identify potential concerns early." centered />
        <Grid container spacing={4}>
          {skinSpotTypes.map((item, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <InfoCard {...item} />
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* When to Check */}
      <Box sx={{ bgcolor: '#f8fafc', py: 10 }}>
        <Container maxWidth="lg">
          <SectionHeader title="When to Check Your Skin" subtitle="Regular monitoring is key to early detection of skin issues." centered />
          <Grid container spacing={4}>
            {whenToCheck.map((item, index) => (
              <Grid item xs={12} md={4} key={index}>
                <InfoCard {...item} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="lg" sx={{ py: 10, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ ...s.font, fontWeight: 800, mb: 2 }}>
          Get Peace of Mind
        </Typography>
        <Typography sx={{ ...s.font, color: 'text.secondary', mb: 4, maxWidth: 600, mx: 'auto' }}>
          Use our AI-powered analysis to check your skin spots and moles. Get instant results and personalized recommendations.
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/sign-up')}
          sx={{ bgcolor: '#1976d2', px: 5, py: 1.5, borderRadius: 2, textTransform: 'none', fontSize: '1.1rem', fontWeight: 600 }}
        >
          Start Free Analysis
        </Button>
      </Container>

      <Footer />
    </Box>
  );
}

export default SkinMoles;
