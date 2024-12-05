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
} from "@mui/material";
import { MdAccountCircle, MdMenu } from "react-icons/md";
import { MENU_ITEMS } from "../../constants/MenuItems";
import { useNavigate } from "react-router-dom";

const MyHeader = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setOpen(false)}>
      <List>
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
      {/* <Divider /> */}
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
            style={{ paddingRight: "15px", marginLeft: "-10px" }}
            onClick={() => setOpen(true)}
          />
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            HIMS
          </Typography>

          <IconButton color="inherit">
            <MdAccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={() => setOpen(false)}>
        {DrawerList}
      </Drawer>
    </>
  );
};

export default MyHeader;
