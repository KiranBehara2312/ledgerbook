import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, Drawer } from "@mui/material";
import { MdAccountCircle, MdMenu } from "react-icons/md";

const MyHeader = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <AppBar position="static" sx={{ height: "40px" }}>
        <Toolbar sx={{ minHeight: "40px !important", height: "40px" }}>
          <MdMenu
            size={30}
            style={{ paddingRight: "15px", marginLeft: "-10px" }}
            onClick={() => setOpen(true )}
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            My Application
          </Typography>

          <IconButton color="inherit">
            <MdAccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={() => setOpen(false)}>
        {/* {DrawerList} */}ssf
      </Drawer>
    </>
  );
};

export default MyHeader;
