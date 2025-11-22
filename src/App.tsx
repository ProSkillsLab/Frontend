import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ClerkProvider, SignIn, SignUp } from '@clerk/clerk-react';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Home from './pages/Home';
import Analysis from './pages/Analysis';
import ProtectedRoute from './components/ProtectedRoute';

// Import your Clerk publishable key from environment variables
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY || '';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  typography: {
    fontFamily: '"DM Sans", sans-serif',
    allVariants: {
      fontFamily: '"DM Sans", sans-serif',
    },
  },
});

function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/sign-in/*"
              element={
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                  <SignIn 
                    routing="path" 
                    path="/sign-in" 
                    signUpUrl="/sign-up"
                    forceRedirectUrl="/dashboard"
                    fallbackRedirectUrl="/dashboard"
                  />
                </div>
              }
            />
            <Route
              path="/sign-up/*"
              element={
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                  <SignUp 
                    routing="path" 
                    path="/sign-up" 
                    signInUrl="/sign-in"
                    forceRedirectUrl="/dashboard"
                    fallbackRedirectUrl="/dashboard"
                  />
                </div>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/analysis"
              element={
                <ProtectedRoute>
                  <Analysis />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default App;