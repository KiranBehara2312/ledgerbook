import React, { useEffect, useState } from "react";
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
  useTheme,
  alpha,
  Popover,
  Button,
} from "@mui/material";
import { MdAccountCircle, MdMenu } from "react-icons/md";
import { META } from "../../constants/projects";
import { MENU_ITEMS } from "../../constants/Menu/MenuItems";
import { useNavigate } from "react-router-dom";
import { IoLogOutSharp } from "react-icons/io5";
import useConfirmation from "../../hooks/useConfirmation";
import IconWrapper from "../custom/IconWrapper";
import HospitalDetailsLogo from "./HospitalDetailsLogo";
import { useDispatch, useSelector } from "react-redux";
import { emptyUserDetails } from "../../redux/slices/userDetailsSlice";
import { FaUserAlt } from "react-icons/fa";
import MyHeading from "../custom/MyHeading";
import { FaUserDoctor } from "react-icons/fa6";

const MyHeader = () => {
  const loggedInUser = useSelector((state) => state.userDetails.user);
  const [open, setOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [selectedMenuItem, setSelectedMenuItem] = useState("");
  const { DialogComponent, openDialog } = useConfirmation();

  const logoutHanlder = () => {
    navigate("/auth/login");
    dispatch(emptyUserDetails());
    localStorage.removeItem("authToken");
  };

  useEffect(() => {
    const currentURL = window.location.pathname.split("/pages/")[1];
    setSelectedMenuItem(currentURL);
  }, []);

  const DrawerList = (
    <Box
      sx={{ width: 250, display: "flex", flexDirection: "column" }}
      role="presentation"
      onClick={() => setOpen(false)}
    >
      <Box sx={{ m: 1 }}>
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
            <ListItemButton
              sx={{
                background:
                  selectedMenuItem === url
                    ? alpha(theme.palette.primary.main, 0.2)
                    : "",
              }}
            >
              <ListItemIcon>
                <IconWrapper
                  icon={icon}
                  color={
                    selectedMenuItem === url ? theme.palette.primary.main : null
                  }
                />
              </ListItemIcon>
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
            <IconWrapper
              icon={
                <IoLogOutSharp size={20} color={theme.palette.primary.main} />
              }
            />
          </ListItemIcon>
          <ListItemText primary={"Logout"} />
        </ListItemButton>
      </ListItem>
    </Box>
  );

  const routeChangeHandler = (url) => {
    navigate(url);
    setSelectedMenuItem(url);
  };

  const accountClickHandler = (event) => {
    setAnchorEl(event.currentTarget);
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

          <IconButton color="inherit" onClick={accountClickHandler}>
            <MdAccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer open={open} onClose={() => setOpen(false)}>
        {DrawerList}
      </Drawer>
      {DialogComponent}

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box
          sx={{
            m: 1,
            pt: 2,
            minWidth: "250px",
          }}
        >
          <MyHeading
            alignCenter
            text={
              <IconWrapper
                icon={
                  loggedInUser?.role === "STAFF" ? (
                    <FaUserAlt size={75} />
                  ) : (
                    <FaUserDoctor size={75} />
                  )
                }
                color={theme.palette.primary.main}
              />
            }
          />
          <MyHeading
            alignCenter
            sx={{ pt: 1 }}
            variant="h6"
            text={`${loggedInUser?.role === "DOCTOR" ? "Dr." : ""} ${
              loggedInUser?.firstName
            } ${loggedInUser?.lastName}`}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", pt: 2 }}>
            <MyHeading alignCenter variant="caption" text={"User Name"} />
            <MyHeading
              alignCenter
              variant="caption"
              text={loggedInUser?.userName}
            />
          </Box>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", pt: 0.5 }}
          >
            <MyHeading alignCenter variant="caption" text={"Role"} />
            <MyHeading
              alignCenter
              variant="caption"
              text={loggedInUser?.role}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              pt: 0.5,
              pb: 1,
            }}
          >
            <MyHeading alignCenter variant="caption" text={"Last Login at"} />
            <MyHeading alignCenter variant="caption" text={loggedInUser?.iat} />
          </Box>
          <Divider />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              pt: 1,
              cursor: "pointer",
            }}
          >
            <Button
              variant="text"
              fullWidth
              size="small"
              onClick={() =>
                openDialog("Are you sure you want to logout?", logoutHanlder)
              }
            >
              <IconWrapper
                icon={
                  <IoLogOutSharp
                    size={20}
                    style={{ paddingRight: "10px" }}
                    color={theme.palette.primary.main}
                  />
                }
              />
              Logout
            </Button>
          </Box>
        </Box>
      </Popover>
    </>
  );
};

export default MyHeader;
