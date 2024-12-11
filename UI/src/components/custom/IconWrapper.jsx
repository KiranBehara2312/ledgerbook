import { useTheme } from "@mui/material";
import React from "react";

const IconWrapper = ({ icon = null }) => {
  const theme = useTheme();
  return <div style={{ color: theme.palette.primary.main }}>{icon}</div>;
};

export default IconWrapper;
