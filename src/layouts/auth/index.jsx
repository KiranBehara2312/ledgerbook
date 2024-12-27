import React from "react";
import BaseLayout from "../base";
import { Outlet } from "react-router-dom";
import { Box, useMediaQuery } from "@mui/material";
import LoginImageSvg from "../../assets/finance/loginImage.svg";
import { GlassBG } from "../../components/custom";

const AuthLayout = () => {
  const matches = useMediaQuery((theme) => theme.breakpoints.down("md"));
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
            flexWrap: matches ? "wrap-reverse" : "",
            justifyContent: "center",
            gap: 1,
          }}
        >
          <GlassBG
            cardStyles={{ width: matches ? "100%" : "280px", height: "180px" }}
          >
            <img
              src={LoginImageSvg}
              alt="Hospital"
              width={matches ? "100%" : "280px"}
              height={180}
            />
          </GlassBG>
          <Box>
            <Outlet />
          </Box>
        </Box>
      </Box>
    </BaseLayout>
  );
};

export default AuthLayout;
