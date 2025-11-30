import React, { useState, useMemo } from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  Button,
  TextField,
  Divider,
  Avatar,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Support() {

  //State handlers
  
  const [contactOpen, setContactOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
  const [feedback, setFeedback] = useState<number | null>(null);

  //Support content sections

  const SECTIONS = useMemo(
    () => [
      //Section: How to use the website
      {
        id: "how-to",
        title: "How to use the website",
        icon: <HelpOutlineIcon />,
        body: (
          <>
            <Typography sx={{ mb: 1 }}>1. Go to the image upload section of the website.</Typography>
            <Typography sx={{ mb: 1 }}>2. Select a clear dermoscopic image (.jpg, .jpeg, .png).</Typography>
            <Typography sx={{ mb: 1 }}>
              3. Click <strong>Analyze image</strong> and wait for the result.
            </Typography>
            <Typography sx={{ mb: 3 }}>
              4. The system will return a predicted lesion class and a confidence score.
            </Typography>

            <Typography sx={{ mb: 1 }}>
              <strong>Note:</strong>
            </Typography>
            <Typography sx={{ mb: 1 }}>
              The system works best with high quality <strong>dermoscopic images.</strong> Normal phone camera
              photos may produce inaccurate results.
            </Typography>
          </>
        ),
      },

      //Section: Troubleshooting
      {
        id: "troubleshooting",
        title: "Troubleshooting",
        icon: <ErrorOutlineIcon />,
        body: (
          <>
            <Typography sx={{ fontWeight: 600 }}>Image won't upload?</Typography>
            <Typography sx={{ mb: 1 }}>• Check file format and size. Use JPG/PNG under 10MB.</Typography>
            <Typography sx={{ fontWeight: 600 }}>Slow processing / timeout</Typography>
            <Typography sx={{ mb: 1 }}>• Try a high-quality dermoscopic image and ensure a stable connection.</Typography>
            <Typography sx={{ fontWeight: 600 }}>Prediction seems wrong</Typography>
            <Typography>• Causes include poor image quality or model limitations.</Typography>
          </>
        ),
      },

      //Section: Upload Guidelines
      {
        id: "upload-guidelines",
        title: "Upload guidelines",
        icon: <InfoOutlinedIcon />,
        body: (
          <>
            <Typography sx={{ mb: 1 }}>• Use dermoscopic images when possible.</Typography>
            <Typography sx={{ mb: 1 }}>• Ensure lesion is centered and in-focus.</Typography>
          </>
        ),
      },

      //Section: Privacy Information
      {
        id: "privacy",
        title: "Privacy & data retention",
        icon: <SecurityOutlinedIcon />,
        body: (
          <>
            <Typography sx={{ mb: 1 }}>
              Uploaded images are securely stored and visible only to you. They are not used for training.
            </Typography>
            <Typography sx={{ mb: 1 }}>
              You can delete your uploaded images or request removal through support.
            </Typography>
          </>
        ),
      },

      //Section: Medical Disclaimer
      {
        id: "disclaimer",
        title: "Medical disclaimer",
        icon: <InfoOutlinedIcon />,
        body: (
          <>
            <Typography sx={{ mb: 1, fontWeight: 700 }}>Important</Typography>
            <Typography>
              This tool provides AI-generated information for educational and research purposes only.
            </Typography>
          </>
        ),
      },

      //Section: Model Details
      {
        id: "model",
        title: "About the AI model",
        icon: <CheckCircleOutlineIcon />,
        body: (
          <>
            <Typography sx={{ mb: 1 }}>• Trained on the HAM10000 dermoscopic dataset.</Typography>
            <Typography sx={{ mb: 1 }}>• Produces class predictions with confidence scores.</Typography>
            <Typography sx={{ mb: 1 }}>• Limitations include domain shift, image quality, and imbalanced classes.</Typography>
          </>
        ),
      },
    ],
    []
  );

  // FAQ data
  const FAQ = [
    { q: "What type of images work best?", a: "High-resolution dermoscopic images." },
    { q: "Is my image saved?", a: "Images are securely stored and never used for training." },
    { q: "Why is prediction sometimes wrong?", a: "Image quality and model limitations." },
  ];


  //Support contact form handler
  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setContactOpen(false);

    //Show notification after form submission
    setSnackbar({ open: true, message: "Message sent — we'll respond within 48 hours.", severity: "success" });
  }

  //Hover UI styles
  const hoverPaper = {
    transition: "transform 0.2s, box-shadow 0.2s",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: 6,
    },
  };

  const hoverButton = {
    transition: "all 0.2s",
    "&:hover": {
      transform: "scale(1.05)",
    },
  };

  const hoverFAQ = {
    p: 1,
    borderRadius: 1,
    transition: "all 0.2s",
    "&:hover": {
      backgroundColor: "action.hover",
      transform: "translateY(-2px)",
    },
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      <Navbar />

      {/* HERO SECTION */}
      <Box
        sx={{
          background: "linear-gradient(135deg,#2563EB 0%,#1E40AF 100%)",
          color: "common.white",
          py: { xs: 6, md: 10 },
          textAlign: "center",
        }}
      >
        <Typography variant="h3" fontWeight={800} sx={{ mb: 1 }}>
          We're here to help
        </Typography>
        <Typography variant="h6" sx={{ mb: 3, maxWidth: 700, mx: "auto" }}>
          Find support, get guidance, and contact our team.
        </Typography>

        <Button
          variant="outlined"
          onClick={() => setContactOpen(true)}
          startIcon={<MailOutlineIcon />}
          sx={{ borderColor: "rgba(255,255,255,0.2)", color: "white", fontWeight: 700, ...hoverButton }}
        >
          Contact Support
        </Button>
      </Box>

      {/* MAIN CONTENT AREA */}
      <Box sx={{ maxWidth: 1100, mx: "auto", p: { xs: 2, md: 4 } }}>


        {/* PAGE LAYOUT GRID */}
        <Grid container spacing={3}>
          {/* LEFT COLUMN */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "grid", gap: 3 }}>

              {/* Main informational sections */}
              {["how-to", "privacy", "disclaimer"].map((id) => {
                const s = SECTIONS.find((sec) => sec.id === id)!;
                return (
                  <Paper key={id} sx={{ p: 2, borderRadius: 2, ...hoverPaper }} elevation={2}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "primary.main", width: 46, height: 46 }}>{s.icon}</Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={700}>
                          {s.title}
                        </Typography>
                        <Box sx={{ mt: 1 }}>{s.body}</Box>
                      </Box>
                    </Box>
                  </Paper>
                );
              })}

              {/* Was this page helpful? */}
              <Paper sx={{ p: 2, display: "flex", gap: 2, alignItems: "center", ...hoverPaper }} elevation={1}>
                <Typography sx={{ flex: 1 }}>Was this page helpful?</Typography>
                <Button variant={feedback === 1 ? "contained" : "outlined"} onClick={() => setFeedback(1)} {...hoverButton}>
                  Yes
                </Button>
                <Button variant={feedback === 0 ? "contained" : "outlined"} onClick={() => setFeedback(0)} {...hoverButton}>
                  No
                </Button>
              </Paper>

              {/* Contact Support */}
              <Paper sx={{ p: 2, borderRadius: 2, display: "flex", gap: 2, alignItems: "center", ...hoverPaper }} elevation={1}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" fontWeight={700}>
                    Contact Support
                  </Typography>
                  <Typography variant="body2">Have an issue? Send us a message.</Typography>
                </Box>
                <Button variant="contained" onClick={() => setContactOpen(true)} startIcon={<MailOutlineIcon />} {...hoverButton}>
                  Send Message
                </Button>
              </Paper>
            </Box>
          </Grid>

          {/* RIGHT COLUMN */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: "grid", gap: 3 }}>

              {/* Troubleshooting and Upload Guidelines */}
              {["troubleshooting", "upload-guidelines"].map((id) => {
                const s = SECTIONS.find((sec) => sec.id === id)!;
                return (
                  <Paper key={id} sx={{ p: 2, borderRadius: 2, ...hoverPaper }} elevation={2}>
                    <Box sx={{ display: "flex", gap: 2 }}>
                      <Avatar sx={{ bgcolor: "primary.main", width: 46, height: 46 }}>{s.icon}</Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight={700}>
                          {s.title}
                        </Typography>
                        <Box sx={{ mt: 1 }}>{s.body}</Box>
                      </Box>
                    </Box>
                  </Paper>
                );
              })}

              {/* FAQ Section */}
              <Paper sx={{ p: 2, borderRadius: 2 }} elevation={1}>
                <Typography variant="h6" fontWeight={700} sx={{ mb: 1 }}>
                  Frequently asked questions
                </Typography>
                <Divider sx={{ mb: 1 }} />

                { /* FAQ list */}
                {FAQ.map((f, i) => (
                    <Box key={i} sx={{ ...hoverFAQ, mb: 2 }}>
                      <Typography sx={{ fontWeight: 600 }}>{f.q}</Typography>
                      <Typography variant="body2">{f.a}</Typography>
                    </Box>
                  ))
                }
              </Paper>
            </Box>
          </Grid>
        </Grid>
      </Box>
      
      {/* Footer */}
      <Footer />

      {/* Contact Dialog Form */}
      <Dialog open={contactOpen} onClose={() => setContactOpen(false)} fullWidth maxWidth="sm">
        <DialogTitle>Contact Support</DialogTitle>
        <Box component="form" onSubmit={handleContactSubmit}>
          <DialogContent>
            <TextField required fullWidth label="Name" sx={{ mb: 2 }} />
            <TextField required fullWidth label="Email" type="email" sx={{ mb: 2 }} />
            <TextField required fullWidth label="Message" multiline rows={4} sx={{ mb: 2 }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setContactOpen(false)}>Cancel</Button>
            <Button type="submit" variant="contained">
              Send
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Snackbar notification  */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={4000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
      >
        <Alert severity={snackbar.severity} sx={{ width: "100%" }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
