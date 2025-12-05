import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import SectionTitle from "../components/research/SectionTitle";
import ReferenceItem from "../components/research/ReferenceItem";

import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
} from "@mui/material";

import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

// Sample images with labels
const sampleImages = [
  { src: "/sample1.jpg", label: "Melanoma" },
  { src: "/sample2.jpg", label: "NV (Melanocytic Nevus)" },
  { src: "/sample3.jpg", label: "BCC (Basal Cell Carcinoma)" },
  { src: "/sample4.jpg", label: "AKIEC" },
  { src: "/sample5.jpg", label: "BKL" },
  { src: "/sample6.jpg", label: "VASC" },
];

const ScientificResearch: React.FC = () => {
  return (
    <Box sx={{ bgcolor: "#fafafa" }}>
      <Navbar />

      {/* HEADER SECTION */}
      <Box
        sx={{
          background: "linear-gradient(135deg,#2563EB 0%,#1E40AF 100%)",
          py: 8,
          borderBottom: "1px solid #e0e0e0",
        }}
      >
        <Container maxWidth="md">
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Scientific Research Behind DERMAAI
          </Typography>

          <Typography variant="h6" color="text.secondary">
            Evidence-based evaluation of skin lesions, grounded in dermatology research.
          </Typography>
        </Container>
      </Box>

      <Container maxWidth="lg" sx={{ py: 6 }}>
        
        {/* INTRODUCTION */}
        <SectionTitle title="Introduction" />
        <Typography variant="body1" sx={{ mb: 4 }} color="text.secondary">
          DERMAAI is designed to help users better understand their skin health by examining dermoscopic images of skin lesions.
          The system follows principles from peer-reviewed dermatology research to highlight visual patterns that may require
          further medical attention. It is not a diagnosis tool but a supportive educational resource.
        </Typography>

        {/* DATASET SECTION */}
        <SectionTitle title="HAM10000 Dataset" />
        <Card sx={{ mb: 5 }}>
          <CardContent>
            <Typography variant="body1" color="text.secondary">
              The HAM10000 (<b>Human Against Machine with 10,000 images</b>) dataset contains 
              <b> 10,015 dermatoscopic images</b> across seven categories of common skin lesions.
              It is one of the most widely used datasets for dermatology education and research.
            </Typography>

            {/* Dataset chips */}
            <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
              <Chip label="Melanoma" color="error" />
              <Chip label="NV (Melanocytic Nevus)" />
              <Chip label="BCC" color="error" />
              <Chip label="AKIEC" color="warning" />
              <Chip label="BKL" />
              <Chip label="DF" />
              <Chip label="VASC" />
            </Box>
          </CardContent>
        </Card>

        {/* SAMPLE IMAGE GRID */}
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Sample Dermoscopic Images
        </Typography>

        <Grid container spacing={2} sx={{ mb: 5 }}>
          {sampleImages.map((item, i) => (
            <Grid item xs={6} sm={4} md={2} key={i} sx={{ textAlign: "center" }}>
              <Box
                component="img"
                src={item.src}
                alt={item.label}
                sx={{
                  width: "100%",
                  height: 120,
                  objectFit: "cover",
                  borderRadius: 2,
                  mb: 1,
                }}
              />
              <Typography variant="body2" color="text.secondary">
                {item.label}
              </Typography>
            </Grid>
          ))}
        </Grid>

        {/* IMAGE ANALYSIS PIPELINE */}
        <SectionTitle title="How DERMAAI Evaluates Images" />

        <Accordion sx={{ mb: 3 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">1. Image Preparation</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">
              Before evaluation, your image is prepared to ensure clarity and consistency:
              <br />• Brightness and color are balanced  
              <br />• The lesion is centered  
              <br />• Shadows and uneven lighting are minimized  
              <br />These steps help the system view the lesion as clearly as possible.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 3 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">2. Visual Feature Examination</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">
              DERMAAI examines key visual traits commonly assessed in dermatology:
              <br />• Shape and border clarity  
              <br />• Color variations  
              <br />• Texture and pattern differences  
              <br />• Symmetry  
              These characteristics help indicate whether a lesion looks typical or unusual.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 3 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">3. Pattern Comparison</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">
              The system compares the visual features of the lesion with patterns found in a large collection
              of dermatological images. This helps highlight features that may require attention or appear
              consistent with common benign lesions.
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ mb: 5 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography fontWeight="bold">4. Quality & Clarity Check</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography color="text.secondary">
              To ensure safety and reliability, DERMAAI checks whether:
              <br />• The image is clear enough  
              <br />• The lesion is fully visible  
              <br />• Lighting and focus are acceptable  
              <br />
              
            </Typography>
          </AccordionDetails>
        </Accordion>

        {/* REFERENCES */}
        <SectionTitle title="Scientific References" />
        <Box sx={{ mb: 5 }}>
          <ReferenceItem
            text="Tschandl, P., Rosendahl, C., & Kittler, H. (2018). The HAM10000 dataset, a large collection of multi-source dermatoscopic images of common pigmented skin lesions. *Scientific Data*."
            url="https://www.nature.com/articles/sdata2018161"
          />
          <ReferenceItem
            text="Esteva, A. et al. (2017). Dermatologist-level classification of skin cancer with deep neural networks. *Nature*."
            url="https://www.nature.com/articles/nature21056"
          />
          <ReferenceItem
            text="Haenssle, H. A., et al. (2018). Man against machine: diagnostic performance of AI in melanoma recognition. *PubMed*."
            url="https://pubmed.ncbi.nlm.nih.gov/29846502/"
          />
          <ReferenceItem
            text="Huang, G., Liu, Z., Van Der Maaten, L., & Weinberger, K. (2017). Densely Connected Convolutional Networks. *CVPR*."
            url="https://arxiv.org/pdf/1608.06993"
          />
          <ReferenceItem
            text="Skin Cancer Foundation. Skin Cancer Information."
            url="https://www.skincancer.org/skin-cancer-information/"
          />  
        </Box>

        
      </Container>

      <Footer />
    </Box>
  );
};

export default ScientificResearch;
