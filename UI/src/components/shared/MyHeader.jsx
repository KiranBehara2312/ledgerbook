import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  Box,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  Divider,
} from "@mui/material";
import { MdAccountCircle, MdMenu } from "react-icons/md";
import { META } from "../../constants/projects";
import { MENU_ITEMS } from "../../constants/Menu/MenuItems";
import { useNavigate } from "react-router-dom";
import { IoLogOutSharp } from "react-icons/io5";
import useConfirmation from "../../hooks/useConfirmation";
import IconWrapper from "../custom/IconWrapper";
import HospitalDetailsLogo from "./HospitalDetailsLogo";

const MyHeader = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const { DialogComponent, openDialog } = useConfirmation();

  const logoutHanlder = () => {
    navigate("/auth/login");
    localStorage.removeItem("authToken");
  };

  const DrawerList = (
    <Box
      sx={{ width: 250, display: "flex", flexDirection: "column" }}
      role="presentation"
      onClick={() => setOpen(false)}
    >
      <Box sx={{m:1}}>
      <HospitalDetailsLogo />
      </Box>
      <Divider />

      <List sx={{ height: "calc(98.8vh - 125px)", overflowY: "auto" }}>
        {MENU_ITEMS.map(({ label, icon, url }, index) => (
          <ListItem
            key={label}
            disablePadding
            onClick={() => routeChangeHandler(url)}
          >
            <ListItemButton>
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <ListItem
        disablePadding
        onClick={() =>
          openDialog("Are you sure you want to logout?", logoutHanlder)
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <IconWrapper icon={<IoLogOutSharp size={20} />} />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItemButton>
      </ListItem>
    </Box>
  );

  const routeChangeHandler = (url) => {
    navigate(url);
  };
  return (
    <>
      <AppBar position="static" sx={{ height: "40px" }}>
        <Toolbar sx={{ minHeight: "40px !important", height: "40px" }}>
          <MdMenu
            size={30}
            style={{
              paddingRight: "15px",
              marginLeft: "-10px",
              cursor: "pointer",
            }}
            onClick={() => setOpen(true)}
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            {META.PROJECT_TITLE}
          </Typography>

          <IconButton color="inherit">
            <MdAccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={() => setOpen(false)}>
        {DrawerList}
      </Drawer>
      {DialogComponent}
    </>
  );
};

export default MyHeader;
