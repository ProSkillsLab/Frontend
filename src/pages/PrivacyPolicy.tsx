import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Box,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import {
  ShieldCheck,
  LockKey,
  User,
  CloudCheck,
  Warning,
  ArrowsClockwise,
  Phone,
  Envelope,
  MapPin,
} from "phosphor-react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

// Define all sections for the Table of Contents(TOC) and main content
// Each section carry an id, title, color for the icon/border and icon itself
const sections = [
  { id: "section1", title: "Information We Collect", color: "#4CAF50", icon: <ShieldCheck size={24} /> },
  { id: "section2", title: "How We Use Your Data", color: "#2196F3", icon: <User size={24} /> },
  { id: "section3", title: "Data Sharing & Disclosure", color: "#9C27B0", icon: <CloudCheck size={24} /> },
  { id: "section4", title: "Data Storage & Security", color: "#FF9800", icon: <LockKey size={24} /> },
  { id: "section5", title: "Your Rights", color: "#673AB7", icon: <User size={24} /> },
  { id: "section6", title: "Third-Party Services", color: "#03A9F4", icon: <CloudCheck size={24} /> },
  { id: "section7", title: "Children’s Privacy", color: "#F44336", icon: <Warning size={24} /> },
  { id: "section8", title: "Changes to This Policy", color: "#FF5722", icon: <ArrowsClockwise size={24} /> },
  { id: "section9", title: "How to Contact Us", color: "#009688", icon: <Phone size={24} /> },
];

const PrivacyPolicy: React.FC = () => {
    // Track which section is currently in view for highlighting in TOC
  const [activeSection, setActiveSection] = useState("section1");

  // Scroll event to update active section
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150;
      sections.forEach((sec) => {
        const el = document.getElementById(sec.id);
        if (el && el.offsetTop <= scrollPos && el.offsetTop + el.offsetHeight > scrollPos) {
          setActiveSection(sec.id);
        }
      });
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll smoothly to section when user clicked TOC
  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <Navbar />

      <Box sx={{ backgroundColor: "#f9f9f9", py: 6, minHeight: "100vh" }}>
        <Container maxWidth="lg" sx={{ display: "flex", gap: 4 }}>

          {/* Table of Contents Sidebar */}
          <Box
            sx={{
              flex: "0 0 250px",
              display: { xs: "none", md: "block" },
              position: "sticky",
              top: 100,
            }}
          >
            <Box sx={{ bgcolor: "white", borderRadius: 2, p: 3, boxShadow: 1 }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Contents
              </Typography>
              <List>
                {sections.map((sec) => (
                  <ListItem
                    key={sec.id}
                    button
                    onClick={() => scrollToSection(sec.id)}
                    sx={{
                      borderLeft:
                        activeSection === sec.id
                          ? `4px solid ${sec.color}`
                          : "4px solid transparent",
                      pl: 2,
                      py: 1,
                      "&:hover": { bgcolor: "#f0f0f0" },
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: 1,
                    }}
                  >
                    {React.cloneElement(sec.icon, { color: sec.color })}
                    <ListItemText
                      primary={sec.title}
                      primaryTypographyProps={{
                        fontWeight: activeSection === sec.id ? 700 : 400,
                        color: activeSection === sec.id ? "primary.main" : "text.primary",
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Box>

          {/* Main Content */}
          <Container maxWidth="md">
            <Box sx={{ backgroundColor: "white", p: 4, borderRadius: 2, boxShadow: 1 }}>

              {/* Page Header */}
              <Typography variant="h3" sx={{ fontWeight: 700, mb: 1 }}>
                Privacy Policy
              </Typography>
              <Typography variant="subtitle1" color="text.secondary" paragraph>
                Last updated: December 2025
              </Typography>

              {/* Sections */}
              {/* Each section align with same sructure-colored icon, heading, content */}
              {/* 1 */}
              <Typography
                id="section1"
                variant="h5"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <ShieldCheck size={28} color="#4CAF50" /> 1. Information We Collect
              </Typography>
              <List>
                <ListItem><ListItemText primary="Uploaded skin lesion images for analysis." /></ListItem>
                <ListItem><ListItemText primary="Usage data such as IP address, device type, and browsing behavior." /></ListItem>
                <ListItem><ListItemText primary="Optional personal information you may provide." /></ListItem>
              </List>
              <Divider sx={{ my: 4 }} />

              {/* 2 */}
              <Typography
                id="section2"
                variant="h5"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <User size={28} color="#2196F3" /> 2. How We Use Your Data
              </Typography>
              <Typography paragraph>
                We use your data to analyze submitted images using our AI model (DenseNet-121),
                improve diagnostic accuracy, and provide better user experience and insights.
              </Typography>
              <Divider sx={{ my: 4 }} />

              {/* 3 */}
              <Typography
                id="section3"
                variant="h5"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <CloudCheck size={28} color="#9C27B0" /> 3. Data Sharing & Disclosure
              </Typography>
              <Typography paragraph>
                We do not sell or share your data with third parties except:
              </Typography>
              <List>
                <ListItem><ListItemText primary="To comply with legal obligations." /></ListItem>
                <ListItem><ListItemText primary="With trusted partners providing secure cloud storage or analytics." /></ListItem>
              </List>
              <Divider sx={{ my: 4 }} />

              {/* 4 */}
              <Typography
                id="section4"
                variant="h5"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <LockKey size={28} color="#FF9800" /> 4. Data Storage & Security
              </Typography>
              <List>
                <ListItem><ListItemText primary="Uploaded images and data are securely stored on encrypted servers." /></ListItem>
                <ListItem><ListItemText primary="We implement strong technical and organizational measures to prevent unauthorized access." /></ListItem>
              </List>
              <Divider sx={{ my: 4 }} />

              {/* 5 */}
              <Typography
                id="section5"
                variant="h5"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <User size={28} color="#673AB7" /> 5. Your Rights
              </Typography>
              <List>
                <ListItem><ListItemText primary="You may request deletion of your uploaded data." /></ListItem>
                <ListItem><ListItemText primary="You can withdraw consent at any time." /></ListItem>
                <ListItem><ListItemText primary="You may request access or corrections to your data." /></ListItem>
              </List>
              <Divider sx={{ my: 4 }} />

              {/* 6 */}
              <Typography
                id="section6"
                variant="h5"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <CloudCheck size={28} color="#03A9F4" /> 6. Third-Party Services
              </Typography>
              <Typography paragraph>
                Our service may rely on third-party platforms for analytics, hosting, or storage. 
                We recommend reviewing their privacy policies for additional details.
              </Typography>
              <Divider sx={{ my: 4 }} />

              {/* 7 */}
              <Typography
                id="section7"
                variant="h5"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Warning size={28} color="#F44336" /> 7. Children’s Privacy
              </Typography>
              <Typography paragraph>
                This service is not intended for individuals under 18. 
                We do not knowingly collect data from minors.
              </Typography>
              <Divider sx={{ my: 4 }} />

              {/* 8 */}
              <Typography
                id="section8"
                variant="h5"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <ArrowsClockwise size={28} color="#FF5722" /> 8. Changes to This Policy
              </Typography>
              <Typography paragraph>
                We may update this Privacy Policy periodically. 
                The most recent version will always be available on this page.
              </Typography>
              <Divider sx={{ my: 4 }} />

              {/* 9 */}
              <Typography
                id="section9"
                variant="h5"
                gutterBottom
                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
              >
                <Phone size={28} color="#009688" /> 9. How to Contact Us
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon><Envelope size={22} color="#673AB7" /></ListItemIcon>
                  <ListItemText primary="support@dermaai.com" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Phone size={22} color="#009688" /></ListItemIcon>
                  <ListItemText primary="+1 (555) 123-4567" />
                </ListItem>
                <ListItem>
                  <ListItemIcon><MapPin size={22} color="#E91E63" /></ListItemIcon>
                  <ListItemText primary="123 Medical Plaza, Suite 456, San Francisco, CA 94102" />
                </ListItem>
              </List>

            </Box>
          </Container>
        </Container>
      </Box>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
