import { Box } from "@mui/material";
import "./base.css";

const BaseLayout = ({ children }) => {
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflowY: "hidden",
        overflowX: "auto",
      }}
    >
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      {children}
    </Box>
  );
};

export default BaseLayout;
