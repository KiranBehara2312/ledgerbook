import { Box, Chip, Divider, useMediaQuery } from "@mui/material";
import React, { useEffect } from "react";
import { formatDate, formatIndianCurrency } from "../../helpers";
import { MyHeading } from "../custom";
import { getAllItems } from "../../services/dynamoDb";
import { FaIndianRupeeSign } from "react-icons/fa6";
import IconWrapper from "../custom/IconWrapper";

const LedgerListItem = ({
  transactionAmount = 0,
  transactionDate = formatDate("DD/MM/YYYY", new Date()),
  transactionMode = "Cash",
  transactionNote,
  transactionBy,
  transactionTo,
  transactionType = "Credit",
  transactionFor = "transactionFor transactionFor transactionFor transactionFor transactionFor transactionFor transactionFor",
}) => {
  const ismdDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <Box
      sx={{
        pt: 2,
        pb: 2,
        pr:1, 
        display: "flex",
        justifyContent: "space-between",
        background: transactionType === "Credit" ? "#0080001f" : "#ff00000f",
      }}
    >
      <Box
        sx={{
          ml: 1,
          pt: 0.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
        }}
      >
        <MyHeading text={transactionTo} variant="body1" />
        <Box sx={{ display: "flex", justifyContent: "space-evenly", gap: 1 }}>
          <MyHeading text={transactionDate} variant="caption" />
          <MyHeading text={transactionMode} variant="caption" />
          <MyHeading
            text={transactionFor}
            sx={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
              maxWidth: ismdDown ? "180px" : "70%",
            }}
            variant="caption"
          />
        </Box>
      </Box>
      <MyHeading
        text={formatIndianCurrency(transactionAmount)}
        sx={{
          color: transactionType === "Credit" ? "green" : "red",
        }}
        variant="h6"
      />
    </Box>
  );
};
export default LedgerListItem;
