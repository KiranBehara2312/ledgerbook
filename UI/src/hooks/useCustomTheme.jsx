import { createTheme } from "@mui/material";

// Define your custom theme configuration
const p_main = "#0d8672";

const useCustomTheme = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: p_main,
      },
      secondary: {
        main: "#ff4081",
      },
      background: {
        default: "#f4f4f4",
      },
      text: {
        primary: "#333333",
        secondary: "#757575",
      },
    },
    typography: {
      fontFamily: '"Roboto", sans-serif',
      h1: {
        fontSize: "1.8rem",
        fontWeight: 700,
      },
      body1: {
        fontSize: "1rem",
        color: "#555555",
      },
    },
    spacing: 8,
    shape: {
      borderRadius: 8,
    },
    components: {
      MuiFormHelperText: {
        styleOverrides: {
          root: {
            fontSize: "11px",
            marginTop: "-1px",
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            fontWeight: "bold !important",
            fontSize: "14px",
          },
          root: {
            background: "transparent !important",
            fontSize: "13px",
          },
        },
      },
      MuiMenuItem: {
        styleOverrides: {
          root: {
            fontSize: "13px",
            "&.Mui-selected": {
              background: p_main,
              color: "white",
            },
            "&.Mui-selected:hover": {
              background: p_main,
              color: "white",
            },
            "&:hover": {
              background: p_main,
              color: "white",
            },
          },
        },
      },
      MuiDialogContent: {
        styleOverrides: {
          root: {
            padding: "0px !important",
          },
        },
      },
      MuiInputLabel: {
        styleOverrides: {
          root: {
            fontSize: "0.875rem",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          root: {
            height: "40px !important",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            margin: 4.5,
            "& .MuiInputBase-root": {
              fontSize: "0.875rem",
              padding: "0 0",
            },
            "& .MuiFormLabel-root": {
              fontSize: "0.875rem",
            },
          },
        },
        defaultProps: {
          size: "small",
          variant: "outlined",
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

  return theme;
};

export default useCustomTheme;
