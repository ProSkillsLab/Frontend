import { Box, Container, Typography, Grid, Paper, Button, keyframes } from '@mui/material';
import { Target, Heart, Users, ShieldCheck, Sparkle, Lightbulb, EnvelopeSimple } from 'phosphor-react';
import Footer from '../components/Footer';

// Animations & Styles
const animations = {
  fadeInUp: keyframes`from { opacity: 0; transform: translateY(30px); } to { opacity: 1; transform: translateY(0); }`,
  fadeInLeft: keyframes`from { opacity: 0; transform: translateX(-30px); } to { opacity: 1; transform: translateX(0); }`,
  fadeInRight: keyframes`from { opacity: 0; transform: translateX(30px); } to { opacity: 1; transform: translateX(0); }`,
};

const s = {
  font: { fontFamily: '"DM Sans", sans-serif' },
  section: { py: { xs: 6, sm: 8, md: 10 } },
  title: { fontFamily: '"DM Sans", sans-serif', fontWeight: 800, mb: 2, fontSize: { xs: '1.75rem', sm: '2.25rem' } },
  subtitle: { fontFamily: '"DM Sans", sans-serif', color: 'text.secondary', fontSize: '1.1rem', lineHeight: 1.8, maxWidth: 600, mx: 'auto' },
  card: { p: { xs: 3, sm: 4 }, borderRadius: 4, height: '100%', bgcolor: 'white', border: '1px solid rgba(0,0,0,0.06)', transition: 'all 0.3s ease', '&:hover': { transform: 'translateY(-5px)', boxShadow: '0 12px 30px rgba(0,0,0,0.12)' } },
  iconBox: (bg: string, size = 60) => ({ width: size, height: size, borderRadius: 3, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: bg }),
  anim: (type: keyof typeof animations, delay = 0) => ({ animation: `${animations[type]} 0.6s ease-out ${delay}s forwards`, opacity: 0 }),
};

// Data
const values = [
  { icon: <ShieldCheck size={28} weight="duotone" color="#1976d2" />, bg: '#E3F2FD', title: 'Trust & Safety', description: 'Your health data is protected with enterprise-grade security and strict privacy protocols.' },
  { icon: <Sparkle size={28} weight="duotone" color="#9C27B0" />, bg: '#F3E5F5', title: 'Innovation', description: 'Leveraging cutting-edge AI technology to provide accurate and reliable skin analysis.' },
  { icon: <Lightbulb size={28} weight="duotone" color="#FF9800" />, bg: '#FFF3E0', title: 'Accessibility', description: 'Making professional dermatological insights available to everyone, anywhere, anytime.' },
];

const teamMembers = [
  { name: 'Team Member 1', role: 'Role 1', image: '/placeholder.jpg' },
  { name: 'Team Member 2', role: 'Role 2', image: '/placeholder.jpg' },
  { name: 'Team Member 3', role: 'Role 3', image: '/placeholder.jpg' },
];

const stats = [
  { value: '10K+', label: 'Users Helped' },
  { value: '99%', label: 'Accuracy Rate' },
  { value: '24/7', label: 'AI Support' },
  { value: '50+', label: 'Skin Conditions' },
];

// Reusable Components
const SectionHeader = ({ icon, bg, title, subtitle }: { icon: React.ReactNode; bg: string; title: string; subtitle: string }) => (
  <Box sx={{ textAlign: 'center', mb: 6 }}>
    <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}><Box sx={s.iconBox(bg, 50)}>{icon}</Box></Box>
    <Typography variant="h3" sx={s.title}>{title}</Typography>
    <Typography sx={s.subtitle}>{subtitle}</Typography>
  </Box>
);

const CardGrid = <T extends object>({ items, render, md = 4 }: { items: T[]; render: (item: T & { index: number }) => React.ReactNode; md?: number }) => (
  <Grid container spacing={3} justifyContent="center">
    {items.map((item, index) => <Grid item xs={12} sm={6} md={md} key={index}>{render({ ...item, index })}</Grid>)}
  </Grid>
);

function About() {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* Hero */}
      <Box sx={{ background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 50%, #1A237E 100%)', color: 'white', py: { xs: 8, sm: 10, md: 12 }, px: { xs: 2, sm: 0 }, overflow: 'hidden' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="overline" sx={{ ...s.font, color: 'rgba(255,255,255,0.7)', letterSpacing: 2, mb: 1, display: 'block', ...s.anim('fadeInLeft') }}>WHO WE ARE</Typography>
              <Typography variant="h2" component="h1" sx={{ ...s.font, fontWeight: 800, fontSize: { xs: '2.25rem', sm: '3rem', md: '3.5rem' }, mb: 3, ...s.anim('fadeInLeft', 0.1) }}>About DermaAI</Typography>
              <Typography sx={{ ...s.font, fontSize: { xs: '1rem', sm: '1.15rem' }, color: 'rgba(255,255,255,0.9)', lineHeight: 1.8, mb: 4, ...s.anim('fadeInLeft', 0.2) }}>
                We're on a mission to revolutionize skin health through artificial intelligence. Our advanced AI technology provides instant, accurate skin analysis to help you take control of your dermatological health.
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, ...s.anim('fadeInLeft', 0.3) }}>
                <Button variant="contained" size="large" sx={{ ...s.font, bgcolor: 'white', color: 'primary.main', fontWeight: 700, px: 4, '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}>Get Started</Button>
                <Button variant="outlined" size="large" sx={{ ...s.font, borderColor: 'rgba(255,255,255,0.5)', color: 'white', fontWeight: 600, px: 4, '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}>Learn More</Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Box sx={{ ...s.anim('fadeInRight', 0.3) }}>
                <Box component="img" src="/about-hero.jpg" alt="About DermaAI" sx={{ width: '100%', maxHeight: 450, borderRadius: 4, objectFit: 'cover', boxShadow: '0 25px 50px rgba(0,0,0,0.3)' }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Stats */}
      <Box sx={{ bgcolor: '#0D47A1', py: { xs: 4, sm: 5 } }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} justifyContent="center">
            {stats.map(({ value, label }, i) => (
              <Grid item xs={6} sm={3} key={i}>
                <Box sx={{ textAlign: 'center', ...s.anim('fadeInUp', 0.3 + i * 0.1) }}>
                  <Typography variant="h3" sx={{ ...s.font, fontWeight: 800, color: 'white', mb: 0.5 }}>{value}</Typography>
                  <Typography sx={{ ...s.font, color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem' }}>{label}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Mission */}
      <Box sx={{ ...s.section, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ ...s.anim('fadeInLeft'), display: 'flex', justifyContent: 'center' }}>
                <Box component="img" src="https://talent-minds.com/wp-content/uploads/2022/03/skillsoft_icon_goals.gif" alt="Our Mission" sx={{ width: '100%', maxWidth: 400, borderRadius: 4 }} />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={s.anim('fadeInRight')}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                  <Box sx={s.iconBox('#E8F5E9', 50)}><Target size={24} weight="duotone" color="#4CAF50" /></Box>
                  <Typography variant="overline" sx={{ ...s.font, color: '#4CAF50', letterSpacing: 2, fontWeight: 700 }}>OUR MISSION</Typography>
                </Box>
                <Typography variant="h3" sx={s.title}>Empowering Better Skin Health</Typography>
                <Typography color="text.secondary" sx={{ ...s.font, fontSize: '1.05rem', lineHeight: 1.8, mb: 3 }}>
                  Our mission is to make professional-grade skin analysis accessible to everyone. By combining advanced AI with dermatological expertise, we help individuals identify potential skin concerns early.
                </Typography>
                <Typography color="text.secondary" sx={{ ...s.font, fontSize: '1.05rem', lineHeight: 1.8 }}>
                  We believe that early detection and awareness are key to maintaining healthy skin. Our technology bridges the gap between curiosity and professional consultation.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Values */}
      <Box sx={{ ...s.section, bgcolor: '#f8fafc' }}>
        <Container maxWidth="lg">
          <SectionHeader icon={<Heart size={24} weight="duotone" color="#E91E63" />} bg="#FCE4EC" title="Our Core Values" subtitle="The principles that guide everything we do" />
          <CardGrid items={values} render={({ icon, bg, title, description, index }) => (
            <Paper elevation={0} sx={{ ...s.card, ...s.anim('fadeInUp', 0.2 + index * 0.15) }}>
              <Box sx={{ ...s.iconBox(bg), mb: 2 }}>{icon}</Box>
              <Typography variant="h6" sx={{ ...s.font, fontWeight: 700, mb: 1 }}>{title}</Typography>
              <Typography variant="body2" color="text.secondary" sx={{ ...s.font, lineHeight: 1.7 }}>{description}</Typography>
            </Paper>
          )} />
        </Container>
      </Box>

      {/* Team */}
      <Box sx={{ ...s.section, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <SectionHeader icon={<Users size={24} weight="duotone" color="#1976d2" />} bg="#E3F2FD" title="Meet Our Team" subtitle="The passionate people behind DermaAI" />
          <CardGrid items={teamMembers} render={({ name, role, image, index }) => (
            <Paper elevation={0} sx={{ ...s.card, textAlign: 'center', ...s.anim('fadeInUp', 0.2 + index * 0.15) }}>
              <Box sx={{ width: 120, height: 120, borderRadius: '50%', overflow: 'hidden', mx: 'auto', mb: 2, bgcolor: '#f5f5f5', border: '4px solid #E3F2FD' }}>
                <Box component="img" src={image} alt={name} sx={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </Box>
              <Typography variant="h6" sx={{ ...s.font, fontWeight: 700 }}>{name}</Typography>
              <Typography variant="body2" color="text.secondary" sx={s.font}>{role}</Typography>
            </Paper>
          )} />
        </Container>
      </Box>

      {/* CTA */}
      <Box sx={{ ...s.section, background: 'linear-gradient(135deg, #1565C0 0%, #0D47A1 100%)', color: 'white', textAlign: 'center' }}>
        <Container maxWidth="md">
          <Box sx={s.anim('fadeInUp')}>
            <Box sx={{ ...s.iconBox('rgba(255,255,255,0.15)', 70), mx: 'auto', mb: 3 }}><EnvelopeSimple size={32} weight="duotone" color="white" /></Box>
            <Typography variant="h4" sx={{ ...s.font, fontWeight: 800, mb: 2 }}>Get In Touch</Typography>
            <Typography sx={{ ...s.font, color: 'rgba(255,255,255,0.9)', mb: 4, fontSize: '1.1rem', maxWidth: 500, mx: 'auto' }}>
              Have questions or feedback? We'd love to hear from you. Reach out and let's start a conversation.
            </Typography>
            <Button variant="contained" size="large" sx={{ ...s.font, bgcolor: 'white', color: 'primary.main', fontWeight: 700, px: 5, py: 1.5, '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' } }}>Contact Us</Button>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

export default About;