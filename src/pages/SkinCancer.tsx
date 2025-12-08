import { Box, Container, Typography, Grid, Paper, Button, Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Sun, ShieldCheck, Eye, FirstAidKit, Warning, UserCircle, Clock } from 'phosphor-react';

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

// Data
const cancerTypes = [
  { name: 'Basal Cell Carcinoma (BCC)', description: 'Very common, usually slow-growing' },
  { name: 'Squamous Cell Carcinoma (SCC)', description: 'Can grow deeper and sometimes spread' },
  { name: 'Melanoma', description: 'Less common but more dangerous, more likely to spread if not treated early' }
];

const bccFeatures = ['Shiny or "pearly" bump', 'Can be pink, red, or skin-coloured', 'May bleed easily or form a sore that does not heal'];
const sccFeatures = ['Rough, scaly or crusted patch', 'May look like a wart or thick, raised area', 'Can ulcerate (break open) and bleed', 'Often found on sun-exposed areas like the face, ears, hands, or scalp'];
const melanomaFeatures = ['May start as a new dark spot', 'Or may develop from a pre-existing mole', 'Often has an irregular outline and uneven colours'];

const abcdeRules = [
  { letter: 'A', meaning: 'Asymmetry', description: 'One half of the mole does not match the other half.' },
  { letter: 'B', meaning: 'Border', description: 'Edges are irregular, blurry, or jagged instead of smooth.' },
  { letter: 'C', meaning: 'Color', description: 'Several colours in one spot (brown, black, red, white, blue) or strong colour changes.' },
  { letter: 'D', meaning: 'Diameter', description: 'Larger than about 6 mm (size of a pencil eraser). But melanomas can also be smaller.' },
  { letter: 'E', meaning: 'Evolving', description: 'The spot is changing in size, shape, colour, or begins to itch, bleed, or crust.' }
];

const riskFactors = [
  { icon: <UserCircle size={24} weight="duotone" />, text: 'Have very fair skin, light hair, or light eyes' },
  { icon: <Sun size={24} weight="duotone" />, text: 'Have had many sunburns, especially blistering burns in childhood' },
  { icon: <Sun size={24} weight="duotone" />, text: 'Spend a lot of time in the sun or use tanning beds' },
  { icon: <Eye size={24} weight="duotone" />, text: 'Have many moles or some large / irregular moles' },
  { icon: <UserCircle size={24} weight="duotone" />, text: 'Have a family history of skin cancer' },
  { icon: <ShieldCheck size={24} weight="duotone" />, text: 'Have a weakened immune system' }
];

const preventionTips = [
  { icon: <Sun size={28} weight="duotone" />, title: 'Use Sunscreen', description: 'Use broad-spectrum sunscreen (SPF 30+) every day. Re-apply every 2 hours.', bgColor: '#FFF3E0' },
  { icon: <ShieldCheck size={28} weight="duotone" />, title: 'Wear Protection', description: 'Wear hats, sunglasses, and protective clothing outdoors.', bgColor: '#E3F2FD' },
  { icon: <Clock size={28} weight="duotone" />, title: 'Seek Shade', description: 'Stay in shade between 10am-4pm when the sun is strongest.', bgColor: '#E8F5E9' },
  { icon: <Warning size={28} weight="duotone" />, title: 'Avoid Tanning Beds', description: 'Tanning beds emit harmful UV radiation that increases risk.', bgColor: '#FCE4EC' },
  { icon: <Eye size={28} weight="duotone" />, title: 'Monthly Self-Check', description: 'Do a monthly skin self-check to look for new or changing spots.', bgColor: '#F3E5F5' }
];

const urgentSigns = [
  'A mole or spot follows the ABCDE rule (asymmetry, border, colour, diameter, evolving)',
  'A sore does not heal within a few weeks',
  'A mole suddenly starts to itch, bleed, or crust',
  'You notice a new dark spot that looks different from your other moles'
];

function SkinCancer() {
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', bgcolor: '#f8fafc' }}>
      <Navbar />
      
      {/* Hero Banner */}
      <Box sx={{ background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 50%, #1A237E 100%)', color: 'white', py: { xs: 8, sm: 10 } }}>
        <Container maxWidth="lg" sx={{ textAlign: 'center' }}>
          <Typography variant="h2" component="h1" sx={{ ...s.font, fontWeight: 800, fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, mb: 2 }}>
            Skin Cancer Information
          </Typography>
          <Typography sx={{ ...s.font, color: 'rgba(255,255,255,0.85)', fontSize: { xs: '1rem', sm: '1.15rem' }, maxWidth: 750, mx: 'auto', lineHeight: 1.7, mb: 3 }}>
            Skin cancer happens when skin cells start to grow in an uncontrolled way. Most cases are related to long-term damage from ultraviolet (UV) light from the sun or tanning beds.
          </Typography>
          <Alert severity="warning" sx={{ maxWidth: 650, mx: 'auto', ...s.font }}>
            This page is for <strong>education only</strong>. It does not replace medical advice. If you are worried about a spot or mole, always see a doctor or dermatologist.
          </Alert>
        </Container>
      </Box>

      {/* Main Types of Skin Cancer */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, sm: 7 } }}>
        <Typography variant="h4" sx={{ ...s.font, ...s.sectionTitle, textAlign: 'center' }}>
          1. Main Types of Skin Cancer
        </Typography>
        <Typography sx={{ ...s.font, color: 'text.secondary', textAlign: 'center', mb: 4 }}>
          The three most common types are:
        </Typography>
        <Grid container spacing={3}>
          {cancerTypes.map((type, i) => (
            <Grid item xs={12} md={4} key={i}>
              <Paper elevation={0} sx={{ ...s.card, p: 3, height: '100%', textAlign: 'center', '&:hover': s.cardHover }}>
                <Box sx={{ width: 50, height: 50, borderRadius: 2, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.25rem', mx: 'auto', mb: 2 }}>
                  {i + 1}
                </Box>
                <Typography sx={{ ...s.font, fontWeight: 700, color: '#1A237E', mb: 1 }}>{type.name}</Typography>
                <Typography sx={{ ...s.font, color: 'text.secondary', fontSize: '0.9rem' }}>{type.description}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* BCC Section */}
      <Box sx={{ bgcolor: 'white', py: { xs: 5, sm: 7 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ ...s.font, ...s.sectionTitle }}>
            2. Basal Cell Carcinoma (BCC)
          </Typography>
          <Typography sx={{ ...s.font, color: 'text.secondary', mb: 3 }}>
            Basal cell carcinoma starts in the <strong>basal cells</strong>, which are at the bottom layer of the epidermis (outer skin).
          </Typography>
          <Paper elevation={0} sx={{ ...s.card, p: 3 }}>
            <Typography sx={{ ...s.font, fontWeight: 600, mb: 2 }}>Typical features:</Typography>
            <Box component="ul" sx={{ ...s.font, color: 'text.secondary', pl: 3, mb: 0 }}>
              {bccFeatures.map((f, i) => <li key={i} style={{ marginBottom: 8 }}>{f}</li>)}
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* SCC Section */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, sm: 7 } }}>
        <Typography variant="h4" sx={{ ...s.font, ...s.sectionTitle }}>
          3. Squamous Cell Carcinoma (SCC)
        </Typography>
        <Typography sx={{ ...s.font, color: 'text.secondary', mb: 3 }}>
          Squamous cell carcinoma starts in the <strong>squamous cells</strong> of the upper epidermis. SCC is usually curable if treated early, but it has a greater chance of spreading than BCC.
        </Typography>
        <Paper elevation={0} sx={{ ...s.card, p: 3 }}>
          <Typography sx={{ ...s.font, fontWeight: 600, mb: 2 }}>Typical features:</Typography>
          <Box component="ul" sx={{ ...s.font, color: 'text.secondary', pl: 3, mb: 0 }}>
            {sccFeatures.map((f, i) => <li key={i} style={{ marginBottom: 8 }}>{f}</li>)}
          </Box>
        </Paper>
      </Container>

      {/* Melanoma Section */}
      <Box sx={{ bgcolor: 'white', py: { xs: 5, sm: 7 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ ...s.font, ...s.sectionTitle }}>
            4. Melanoma
          </Typography>
          <Typography sx={{ ...s.font, color: 'text.secondary', mb: 3 }}>
            Melanoma develops from <strong>melanocytes</strong>, the pigment-producing cells that give skin its colour. It is less common, but <strong>more dangerous</strong> because it can spread (metastasize) to other organs.
          </Typography>
          <Paper elevation={0} sx={{ ...s.card, p: 3 }}>
            <Typography sx={{ ...s.font, fontWeight: 600, mb: 2 }}>Typical features:</Typography>
            <Box component="ul" sx={{ ...s.font, color: 'text.secondary', pl: 3, mb: 0 }}>
              {melanomaFeatures.map((f, i) => <li key={i} style={{ marginBottom: 8 }}>{f}</li>)}
            </Box>
          </Paper>
        </Container>
      </Box>

      {/* ABCDE Rule */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, sm: 7 } }}>
        <Typography variant="h4" sx={{ ...s.font, ...s.sectionTitle, textAlign: 'center' }}>
          5. The ABCDE Rule for Melanoma
        </Typography>
        <Typography sx={{ ...s.font, color: 'text.secondary', textAlign: 'center', mb: 4, maxWidth: 700, mx: 'auto' }}>
          Doctors use the ABCDE rule to help people remember warning signs in moles or dark spots:
        </Typography>
        <Grid container spacing={2}>
          {abcdeRules.map((rule, i) => (
            <Grid item xs={12} key={i}>
              <Paper elevation={0} sx={{ ...s.card, p: 3, display: 'flex', alignItems: 'flex-start', gap: 3, '&:hover': s.cardHover }}>
                <Box sx={{ width: 50, height: 50, borderRadius: 2, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.25rem', flexShrink: 0, boxShadow: '0 4px 12px rgba(21, 101, 192, 0.3)' }}>
                  {rule.letter}
                </Box>
                <Box>
                  <Typography sx={{ ...s.font, fontWeight: 700, color: '#1A237E' }}>{rule.letter} – {rule.meaning}</Typography>
                  <Typography sx={{ ...s.font, color: 'text.secondary', mt: 0.5 }}>{rule.description}</Typography>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
        <Alert severity="info" sx={{ mt: 4, ...s.font }}>
          Any mole or spot that is <strong>new, changing, or looks very different</strong> from your other moles should be checked by a doctor.
        </Alert>
      </Container>

      {/* Risk Factors */}
      <Box sx={{ bgcolor: 'white', py: { xs: 5, sm: 7 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ ...s.font, ...s.sectionTitle, textAlign: 'center' }}>
            6. Risk Factors
          </Typography>
          <Typography sx={{ ...s.font, color: 'text.secondary', textAlign: 'center', mb: 4 }}>
            You are at higher risk of skin cancer if you:
          </Typography>
          <Grid container spacing={2}>
            {riskFactors.map((risk, i) => (
              <Grid item xs={12} sm={6} key={i}>
                <Paper elevation={0} sx={{ ...s.card, p: 3, display: 'flex', alignItems: 'center', gap: 2, '&:hover': s.cardHover }}>
                  <Box sx={{ color: '#1565C0' }}>{risk.icon}</Box>
                  <Typography sx={{ ...s.font, fontSize: '0.95rem' }}>{risk.text}</Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Prevention */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, sm: 7 } }}>
        <Typography variant="h4" sx={{ ...s.font, ...s.sectionTitle, textAlign: 'center', mb: 5 }}>
          7. Prevention – How to Protect Your Skin
        </Typography>
        <Grid container spacing={3}>
          {preventionTips.map((tip, i) => (
            <Grid item xs={12} sm={6} md={4} key={i}>
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

      {/* When to See a Doctor */}
      <Box sx={{ bgcolor: 'white', py: { xs: 5, sm: 7 } }}>
        <Container maxWidth="lg">
          <Typography variant="h4" sx={{ ...s.font, ...s.sectionTitle, textAlign: 'center' }}>
            8. When to See a Doctor
          </Typography>
          <Paper elevation={0} sx={{ ...s.card, p: 4 }}>
            <Typography sx={{ ...s.font, fontWeight: 600, mb: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <FirstAidKit size={24} weight="duotone" color="#EF5350" /> See a doctor or dermatologist as soon as possible if:
            </Typography>
            <Box component="ul" sx={{ ...s.font, color: 'text.secondary', pl: 3, mb: 0 }}>
              {urgentSigns.map((sign, i) => <li key={i} style={{ marginBottom: 8 }}>{sign}</li>)}
            </Box>
            <Alert severity="success" sx={{ mt: 3, ...s.font }}>
              Early diagnosis makes treatment easier and outcomes much better.
            </Alert>
          </Paper>
        </Container>
      </Box>

      {/* Summary CTA */}
      <Container maxWidth="lg" sx={{ py: { xs: 5, sm: 7 } }}>
        <Paper elevation={0} sx={{ p: { xs: 4, sm: 6 }, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 50%, #1A237E 100%)', color: 'white', borderRadius: 3, textAlign: 'center' }}>
          <Typography variant="h4" sx={{ ...s.font, fontWeight: 800, mb: 3 }}>9. Quick Summary</Typography>
          <Box sx={{ ...s.font, color: 'rgba(255,255,255,0.9)', lineHeight: 2, maxWidth: 700, mx: 'auto', mb: 4, textAlign: 'left' }}>
            <Typography component="div" sx={{ mb: 1 }}>• Skin cancer includes <strong>BCC</strong>, <strong>SCC</strong>, and <strong>Melanoma</strong></Typography>
            <Typography component="div" sx={{ mb: 1 }}>• BCC and SCC are common and usually curable if treated early</Typography>
            <Typography component="div" sx={{ mb: 1 }}>• <strong>Melanoma</strong> is more dangerous but often curable when found early</Typography>
            <Typography component="div" sx={{ mb: 1 }}>• Use the <strong>ABCDE rule</strong> and watch for <strong>new or changing</strong> spots</Typography>
            <Typography component="div">• Sun protection and regular skin checks help reduce your risk</Typography>
          </Box>
          <Alert severity="info" sx={{ maxWidth: 650, mx: 'auto', mb: 3, ...s.font }}>If you are ever unsure about a spot or mole, it is <strong>always safer to get it checked</strong>.</Alert>
          <Button variant="contained" size="large" onClick={() => navigate('/sign-up')} sx={{ ...s.font, px: 5, py: 1.5, borderRadius: 2, textTransform: 'none', fontSize: '1rem', fontWeight: 700, bgcolor: '#EF5350', boxShadow: '0 4px 15px rgba(239, 83, 80, 0.4)', '&:hover': { bgcolor: '#E53935', transform: 'translateY(-2px)', boxShadow: '0 8px 25px rgba(239, 83, 80, 0.5)' }, transition: 'all 0.3s ease' }}>
            Check Your Skin with DermaAI
          </Button>
        </Paper>
      </Container>

      <Footer />
    </Box>
  );
}

export default SkinCancer;
