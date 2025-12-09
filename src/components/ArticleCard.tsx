import React from "react";
import { 
  Card, 
  CardMedia, 
  CardContent, 
  Typography, 
  Chip, 
  Box,
  Accordion, 
  AccordionSummary, 
  AccordionDetails 
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

interface ArticleCardProps {
  title: string;
  description: string;
  image: string;
  tag: string;
  date: string;
  source: string;
  sourceLink: string;
  moreInfo?: React.ReactNode; // optional extra details for Accordion
}

const ArticleCard: React.FC<ArticleCardProps> = ({
  title,
  description,
  image,
  tag,
  date,
  source,
  sourceLink,
  moreInfo,
}) => {
  return (
    <Card
      sx={{
        borderRadius: 4,
        overflow: "hidden",
        boxShadow: "0 6px 20px rgba(0,0,0,0.07)",
        transition: "0.3s",
        "&:hover": { transform: "translateY(-6px)" },
      }}
    >
      <CardMedia component="img" height="250" image={image} alt={title} />

      <CardContent>
        <Chip label={tag} color="primary" size="small" sx={{ mb: 1 }} />

        <Typography variant="h6" fontWeight={700}>
          {title}
        </Typography>

        <Typography variant="body2" sx={{ mt: 1, color: "text.secondary" }}>
          {description}
        </Typography>

        {/* -------- Accordion directly below description -------- */}
        {moreInfo && (
          <Accordion sx={{ mt: 2 }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                Read More
              </Typography>
            </AccordionSummary>
            <AccordionDetails>{moreInfo}</AccordionDetails>
          </Accordion>
        )}
        {/* ------------------------------------------------------- */}

        {/* -------- Source • Date + Original Source (Right) -------- */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Typography variant="caption" sx={{ color: "gray" }}>
            {source} • {date}
          </Typography>

          <a
            href={sourceLink}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              color: "#1E40AF",
              textDecoration: "underline",
              fontWeight: 500,
              fontSize: "0.75rem",
            }}
          >
            Read Original Source
          </a>
        </Box>
        {/* ------------------------------------------------------- */}
      </CardContent>
    </Card>
  );
};

export default ArticleCard;
