import { useEffect, useState } from "react";
import "./App.css";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material";
import useCustomTheme from "./hooks/useCustomTheme";

function App() {
  const [colorScheme, setColorScheme] = useState("dark");
   const customTheme = useCustomTheme();
  const theme = createTheme({
    palette: {
      mode: colorScheme, // 'light' or 'dark'
      primary: {
        main: colorScheme === "light" ? "#1976d2" : "#90caf9",
      },
      background: {
        default: colorScheme === "light" ? "#fff" : "#121212bd",
      },
    },
    typography: {
      fontFamily: "Arial, sans-serif",
    },
  });
  return (
    <>
      <ThemeProvider theme={customTheme}>
        <BrowserRouter>
          <AppRoutes />
          <ToastContainer />
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
