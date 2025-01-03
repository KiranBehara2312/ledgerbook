import {
  Avatar,
  Box,
  Divider,
} from "@mui/material";
import React from "react";
import LedgerListItem from "../../components/shared/LedgerListItem";

const LedgerList = ({ ledgerArr = [] }) => {
  return (
    <Box sx={{ overflowY: "auto", maxHeight: "calc(100vh - 100px)" }}>
      {ledgerArr?.map((item, i) => {
        return (
          <span key={i}>
            <LedgerListItem {...item} />
            <Divider />
          </span>
        );
      })}
    </Box>
  );
};
export default LedgerList;
