import React from "react";
import { Typography, Divider } from "@mui/material";

interface SectionTitleProps {
  title: string;
}

const SectionTitle: React.FC<SectionTitleProps> = ({ title }) => (
  <>
    <Typography variant="h4" fontWeight="bold" sx={{ mb: 2, mt: 4 }}>
      {title}
    </Typography>
    <Divider sx={{ mb: 3 }} />
  </>
);

export default SectionTitle;
