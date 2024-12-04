import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { GlassBG, MyHeading } from "../../components/custom";
import Personal from "./Details/Personal";

const Registration = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "94%",
        display: "flex",
        justifyContent: "center",
        // alignItems: "center",
      }}
    >
      <Personal />
      <Personal />
      <Personal />
      <Personal />
    </Box>
  );
};

export default Registration;
