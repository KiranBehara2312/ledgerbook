import React from "react";
import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { MdAccountCircle } from "react-icons/md";

const MyHeader = () => {
  return (
    <AppBar position="static" sx={{ height: "40px" }}>
      <Toolbar sx={{ minHeight: "40px !important", height: "40px" }}>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          My Application
        </Typography>

        <IconButton color="inherit">
          <MdAccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default MyHeader;
