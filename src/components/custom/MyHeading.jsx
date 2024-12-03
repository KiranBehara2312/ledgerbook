import { Typography } from "@mui/material";
import React from "react";

const MyHeading = ({
  variant = "h5",
  text = "Default Heading",
  alignCenter = false,
  sx = {}
}) => {
  return (
    <Typography variant={variant} className={alignCenter ? "alignCenter" : ""} sx={sx}>
      {text}
    </Typography>
  );
};

export default MyHeading;
