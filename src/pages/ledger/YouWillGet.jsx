import {
  Avatar,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import React from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import IconWrapper from "../../components/custom/IconWrapper";
import { FaExpand, FaFileAlt } from "react-icons/fa";
import LedgerListItem from "../../components/shared/LedgerListItem";

const YouWillGet = () => {
  return (
    <Box>
      {[1, 2, 3, 4, 5, 6]?.map((item, i) => {
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
export default YouWillGet;
