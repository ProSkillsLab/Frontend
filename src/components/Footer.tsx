import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { FacebookLogo, TwitterLogo, LinkedinLogo, InstagramLogo, Envelope, Phone, MapPin } from 'phosphor-react';
import type { Icon } from 'phosphor-react';
import { Link as RouterLink } from 'react-router-dom';

// Data
const socialLinks = [
  { icon: FacebookLogo, label: 'Facebook' },
  { icon: TwitterLogo, label: 'Twitter' },
  { icon: LinkedinLogo, label: 'LinkedIn' },
  { icon: InstagramLogo, label: 'Instagram' },
];

const quickLinks = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/dashboard', label: 'Dashboard' },
  { to: '/analysis', label: 'Analysis' },
];

const resourceLinks = [
  { to: '/support', label: 'Support' },
  { to: '/privacy', label: 'Privacy Policy' },
  { to: '/termsofservice', label: 'Terms of Service' },
];

const contactInfo = [
  { icon: Envelope, text: 'support@dermaai.com' },
  { icon: Phone, text: '+1 (555) 123-4567' },
  { icon: MapPin, text: '123 Medical Plaza, Suite 456\nSan Francisco, CA 94102', multiline: true },
];

// Reusable Components
const SocialButton = ({ icon: IconComp, label }: { icon: Icon; label: string }) => (
  <IconButton size="small" sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }} aria-label={label}>
    <IconComp size={24} weight="fill" />
  </IconButton>
);

const FooterLink = ({ to, label }: { to: string; label: string }) => (
  <Link component={RouterLink} to={to} color="text.secondary" underline="hover" sx={{ '&:hover': { color: 'primary.main' } }}>
    {label}
  </Link>
);

const LinkSection = ({ title, links }: { title: string; links: typeof quickLinks }) => (
  <>
    <Typography variant="h6" gutterBottom fontWeight="bold">{title}</Typography>
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
      {links.map((link) => <FooterLink key={link.to} {...link} />)}
    </Box>
  </>
);

const ContactItem = ({ icon: IconComp, text, multiline }: { icon: Icon; text: string; multiline?: boolean }) => (
  <Box sx={{ display: 'flex', alignItems: multiline ? 'flex-start' : 'center', gap: 1, color: 'text.secondary' }}>
    <IconComp size={20} />
    <Typography variant="body2" sx={{ whiteSpace: multiline ? 'pre-line' : 'normal' }}>{text}</Typography>
  </Box>
);

function Footer() {
  return (
    <Box component="footer" sx={{ bgcolor: 'white', color: 'text.primary', py: 6, mt: 'auto', borderTop: '1px solid', borderColor: 'divider' }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Box component="img" src="/dermaai.png" alt="DermaAI logo" sx={{ width: 100, height: 'auto', mb: 2 }} />
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              Advanced AI-powered dermatological analysis and patient management system. 
              Empowering healthcare professionals with cutting-edge technology.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social) => <SocialButton key={social.label} {...social} />)}
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <LinkSection title="Quick Links" links={quickLinks} />
          </Grid>

          {/* Resources */}
          <Grid item xs={12} sm={6} md={3}>
            <LinkSection title="Resources" links={resourceLinks} />
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">Contact Us</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {contactInfo.map((item, i) => <ContactItem key={i} {...item} />)}
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3 }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} DermaAI. All rights reserved. | Revolutionizing dermatological care with AI.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;