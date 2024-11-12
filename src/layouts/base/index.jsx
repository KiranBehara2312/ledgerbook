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
      {children}
    </Box>
  );
};

export default BaseLayout;
