import { Box, Chip, Divider } from "@mui/material";
import React, { useEffect } from "react";
import IconWrapper from "../custom/IconWrapper";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { formatDate } from "../../helpers";
import { MyHeading } from "../custom";
import { getAllItems } from "../../services/dynamoDb";

const LedgerListItem = ({
  transactionAmount = 0,
  transactionDate = formatDate("DD/MM/YYYY", new Date()),
  transactionMode = "Cash",
  transactionNote,
  transactionBy,
  transactionTo,
  transactionFor = "transactionFor transactionFor transactionFor",
}) => {
  useEffect(() => {
    insertSomeData();
  }, []);

  const insertSomeData = async () => {
    await getAllItems().then((res) => {
      console.log(res);
    });
  };
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
