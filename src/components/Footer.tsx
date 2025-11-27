import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { FacebookLogo, TwitterLogo, LinkedinLogo, InstagramLogo, Envelope, Phone, MapPin } from 'phosphor-react';
import { Link as RouterLink } from 'react-router-dom';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'white',
        color: 'text.primary',
        py: 6,
        mt: 'auto',
        borderTop: '1px solid',
        borderColor: 'divider'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Box
              component="img"
              src="/dermaai.png"
              alt="DermaAI logo"
              sx={{ width: 100, height: 'auto', mb: 2 }}
            />
            <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
              Advanced AI-powered dermatological analysis and patient management system. 
              Empowering healthcare professionals with cutting-edge technology.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                size="small"
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                aria-label="Facebook"
              >
                <FacebookLogo size={24} weight="fill" />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                aria-label="Twitter"
              >
                <TwitterLogo size={24} weight="fill" />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                aria-label="LinkedIn"
              >
                <LinkedinLogo size={24} weight="fill" />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: 'text.secondary', '&:hover': { color: 'primary.main' } }}
                aria-label="Instagram"
              >
                <InstagramLogo size={24} weight="fill" />
              </IconButton>
            </Box>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={2}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                component={RouterLink}
                to="/"
                color="text.secondary"
                underline="hover"
                sx={{ '&:hover': { color: 'primary.main' } }}
              >
                Home
              </Link>
              <Link
                component={RouterLink}
                to="/about"
                color="text.secondary"
                underline="hover"
                sx={{ '&:hover': { color: 'primary.main' } }}
              >
                About Us
              </Link>
              <Link
                component={RouterLink}
                to="/dashboard"
                color="text.secondary"
                underline="hover"
                sx={{ '&:hover': { color: 'primary.main' } }}
              >
                Dashboard
              </Link>
              <Link
                component={RouterLink}
                to="/analysis"
                color="text.secondary"
                underline="hover"
                sx={{ '&:hover': { color: 'primary.main' } }}
              >
                Analysis
              </Link>
            </Box>
          </Grid>

          {/* Resources */}
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Resources
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Link
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{ '&:hover': { color: 'primary.main' } }}
              >
                Documentation
              </Link>
              <Link
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{ '&:hover': { color: 'primary.main' } }}
              >
                API Reference
              </Link>
              <Link
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{ '&:hover': { color: 'primary.main' } }}
              >
                Support
              </Link>
              <Link
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{ '&:hover': { color: 'primary.main' } }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                color="text.secondary"
                underline="hover"
                sx={{ '&:hover': { color: 'primary.main' } }}
              >
                Terms of Service
              </Link>
            </Box>
          </Grid>

          {/* Contact Info */}
          <Grid item xs={12} md={3}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Contact Us
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                <Envelope size={20} />
                <Typography variant="body2">
                  support@dermaai.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary' }}>
                <Phone size={20} />
                <Typography variant="body2">
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, color: 'text.secondary' }}>
                <MapPin size={20} />
                <Typography variant="body2">
                  123 Medical Plaza, Suite 456<br />
                  San Francisco, CA 94102
                </Typography>
              </Box>
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
