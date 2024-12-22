import React from "react";
import BaseLayout from "../base";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import HospitalSVG from "../../../public/hospital.svg";
import BedSvg from "../../../public/bed.svg";
import AmbulanceSvg from "../../../public/ambulance.svg";
import Tablets from "../../../public/tablets.svg";

const AuthLayout = () => {
  return (
    <BaseLayout>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 1,
          }}
        >
          <img src={HospitalSVG} alt="Hospital" width={300} height={280} />
          <img
            src={BedSvg}
            alt="Hospital"
            style={{
              width: 50,
              height: 50,
              position: "absolute",
              top: 20,
              left: 50,
            }}
          />
          <img
            src={Tablets}
            alt="Hospital"
            style={{
              width: 100,
              height: 100,
              position: "absolute",
              top: 100,
              right: 50,
            }}
          />
          <Outlet />
          <img src={AmbulanceSvg} alt="Ambulance" width={300} height={280} />
        </Box>
      </Box>
    </BaseLayout>
  );
};

export default AuthLayout;
