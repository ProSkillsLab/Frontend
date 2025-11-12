import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import HeroSection from '../components/home/HeroSection';
import FeaturesSection from '../components/home/FeaturesSection';
import CTASection from '../components/home/CTASection';

function Home() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CTASection />
    </Box>
  );
}

export default Home;
