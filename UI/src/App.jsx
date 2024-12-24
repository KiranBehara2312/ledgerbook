import { useEffect, useState } from "react";
import "./App.css";
import AppRoutes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createTheme, ThemeProvider } from "@mui/material";
import useCustomTheme from "./hooks/useCustomTheme";
import { useSelector } from "react-redux";

function App() {
  const [colorScheme, setColorScheme] = useState("light");
  const loggedInUser = useSelector((state) => state.userDetails.user);
  const customTheme = useCustomTheme(colorScheme, loggedInUser?.colorTheme);
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
