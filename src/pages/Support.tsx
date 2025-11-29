import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Collapse,
  IconButton,
  Button
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Support() {
  const [openCard, setOpenCard] = useState<number | null>(null);

  const toggleCard = (index: number) => {
    setOpenCard(openCard === index ? null : index);
  };

  return (
    <Box sx={{ bgcolor: "background.default", minHeight: "100vh" }}>
      {/* NAVBAR */}
      <Navbar />

      {/* HERO SECTION */}
      <Box
        sx={{
          bgcolor: "#2563EB", // Blue background
          color: "#fff",
          py: 8,
          textAlign: "center"
        }}
      >
        <Typography variant="h4" fontWeight={700} sx={{ mb: 2 }}>
          Our Team Is Here To Support You
        </Typography>
        <Typography variant="h6" sx={{ mb: 4 }}>
          Get in touch with us for any questions or guidance
        </Typography>
        <Button
          variant="contained"
          sx={{
            bgcolor: "#fff",
            color: "#2563EB",
            fontWeight: 600,
            "&:hover": { bgcolor: "#f3f3f3" }
          }}
        >
          Contact Support
        </Button>
      </Box>

      {/* SUPPORT CARDS */}
      <Box sx={{ p: 4, maxWidth: "900px", mx: "auto" }}>
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ mb: 4, textAlign: "center" }}
        >
          Support
        </Typography>

        <Grid container spacing={3}>
          {/* Card 1 - How to Use the Website */}
          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: 2,
                transition: "0.3s",
                "&:hover": { boxShadow: 6 }
              }}
            >
              <CardContent
                sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                onClick={() => toggleCard(0)}
              >
                <Typography variant="h6" fontWeight={600} sx={{ flexGrow: 1 }}>
                  How to Use the Website
                </Typography>
                <IconButton>
                  <ExpandMoreIcon
                    sx={{
                      transform: openCard === 0 ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "0.3s"
                    }}
                  />
                </IconButton>
              </CardContent>
              <Collapse in={openCard === 0}>
                <CardContent sx={{ pt: 0 }}>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    Follow these steps to use the lesion analysis tool:
                  </Typography>
                  <Typography variant="body2" sx={{ ml: 2 }}>
                    1. Go to the Upload Image page. <br />
                    2. Select a clear dermoscopic image from your device (.jpg, .jpeg, or .png). <br />
                    3. Click <strong>Analyze image</strong>. <br />
                    4. The model will process the image and return a predicted class with a confidence score.
                  </Typography>
                  <Typography variant="body1" sx={{ mt: 2, fontWeight: 600 }}>
                    Note:
                  </Typography>
                  <Typography variant="body2">
                    The system works best with high-quality dermoscopic images. 
                    Normal phone camera photos may produce inaccurate results.
                  </Typography>
                </CardContent>
              </Collapse>
            </Card>
          </Grid>

          {/* Card 2 – FAQ */}
          <Grid item xs={12}>
            <Card
              sx={{
                borderRadius: 2,
                transition: "0.3s",
                "&:hover": { boxShadow: 6 }
              }}
            >
              <CardContent
                sx={{ cursor: "pointer", display: "flex", alignItems: "center" }}
                onClick={() => toggleCard(1)}
              >
                <Typography variant="h6" fontWeight={600} sx={{ flexGrow: 1 }}>
                  Frequently Asked Questions (FAQ)
                </Typography>
                <IconButton>
                  <ExpandMoreIcon
                    sx={{
                      transform: openCard === 1 ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "0.3s"
                    }}
                  />
                </IconButton>
              </CardContent>
              <Collapse in={openCard === 1}>
                <CardContent sx={{ pt: 0 }}>
                  {/* FAQ Content */}
                  <Typography variant="body1" fontWeight={600}>
                    Q1: What type of images work best?
                  </Typography>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    High-resolution dermoscopic images...
                  </Typography>
                  {/* Continue FAQ items here */}
                </CardContent>
              </Collapse>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* FOOTER */}
      <Footer />
    </Box>
  );
}
