import { Box } from "@mui/material";
import React from "react";
import "../../styles/glassmorphism.css";
import PropTypes from "prop-types";

const SimCard = ({ cardStyles, children }) => {
  return (
    <Box className="glass" sx={{ ...cardStyles }}>
      {children}
    </Box>
  );
};
SimCard.defaultProps = {
  cardStyles: {
    height: "auto",
    width: "auto",
    p: 1,
    borderRadius: "10px",
  },
};
SimCard.propTypes = {
  children: PropTypes.node.isRequired,
  cardStyles: PropTypes.object,
};
export default SimCard;
