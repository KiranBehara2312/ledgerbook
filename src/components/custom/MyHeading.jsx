import { Typography } from "@mui/material";
import React from "react";

const MyHeading = ({
  variant = "h5",
  text = "Default Heading",
  alignCenter = false,
}) => {
  return (
    <Typography variant={variant} className={alignCenter ? "alignCenter" : ""}>
      {text}
    </Typography>
  );
};

export default MyHeading;
