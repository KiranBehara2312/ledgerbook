import { Box, Paper } from "@mui/material";
import "./base.css";

const BaseLayout = ({ children }) => {
  return (
    <Paper
      sx={{
        height: "100vh",
        width: "100vw",
        overflowY: "hidden",
        overflowX: "auto",
      }}
    >
      {children}
    </Paper>
  );
};

export default BaseLayout;
