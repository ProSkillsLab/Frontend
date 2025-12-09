import React from "react";
import { Box, Typography, Grid, Container } from "@mui/material";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import ArticleCard from "../components/ArticleCard";

interface Article {
  id: number;
  title: string;
  description: string;
  image: string;
  tag: string;
  date: string;
  source: string;
  sourceLink: string;
  moreInfo?: React.ReactNode
}

const articles: Article[] = [
  {
    id: 1,
    title: "Anyone can get skin cancer",
    description:
      "Skin cancer can occur in anyone, regardless of skin color or age. Early detection is key, so check your skin regularly and see a doctor if you notice any changes.",
    image: "/article1.jpg",
    tag: "Skin Cancer",
    date: "July 1, 2024",
    source: "CDC",
    sourceLink: "https://www.cdc.gov/skin-cancer/risk-factors/index.html",
    moreInfo: (
      <Box>
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>
        Certain Factors increase the risk of skin cancer.Pay attention if you have: 
      </Typography>
      <ul>
        <li>Fair skin, light hair or light colored eyes.</li>
        <li>Skin that burns, freckles or reddens easily.</li>
        <li>A lot of moles or unusual moles.</li>
        <li>Personal or family history of skin cancer.</li>
        <li>Frequent sun burns or tanning.</li>
        <li>Older age.</li>  
      </ul> 
      </Box>
    )
  },
  {
    id: 2,
    title: "Enjoy the outdoors safely with Everyday sun Protection",
    description:
      "Sunscreen is a key part of a complete sun-safety routine. When used properly, it can reduce your risk of skin cancer and sun-related skin damage.",
    image: "/article2.jpg",
    tag: "Sun Care",
    date: "October 2025",
    source: "The Skin Cancer Foundation",
    sourceLink: "https://www.skincancer.org/skin-cancer-prevention/sun-protection/sunscreen/",
    moreInfo: (
      <Box>
        <Typography variant="subtitle2" fontWeight={700} gutterBottom>
          Why Sunscreen Matters
        </Typography>
        <ul>
          <li>Reduces skin cancer risk by blocking harmful UVA and UVB rays.</li>
          <li>Helps prevent sunburn, one of the major causes of long-term skin damage.</li>
          <li>Slows premature aging such as wrinkles, fine lines, and dark spots.</li>
          <li>Use broad-spectrum SPF 30+ daily; SPF 50+ for longer outdoor activity</li>
          <li>Apply 30 minutes before sun exposure and reapply every 2 hours.</li>
          <li>Don’t miss areas like ears, neck, scalp parting, feet, and hands.</li>
          <li>Works best when combined with shade, hats, clothing, and sunglasses.</li>
        </ul>
      </Box>
    )
  },
  {
    id: 3,
    title: "How to detect early symptoms of a skin cancer",
    description:
      "Skin cancer can often be treated successfully if detected early. Keep an eye on your skin for any unusual changes.",
    image: "/article3.jpg",
    tag: "Detection",
    date: "April 8, 2025",
    source: "Mayoclinic",
    sourceLink: "https://www.mayoclinic.org/diseases-conditions/skin-cancer/symptoms-causes/syc-20377605",
    moreInfo: (
      <Box>
      <Typography variant="subtitle2" fontWeight={700} gutterBottom>
        Early Symptoms to Watch For:
      </Typography>
      <ul>
        <li>New growths or bumps — even small spots, moles, or sores that don’t heal.</li>
        <li>Changes in existing moles or spots — size, shape, color, or texture changes.</li>
        <li>Rough, scaly, or discolored patches — areas that look different from the surrounding skin.</li>
        <li>Sores that bleed or crust over — or any lesion that doesn’t heal over time.</li>
        <li>Itching, tenderness, or pain — especially around a spot or mole.</li>
      </ul>

      <Typography variant="subtitle2" fontWeight={700} gutterBottom sx={{ mt: 1 }}>
        ✅ Self-Check Checklist
      </Typography>
      <ul>
        <li>Examine your entire body regularly, including scalp, ears, back, between toes, soles, and genitals.</li>
        <li>Note any new spots or changes in existing moles.</li>
        <li>Take photos to track changes over time.</li>
        <li>Visit a doctor or dermatologist if you notice anything suspicious.</li>
      </ul>
    </Box>
    ),
  },
  {
    id: 4,
    title: "Rising melanoma in Finland",
    description:
      "Melanoma is becoming more common in Finland, especially among young people who often underestimate sun risks. Up to 80% of cases could be prevented with proper UV protection, including sunscreen, clothing, and shade.",
    image: "/article4.jpg",
    tag: "Melanoma",
    date: "n.d.",
    source: "Syöpäjärjestöt",
    sourceLink: "https://www.syopajarjestot.fi/uutinen/melanoma-continues-to-become-more-common-in-finland-young-people-in-particular-do-not-consider-the-sun-to-be-a-health-risk/",
    moreInfo: (
      <Box>
        <ul>
          <li>In 2023, Finnish Cancer Registry reported 1,028 men and 811 women were diagnosed with Melanoma in Finland.</li>
          <li>Melanoma incidence in Finland has been growing rapidly — roughly 5% per year during the 2000s.</li>
          <li>It is estimated that with proper protection, about 80% (four out of five) melanoma cases could be prevented.</li>
          <li>Experts point out that regular sun exposure is not just vacations or sunbathing . It contributes significantly to risk, so shade, clothing and sunscreen are key for everyday outdoor activity</li>
          <li>Young people often underestimate long-term sun risks: in a recent study among 16–20-year-olds, many did not see skin cancer as something relevant to them and only protected themselves when they expected prolonged sun or had a past burn</li>
        </ul>
      </Box>
    )
  },
];

const ArticlesPage: React.FC = () => {
  return (
    <Box sx={{ width: "100%", minHeight: "100vh", backgroundColor: "#fafafa" }}>
      <Navbar />

      {/* Header Section */}
      <Box
        sx={{
          height: 280,
          backgroundImage: "linear-gradient(135deg,#2563EB 0%,#1E40AF 100%)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          variant="h3"
          sx={{ fontWeight: 700, color: "#fff", textShadow: "0 3px 6px rgba(0,0,0,0.5)" }}
        >
          Skin Health in Depth – Articles
        </Typography>
      </Box>

      {/* Intro Section */}
      <Container maxWidth="md" sx={{ mt: 6, mb: 6 }}>
        <Box
          sx={{
            backgroundColor: "#fff",
            borderRadius: 3,
            p: 5,
            boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h4" fontWeight={700} gutterBottom>
            Want to know more about skin health?
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Read scientific insights shared by dermatology experts. Learn how sun exposure, lifestyle, and prevention strategies impact long-term skin health.
          </Typography>
        </Box>
      </Container>

      {/* Articles Grid */}
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {articles.map((item) => (
            <Grid item xs={12} md={6} key={item.id}>
              <ArticleCard
                title={item.title}
                description={item.description}
                image={item.image}
                tag={item.tag}
                date={item.date}
                source={item.source}
                sourceLink={item.sourceLink}
                moreInfo={item.moreInfo}
              />
            </Grid>
          ))}
        </Grid>

        <Box height={50} />
      </Container>

      <Footer />
    </Box>
  );
};

export default ArticlesPage;
