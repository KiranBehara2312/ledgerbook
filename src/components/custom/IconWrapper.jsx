import { useTheme } from "@mui/material";
import React from "react";

const IconWrapper = ({ icon = null, color = null, defaultColor = false }) => {
  const theme = useTheme();
  let elseColor = defaultColor ? theme.palette.primary.main : "gray";
  return <div style={{ color: color != null ? color : elseColor }}>{icon}</div>;
};

export default IconWrapper;
