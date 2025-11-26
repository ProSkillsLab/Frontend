import { Box } from '@mui/material';
import Navbar from '../components/Navbar';
import HeroSection from '../components/home/HeroSection';
import EducationSection from '../components/home/EducationSection';
import HowItWorksSection from '../components/home/HowItWorksSection';
import FeaturesSection from '../components/home/FeaturesSection';
import CTASection from '../components/home/CTASection';
import Footer from '../components/Footer';

function Home() {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: 'background.default' }}>
      <Navbar />
      <HeroSection />
      <EducationSection />
      <HowItWorksSection />
      <FeaturesSection />
      <CTASection />
      <Footer />
    </Box>
  );
}

export default Home;
