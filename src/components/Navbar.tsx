import { AppBar, Toolbar, Button, Box, Container, Menu, MenuItem, Typography, type SxProps, type Theme } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut } from '@clerk/clerk-react';
import { SquaresFour, CaretDown, Compass, Flask, Circle, FirstAidKit, Article } from 'phosphor-react';
import type { Icon } from 'phosphor-react';
import { useState, useEffect, useCallback } from 'react';

// Shared styles
const styles = {
  paper: {
    mt: 1.5,
    bgcolor: '#222222',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: 2,
    minWidth: 280,
    boxShadow: '0 20px 40px rgba(0,0,0,0.4)',
    overflow: 'hidden',
  },
  menuItem: {
    py: 1.5,
    px: 2.5,
    display: 'flex',
    alignItems: 'center',
    gap: 2,
    color: 'white',
    transition: 'all 0.2s ease',
    '&:hover': { bgcolor: 'rgba(37, 99, 235, 0.2)', transform: 'translateX(4px)' },
  },
  navBtn: {
    textTransform: 'none' as const,
    fontSize: '1rem',
    fontWeight: 500,
    mx: 1,
    py: 1,
    px: 2,
    borderRadius: 2,
    transition: 'all 0.2s ease',
    '&:hover': { bgcolor: 'rgba(255,255,255,0.1)' },
  },
  ctaBtn: {
    bgcolor: '#2563EB',
    color: 'white',
    textTransform: 'none' as const,
    fontSize: '1rem',
    fontWeight: 600,
    ml: 2,
    px: 3,
    py: 1,
    borderRadius: 2,
    boxShadow: '0 4px 14px rgba(37, 99, 235, 0.4)',
    transition: 'all 0.2s ease',
    '&:hover': { bgcolor: '#1d4ed8', transform: 'translateY(-2px)', boxShadow: '0 6px 20px rgba(37, 99, 235, 0.5)' },
  },
};

// Menu item data
const menuData = {
  gettingStarted: [
    { path: '/explore', icon: Compass, color: '#60a5fa', bgColor: 'rgba(37, 99, 235, 0.2)', title: 'Explore DERMAAI', subtitle: 'Discover our AI-powered platform' },
    { path: '/research', icon: Flask, color: '#c084fc', bgColor: 'rgba(168, 85, 247, 0.2)', title: 'Scientific Research', subtitle: 'Learn about the science behind it' },
  ],
  skinHealth: [
    { path: '/skin-spots', icon: Circle, color: '#4ade80', bgColor: 'rgba(34, 197, 94, 0.2)', title: 'Skin Spots & Moles', subtitle: 'Learn about skin spots and when to check' },
    { path: '/cancer-info', icon: FirstAidKit, color: '#f87171', bgColor: 'rgba(239, 68, 68, 0.2)', title: 'Skin Cancer Information', subtitle: 'Important facts about skin cancer' },
  ],
};

// Reusable dropdown menu item component
const DropdownItem = ({ icon: IconComp, color, bgColor, title, subtitle, onClick }: {
  icon: Icon; color: string; bgColor: string; title: string; subtitle: string; onClick: () => void;
}) => (
  <MenuItem onClick={onClick} sx={styles.menuItem}>
    <Box sx={{ width: 40, height: 40, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: bgColor }}>
      <IconComp size={22} weight="duotone" color={color} />
    </Box>
    <Box>
      <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontWeight: 600, fontSize: '0.95rem', color: 'white' }}>{title}</Typography>
      <Typography sx={{ fontFamily: '"DM Sans", sans-serif', fontSize: '0.75rem', color: 'rgba(255,255,255,0.6)', mt: 0.3 }}>{subtitle}</Typography>
    </Box>
  </MenuItem>
);

// Reusable nav button component
const NavButton = ({ label, icon: IconComp, onClick, variant = 'text', sx }: {
  label: string; icon?: Icon; onClick: () => void; variant?: 'text' | 'contained'; sx?: SxProps<Theme>;
}) => (
  <Button
    color="inherit"
    variant={variant}
    startIcon={IconComp && <IconComp size={18} weight="duotone" />}
    onClick={onClick}
    sx={{ ...styles.navBtn, ...sx }}
  >
    {label}
  </Button>
);

// Reusable dropdown component
const NavDropdown = ({ label, isOpen, anchorEl, onOpen, onClose, items, navigate }: {
  label: string; isOpen: boolean; anchorEl: HTMLElement | null;
  onOpen: (e: React.MouseEvent<HTMLButtonElement>) => void; onClose: () => void;
  items: typeof menuData.gettingStarted; navigate: (path: string) => void;
}) => (
  <>
    <Button
      color="inherit"
      endIcon={<CaretDown size={16} weight="bold" style={{ transition: 'transform 0.2s ease', transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />}
      onClick={onOpen}
      sx={{ ...styles.navBtn, bgcolor: isOpen ? 'rgba(255,255,255,0.1)' : 'transparent' }}
    >
      {label}
    </Button>
    <Menu
      anchorEl={anchorEl}
      open={isOpen}
      onClose={onClose}
      MenuListProps={{ sx: { py: 1 } }}
      PaperProps={{ sx: styles.paper }}
      transformOrigin={{ horizontal: 'left', vertical: 'top' }}
      anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
    >
      {items.map((item) => (
        <DropdownItem
          key={item.path}
          {...item}
          onClick={() => { onClose(); navigate(item.path); }}
        />
      ))}
    </Menu>
  </>
);

function Navbar() {
  const navigate = useNavigate();
  
  // Dropdown states
  const [gettingStartedAnchor, setGettingStartedAnchor] = useState<HTMLElement | null>(null);
  const [skinHealthAnchor, setSkinHealthAnchor] = useState<HTMLElement | null>(null);

  const closeAllMenus = useCallback(() => {
    setGettingStartedAnchor(null);
    setSkinHealthAnchor(null);
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', closeAllMenus);
    return () => window.removeEventListener('scroll', closeAllMenus);
  }, [closeAllMenus]);

  return (
    <AppBar position="static" sx={{ backgroundColor: '#222222' }} elevation={0}>
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={() => navigate('/')}>
            <Box component="img" src="/dermaai.png" alt="DermaAI logo" sx={{ width: 140, height: 'auto' }} />
          </Box>

          {/* Center Menu Items */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 1, alignItems: 'center' }}>
            <NavDropdown
              label="Getting started"
              isOpen={Boolean(gettingStartedAnchor)}
              anchorEl={gettingStartedAnchor}
              onOpen={(e) => setGettingStartedAnchor(e.currentTarget)}
              onClose={() => setGettingStartedAnchor(null)}
              items={menuData.gettingStarted}
              navigate={navigate}
            />
            
            <NavDropdown
              label="Skin Health"
              isOpen={Boolean(skinHealthAnchor)}
              anchorEl={skinHealthAnchor}
              onOpen={(e) => setSkinHealthAnchor(e.currentTarget)}
              onClose={() => setSkinHealthAnchor(null)}
              items={menuData.skinHealth}
              navigate={navigate}
            />

            <NavButton label="Articles" icon={Article} onClick={() => navigate('/articles')} />

            <Button variant="contained" onClick={() => navigate('/sign-up')} sx={styles.ctaBtn}>
              Try DERMAAI
            </Button>
          </Box>

          {/* Right Side - Auth */}
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <SignedOut>
              <Button color="inherit" sx={{ textTransform: 'none', fontSize: '1rem', fontWeight: 500 }} onClick={() => navigate('/sign-in')}>
                Sign In / Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <Button color="inherit" startIcon={<SquaresFour size={20} weight="bold" />} onClick={() => navigate('/dashboard')}>
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