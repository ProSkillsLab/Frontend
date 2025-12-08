import { Box, Container, Typography, Grid, Paper, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Sun, Camera, FirstAidKit, ShieldCheck } from 'phosphor-react';

// Shared styles matching Dashboard
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

// Reusable Image Card Component
const ImageCard = ({ title, image }: { title: string; image: string }) => (
  <Paper elevation={0} sx={{ ...s.card, overflow: 'hidden', '&:hover': s.cardHover }}>
    <Box component="img" src={image} alt={title} sx={{ width: '100%', height: 200, objectFit: 'cover' }} />
    <Box sx={{ p: 2 }}>
      <Typography sx={{ ...s.font, fontWeight: 600, textAlign: 'center' }}>{title}</Typography>
    </Box>
  </Paper>
);

// Reusable Section Header Component
const SectionHeader = ({ title, subtitle, centered = false }: { title: string; subtitle?: string; centered?: boolean }) => (
  <>
    <Typography variant="h4" sx={{ ...s.font, ...s.sectionTitle, textAlign: centered ? 'center' : 'left' }}>
      {title}
    </Typography>
    {subtitle && (
      <Typography sx={{ ...s.font, color: 'text.secondary', mb: 4, maxWidth: centered ? 700 : 900, mx: centered ? 'auto' : 0, textAlign: centered ? 'center' : 'left' }}>
        {subtitle}
      </Typography>
    )}
  </>
);

// Data
const skinSpotExamples = [
  { title: 'Freckles', image: 'https://hips.hearstapps.com/hmg-prod/images/close-up-of-thoughtful-woman-with-freckles-on-face-royalty-free-image-1589835056.jpg?crop=1.00xw%3A0.752xh%3B0%2C0.233xh&resize=1200%3A%2A' },
  { title: 'Sun / Age Spots', image: 'https://fairviewderm.com/_astro/solar-lentigo-2.DVDFTpu0_28EKeu.webp' },
  { title: 'Melasma', image: 'https://s3.amazonaws.com/HMP/c360/imported/1708%20WYD%20Melasma.png' },
  { title: 'Post-Inflammatory Hyperpigmentation', image: 'https://www.minarsdermatology.com/wp-content/uploads/2025/08/minars-Post-Inflammatory-Hyperpigmentation-Dark-Spots-After-Skin-Injury-and-How-to-Treat-Them-what-casuess-PIH.jpg' }
];

const moleExamples = [
  { title: 'Common Mole', image: 'https://visualsonline.cancer.gov/retrieve.cfm?dpi=72&fileformat=jpg&imageid=10704' },
  { title: 'Atypical Mole', image: 'https://spotcheck.clinic/wp-content/uploads/2023/12/scc-Understanding-the-different-types-of-moles.png' },
  { title: 'Large Pigmented Mole', image: 'https://www.bderm.com/wp-content/uploads/2018/06/Dysplastic-Nevi.jpg' },
  { title: 'Multiple Moles', image: 'https://cdn-ilbmbcl.nitrocdn.com/baFCisyKucUHcVsddmCqwqllnXUEdlAz/assets/images/optimized/rev-1b7ab70/www.frontrangedermatology.net/wp-content/uploads/moles-on-man.jpg' }
];

const abcdeRules = [
  { letter: 'A', meaning: 'Asymmetry', description: 'One half does not match the other.' },
  { letter: 'B', meaning: 'Border', description: 'Edges are uneven or irregular.' },
  { letter: 'C', meaning: 'Color', description: 'More than one color or uneven shading.' },
  { letter: 'D', meaning: 'Diameter', description: 'Larger than 6 mm (pencil eraser).' },
  { letter: 'E', meaning: 'Evolving', description: 'Changes in size, color, shape, or texture.' }
];

const abcdeImages = [
  'https://braviaderm.com/Portals/0/Images/Articles/AtypicalMolesABCD2.jpg',
  'https://www.utphysicians.com/wp-content/uploads/2025/09/ABCDEs-of-Skin-Cancer-Graphic-%C6%92-1024x365.jpeg',
  'https://media.self.com/photos/64dd36f44fd943cf45ab3d57/master/w_1600%2Cc_limit/skin-cancer-mole-2.jpeg',
  'https://blog.dana-farber.org/insight/wp-content/uploads/2022/05/10862_Melanoma-ADCDEs-Infographic-scaled.jpg'
];

const skinCareTips = [
  { icon: <Sun size={28} weight="duotone" />, title: 'Use SPF 30+ Sunscreen', description: 'Apply sunscreen daily and reapply every 2 hours outdoors.', bgColor: '#FFF3E0' },
  { icon: <Camera size={28} weight="duotone" />, title: 'Track Changes', description: 'Take photos of moles and do monthly skin self-checks.', bgColor: '#E3F2FD' },
  { icon: <FirstAidKit size={28} weight="duotone" />, title: 'Visit a Dermatologist', description: 'See a dermatologist if a mole changes, bleeds, or looks unusual.', bgColor: '#E8F5E9' },
  { icon: <ShieldCheck size={28} weight="duotone" />, title: 'Avoid Tanning Beds', description: 'Avoid tanning beds and excessive sun exposure.', bgColor: '#FCE4EC' }
];

function SkinMoles() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f8fafc' }}>
      <Navbar />
      
      {/* Hero Banner - Matching Dashboard gradient style */}
      <Box sx={{ background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 50%, #1A237E 100%)', color: 'white', py: { xs: 8, sm: 10 } }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" component="h1" sx={{ ...s.font, fontWeight: 800, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, mb: 2 }}>
            Understanding Skin Spots and Moles
          </Typography>
          <Typography sx={{ ...s.font, color: 'rgba(255,255,255,0.85)', fontSize: { xs: '1rem', sm: '1.15rem' }, maxWidth: 700, mx: 'auto', lineHeight: 1.7 }}>
            Skin spots and moles are common skin features. Most are harmless, but some require attention. This guide explains the types, causes, risks, and signs to watch out for.
          </Typography>
        </Container>
      </Box>

      {/* What Are Skin Spots */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, sm: 7 } }}>
        <SectionHeader title="What Are Skin Spots?" subtitle="Skin spots are flat or raised discolored patches on the skin. They can result from sun exposure, aging, inflammation, or genetics." />
        <Grid container spacing={3}>
          {skinSpotExamples.map((spot, i) => (
            <Grid item xs={12} sm={6} md={3} key={i}><ImageCard {...spot} /></Grid>
          ))}
        </Grid>
      </Container>

      {/* What Are Moles */}
      <Box sx={{ bgcolor: 'white', py: { xs: 5, sm: 7 } }}>
        <Container maxWidth="lg">
          <SectionHeader title="What Are Moles?" subtitle="Moles, or nevi, are clusters of pigment-producing skin cells. They differ in size, shape, and color." />
          <Grid container spacing={3}>
            {moleExamples.map((mole, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}><ImageCard {...mole} /></Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* ABCDE Rule */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, sm: 7 } }}>
        <SectionHeader title="When Should You Be Concerned?" subtitle="Dermatologists use the ABCDE rule to detect suspicious moles:" centered />
        
        <TableContainer component={Paper} elevation={0} sx={{ ...s.card, mb: 5 }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8fafc' }}>
                {['Letter', 'Meaning', 'Description'].map(h => (
                  <TableCell key={h} sx={{ ...s.font, fontWeight: 700, fontSize: '0.95rem', color: '#1A237E' }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {abcdeRules.map((rule) => (
                <TableRow key={rule.letter} sx={{ '&:hover': { bgcolor: '#f8fafc' } }}>
                  <TableCell>
                    <Box sx={{ width: 40, height: 40, borderRadius: 2, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, boxShadow: '0 4px 12px rgba(21, 101, 192, 0.3)' }}>
                      {rule.letter}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ ...s.font, fontWeight: 600 }}>{rule.meaning}</TableCell>
                  <TableCell sx={{ ...s.font, color: 'text.secondary' }}>{rule.description}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Typography variant="h5" sx={{ ...s.font, ...s.sectionTitle }}>Visual Examples</Typography>
        <Grid container spacing={3}>
          {abcdeImages.map((img, i) => (
            <Grid item xs={12} sm={6} key={i}>
              <Paper elevation={0} sx={{ ...s.card, overflow: 'hidden', '&:hover': s.cardHover }}>
                <Box component="img" src={img} alt={`ABCDE Example ${i + 1}`} sx={{ width: '100%', height: 'auto', display: 'block' }} />
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Skin Care Tips */}
      <Box sx={{ bgcolor: 'white', py: { xs: 5, sm: 7 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ ...s.font, ...s.sectionTitle, textAlign: 'center', mb: 5 }}>How to Care for Your Skin</Typography>
          <Grid container spacing={3}>
            {skinCareTips.map((tip, i) => (
              <Grid item xs={12} sm={6} md={3} key={i}>
                <Paper elevation={0} sx={{ ...s.card, p: 3, height: '100%', textAlign: 'center', '&:hover': s.cardHover }}>
                  <Box sx={{ width: 60, height: 60, borderRadius: 2, bgcolor: tip.bgColor, display: 'flex', alignItems: 'center', justifyContent: 'center', mx: 'auto', mb: 2, color: '#1565C0' }}>
                    {tip.icon}
                  </Box>
                  <Typography sx={{ ...s.font, fontWeight: 700, fontSize: '1rem', mb: 1, color: '#1A237E' }}>{tip.title}</Typography>
                  <Typography sx={{ ...s.font, color: 'text.secondary', fontSize: '0.875rem', lineHeight: 1.6 }}>{tip.description}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Summary CTA */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, sm: 7 } }}>
        <Paper elevation={0} sx={{ p: { xs: 4, sm: 6 }, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 50%, #1A237E 100%)', color: 'white', borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ ...s.font, fontWeight: 800, mb: 2 }}>Summary</Typography>
          <Typography sx={{ ...s.font, mb: 4, maxWidth: 700, mx: 'auto', color: 'rgba(255,255,255,0.9)', lineHeight: 1.8 }}>
            Skin spots and moles are mostly harmless, but changes over time can signal underlying conditions. The ABCDE rule helps identify suspicious lesions. Monitor your skin regularly and practice sun protection.
          </Typography>
          <Button variant="contained" size="large" onClick={() => navigate('/sign-up')} sx={{ ...s.font, px: 5, py: 1.5, borderRadius: 2, textTransform: 'none', fontSize: '1rem', fontWeight: 700, bgcolor: '#EF5350', boxShadow: '0 4px 15px rgba(239, 83, 80, 0.4)', '&:hover': { bgcolor: '#E53935', transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(239, 83, 80, 0.5)' }, transition: 'all 0.3s ease' }}>
            Analyze Your Skin with DermaAI
          </Button>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
}

export default SkinMoles;
