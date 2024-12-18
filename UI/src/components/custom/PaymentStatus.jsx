import { Box, Typography } from "@mui/material";
import { BiSolidErrorAlt } from "react-icons/bi";
import React from "react";
import { PiSealCheckFill } from "react-icons/pi";
import { IoIosWarning } from "react-icons/io";

const STATUS = {
  1: "Success",
  2: "Failure",
  3: "Pending",
};
const PaymentStatus = ({ status = STATUS[1], sx = {} }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 1,
        ...sx,
      }}
    >
      {status === STATUS[1] && (
        <>
          <PiSealCheckFill size={60} style={{ color: "green" }} />
          <Typography variant="caption" style={{ color: "green" }}>
            Payment Received
          </Typography>
        </>
      )}
      {status === STATUS[2] && (
        <>
          <BiSolidErrorAlt size={60} style={{ color: "red" }} />
          <Typography variant="caption" style={{ color: "red" }}>
            Amount not received
          </Typography>
        </>
      )}

      {status === STATUS[3] && (
        <>
          <IoIosWarning size={60} style={{ color: "orange" }} />
          <Typography variant="caption" style={{ color: "orange" }}>
            Pending transaction
          </Typography>
        </>
      )}
    </Box>
  );
};

export default PaymentStatus;
