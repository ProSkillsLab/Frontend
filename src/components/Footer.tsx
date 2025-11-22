import { Box, Container, Grid, Typography, Link, IconButton, Divider } from '@mui/material';
import { FacebookLogo, TwitterLogo, LinkedinLogo, InstagramLogo, Envelope, Phone, MapPin } from 'phosphor-react';
import { Link as RouterLink } from 'react-router-dom';

function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#222222',
        color: 'white',
        py: 6,
        mt: 'auto',
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
            <Typography variant="body2" sx={{ mb: 2, opacity: 0.9 }}>
              Advanced AI-powered dermatological analysis and patient management system. 
              Empowering healthcare professionals with cutting-edge technology.
            </Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <IconButton
                size="small"
                sx={{ color: 'white', '&:hover': { color: 'primary.light' } }}
                aria-label="Facebook"
              >
                <FacebookLogo size={24} weight="fill" />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: 'white', '&:hover': { color: 'primary.light' } }}
                aria-label="Twitter"
              >
                <TwitterLogo size={24} weight="fill" />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: 'white', '&:hover': { color: 'primary.light' } }}
                aria-label="LinkedIn"
              >
                <LinkedinLogo size={24} weight="fill" />
              </IconButton>
              <IconButton
                size="small"
                sx={{ color: 'white', '&:hover': { color: 'primary.light' } }}
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
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
              >
                Home
              </Link>
              <Link
                component={RouterLink}
                to="/about"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
              >
                About Us
              </Link>
              <Link
                component={RouterLink}
                to="/dashboard"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
              >
                Dashboard
              </Link>
              <Link
                component={RouterLink}
                to="/analysis"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
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
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
              >
                Documentation
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
              >
                API Reference
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
              >
                Support
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
              >
                Privacy Policy
              </Link>
              <Link
                href="#"
                color="inherit"
                underline="hover"
                sx={{ opacity: 0.9, '&:hover': { opacity: 1 } }}
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
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Envelope size={20} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  support@dermaai.com
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone size={20} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  +1 (555) 123-4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
                <MapPin size={20} />
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  123 Medical Plaza, Suite 456<br />
                  San Francisco, CA 94102
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body2" sx={{ opacity: 0.8 }}>
            © {new Date().getFullYear()} DermaAI. All rights reserved. | Revolutionizing dermatological care with AI.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;
