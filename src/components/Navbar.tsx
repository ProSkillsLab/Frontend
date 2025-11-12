import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton } from '@clerk/clerk-react';

function Navbar() {
  const navigate = useNavigate();

  return (
  <AppBar position="static" sx={{ backgroundColor: '#222222' }} elevation={2}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <Box
            sx={{ display: 'flex', alignItems: 'center', flexGrow: 1, cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            <Box
              component="img"
              src="/dermaai.gif"
              alt="DermaAI logo"
              sx={{ width: 140, height: 'auto', mx: 0 }}
            />
          </Box>

          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <SignedOut>
              <Button
                color="inherit"
                variant="outlined"
                sx={{ borderColor: 'white', '&:hover': { borderColor: 'white', bgcolor: 'rgba(255,255,255,0.1)' } }}
                onClick={() => navigate('/sign-in')}
              >
                Login
              </Button>
              <Button
                color="inherit"
                variant="contained"
                sx={{ bgcolor: 'white', color: 'primary.main', '&:hover': { bgcolor: 'grey.100' } }}
                onClick={() => navigate('/sign-up')}
              >
                Sign Up
              </Button>
            </SignedOut>
            <SignedIn>
              <Button
                color="inherit"
                onClick={() => navigate('/dashboard')}
              >
                Dashboard
              </Button>
              <UserButton afterSignOutUrl="/" />
            </SignedIn>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
