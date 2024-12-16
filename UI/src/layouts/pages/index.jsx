import React from "react";
import BaseLayout from "../base";
import { Outlet } from "react-router-dom";
import MyHeader from "../../components/shared/MyHeader";
import { Box } from "@mui/material";

const PagesLayout = () => {
  return (
    <BaseLayout>
      <MyHeader />
      <Box sx={{ p: 0.5 }}>
        <Outlet />
      </Box>
    </BaseLayout>
  );
};

export default PagesLayout;
