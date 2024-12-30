import { Box, Chip, Divider } from "@mui/material";
import React from "react";
import IconWrapper from "../custom/IconWrapper";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { formatDate } from "../../helpers";
import { MyHeading } from "../custom";

const LedgerListItem = ({
  transactionAmount = 0,
  transactionDate = formatDate("DD/MM/YYYY", new Date()),
  transactionMode = "Cash",
  transactionNote,
  transactionId,
  transactionBy,
  transactionTo,
  transactionFor = "transactionFor transactionFor transactionFor",
}) => {
  return (
    <Box sx={{ pt: 2, pb: 2, display: "flex" }}>
      <Chip
        sx={{
          minWidth: "105px",
          maxWidth: "120px",
          minHeight: "50px",
          pl: 1,
          pr: 1,
        }}
        icon={<IconWrapper defaultColor icon={<FaIndianRupeeSign />} />}
        label={transactionAmount}
        variant="outlined"
      />
      <Box
        sx={{
          ml: 1,
          pt: 0.5,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
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
              maxWidth: "120px",
            }}
            variant="caption"
          />
        </Box>
      </Box>
    </Box>
  );
};
export default LedgerListItem;
