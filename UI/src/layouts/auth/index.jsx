import React from "react";
import BaseLayout from "../base";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import HospitalSVG from "../../assets/svg/hospital.svg";
import BedSvg from "../../assets/svg/bed.svg";
import AmbulanceSvg from "../../assets/svg/ambulance.svg";
import Tablets from "../../assets/svg/tablets.svg";
import StethSvg from "../../assets/svg/steth.svg";
import FirstAid from "../../assets/svg/firstAid.svg";
import Nurse from "../../assets/svg/nurse.svg";

const AuthLayout = () => {
  return (
    <BaseLayout>
      {/* <Box
        sx={{
          width: "100%",
          height: "100%",
          position: "absolute",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img src={StethSvg} alt="Steth" width={320} height={220} />
      </Box> */}
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
              width: 75,
              height: 75,
              position: "absolute",
              top: 30,
              left: 50,
            }}
          />
          <img
            src={Nurse}
            alt="Hospital"
            style={{
              width: 75,
              height: 75,
              position: "absolute",
              bottom: 30,
              right: 50,
            }}
          />
          <img
            src={Tablets}
            alt="Hospital"
            style={{
              width: 75,
              height: 75,
              position: "absolute",
              top: 30,
              right: 50,
            }}
          />
          <img
            src={FirstAid}
            alt="Ambulance"
            width={75}
            height={75}
            style={{
              position: "absolute",
              bottom: 30,
              left: 50,
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
