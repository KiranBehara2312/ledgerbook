import { Box, Typography } from "@mui/material";
import React from "react";
import HospitalLogo from "../../assets/hospital/logo.png";
import MyHeading from "../custom/MyHeading";

const HOSPITAL_NAME = "Ujjwal Hopitals";

const HospitalDetailsLogo = () => {
  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        gap: 1,
      }}
    >
      <img
        src={HospitalLogo}
        alt="Hospital"
        style={{
          width: 50,
          height: 50,
        }}
      />
      <MyHeading text={HOSPITAL_NAME} variant="body1" />
    </Box>
  );
};

export default HospitalDetailsLogo;
