import React from "react";
import { Typography } from "@mui/material";

interface ReferenceItemProps {
  text: string;
  url?: string;
}

const ReferenceItem: React.FC<ReferenceItemProps> = ({ text, url }) => (
  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
    • {url ? (
      <a href={url} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    ) : (
      text
    )}
  </Typography>
);

export default ReferenceItem;
