import { AppBar, Toolbar, Button, Box, Container, Menu, MenuItem } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { SquaresFour, CaretDown } from 'phosphor-react';
import { useState, useEffect, useCallback } from 'react';

function Navbar() {
  const navigate = useNavigate();
  
  // State for "Getting Started" menu
  const [gettingStartedAnchor, setGettingStartedAnchor] = useState<null | HTMLElement>(null);
  const openGettingStarted = Boolean(gettingStartedAnchor);
  const handleOpenGettingStarted = (event: React.MouseEvent<HTMLButtonElement>) => setGettingStartedAnchor(event.currentTarget);
  const handleCloseGettingStarted = () => setGettingStartedAnchor(null);

  // State for "Skin Health" menu
  const [skinHealthAnchor, setSkinHealthAnchor] = useState<null | HTMLElement>(null);
  const openSkinHealth = Boolean(skinHealthAnchor);
  const handleOpenSkinHealth = (event: React.MouseEvent<HTMLButtonElement>) => setSkinHealthAnchor(event.currentTarget);
  const handleCloseSkinHealth = () => setSkinHealthAnchor(null);

  // Close all dropdowns on scroll
  const closeAllMenus = useCallback(() => {
    setGettingStartedAnchor(null);
    setSkinHealthAnchor(null);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', closeAllMenus);
    return () => {
      window.removeEventListener('scroll', closeAllMenus);
    };
  }, [closeAllMenus]);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#222222' }} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box
            sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <Box
              component="img"
              src="/dermaai.png"
              alt="DermaAI logo"
              sx={{ width: 140, height: 'auto' }}
            />
          </Box>

          {/* Center Menu Items */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            
            {/* Getting Started Dropdown */}
            <Button
              color="inherit"
              endIcon={<CaretDown size={16} weight="bold" />}
              onClick={handleOpenGettingStarted}
              sx={{ textTransform: 'none', fontSize: '1rem', fontWeight: 500, mx: 1 }}
            >
              Getting started
            </Button>
            <Menu
              anchorEl={gettingStartedAnchor}
              open={openGettingStarted}
              onClose={handleCloseGettingStarted}
              MenuListProps={{ 'aria-labelledby': 'getting-started-button' }}
              PaperProps={{ sx: { mt: 1 } }}
            >
              <MenuItem onClick={() => { handleCloseGettingStarted(); navigate('/explore'); }}>Explore DERMAAI</MenuItem>
              <MenuItem onClick={() => { handleCloseGettingStarted(); navigate('/research'); }}>Scientific Research</MenuItem>
            </Menu>

            {/* Skin Health Dropdown */}
            <Button
              color="inherit"
              endIcon={<CaretDown size={16} weight="bold" />}
              onClick={handleOpenSkinHealth}
              sx={{ textTransform: 'none', fontSize: '1rem', fontWeight: 500, mx: 1 }}
            >
              Skin Health
            </Button>
            <Menu
              anchorEl={skinHealthAnchor}
              open={openSkinHealth}
              onClose={handleCloseSkinHealth}
              MenuListProps={{ 'aria-labelledby': 'skin-health-button' }}
              PaperProps={{ sx: { mt: 1 } }}
            >
              <MenuItem onClick={() => { handleCloseSkinHealth(); navigate('/skin-spots'); }}>Skin spots and moles</MenuItem>
              <MenuItem onClick={() => { handleCloseSkinHealth(); navigate('/cancer-info'); }}>Skin cancer Information</MenuItem>
            </Menu>

            {/* Articles Link */}
            <Button
              color="inherit"
              onClick={() => navigate('/articles')}
              sx={{ textTransform: 'none', fontSize: '1rem', fontWeight: 500, mx: 1 }}
            >
              Articles
            </Button>

            {/* Try DERMAAI Button */}
             <Button
                variant="contained"
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.1)', 
                  color: 'white',
                  textTransform: 'none',
                  fontSize: '1rem',
                  fontWeight: 500,
                  ml: 2,
                  px: 3,
                  '&:hover': { bgcolor: 'rgba(255,255,255,0.2)' }
                }}
                onClick={() => navigate('/sign-up')}
              >
                Try DERMAAI
              </Button>
          </Box>

          {/* Right Side - Auth */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <SignedOut>
              <Button
                color="inherit"
                sx={{ textTransform: 'none', fontSize: '1rem', fontWeight: 500 }}
                onClick={() => navigate('/sign-in')}
              >
                Sign In / Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <Button
                color="inherit"
                startIcon={<SquaresFour size={20} weight="bold" />}
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
            </SignedIn>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
