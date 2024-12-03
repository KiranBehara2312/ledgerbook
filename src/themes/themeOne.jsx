import React from "react";
import { createTheme, ThemeProvider, Typography, Button } from "@mui/material";

// Create a custom theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Custom primary color
    },
    secondary: {
      main: "#ff4081", // Custom secondary color
    },
    background: {
      default: "#f4f4f4", // Background color
    },
    text: {
      primary: "#333333", // Primary text color
      secondary: "#757575", // Secondary text color
    },
  },
  typography: {
    fontFamily: '"Roboto", sans-serif', // Default font family
    h1: {
      fontSize: "2rem", // Custom font size for h1
      fontWeight: 700, // Custom font weight
    },
    body1: {
      fontSize: "1rem",
      color: "#555555", // Custom color for body text
    },
  },
  spacing: 8, // 1 spacing unit = 4px
  shape: {
    borderRadius: 8, // Custom border radius for components
  },
  components: {
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontSize: "11px",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "capitalize",
        },
      },
    },
  },
});

export default theme;
