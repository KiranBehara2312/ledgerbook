import React, { useEffect } from "react";
import BaseLayout from "../base";
import { Outlet } from "react-router-dom";
import MyHeader from "../../components/shared/MyHeader";
import { Box } from "@mui/material";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/slices/userDetailsSlice";

const PagesLayout = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      localStorage.getItem("authToken") === null ||
      localStorage.getItem("authToken") === undefined ||
      localStorage.getItem("authToken") === ""
    ) {
      window.location.href = window.location.origin + "/auth/login";
    } else {
      dispatch(setUserDetails(localStorage.getItem("authToken")));
    }
  }, []);
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
