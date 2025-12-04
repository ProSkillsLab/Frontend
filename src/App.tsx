import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { ClerkProvider, SignIn, SignUp } from '@clerk/clerk-react';
import Dashboard from './pages/Dashboard';
import About from './pages/About';
import Home from './pages/Home';
import Explore from './pages/Explore';
import Analysis from './pages/Analysis';
import Reports from './pages/Reports';
import ProtectedRoute from './components/ProtectedRoute';
import Support from "./pages/Support";
import TermsOfService from './pages/TermsofService';
import PrivacyPolicy from './pages/PrivacyPolicy';


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
        <div style={{ overflowX: 'hidden', width: '100%', maxWidth: '100vw' }}>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />
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
            <Route
              path="/reports"
              element={
                <ProtectedRoute>
                  <Reports />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/support" element={<Support />} />
            <Route path="privacy" element={<PrivacyPolicy />} />
            <Route path="/termsofservice" element={<TermsOfService />} />
          </Routes>
        </Router>
        </div>
      </ThemeProvider>
    </ClerkProvider>
  );
}

export default App;