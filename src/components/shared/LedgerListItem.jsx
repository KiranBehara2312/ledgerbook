import {
  Avatar,
  Box,
  Chip,
  Divider,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect } from "react";
import { formatDate, formatIndianCurrency } from "../../helpers";
import { MyHeading } from "../custom";
import IconWrapper from "../custom/IconWrapper";
import { FaLink } from "react-icons/fa6";

const LedgerListItem = ({
  transactionAmount = 0,
  transactionDate = formatDate("DD/MM/YYYY", new Date()),
  transactionMode = "Cash",
  transactionNote = "",
  transactionTo,
  transactionType = "Credit",
  transactionFor = "Random Transaction",
  thumbnailUrl = null,
  fileUrl = null,
}) => {
  const ismdDown = useMediaQuery((theme) => theme.breakpoints.down("sm"));
  const theme = useTheme();

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: theme.palette.primary.main,
        width: "30px !important",
        height: "30px !important",
        fontSize: "small",
      },
      children: `${name.split(" ")?.[0]?.[0] ?? ""}${
        name.split(" ")?.[1]?.[0] ?? ""
      }`,
    };
  }

  return (
    <Box
      sx={{
        pt: 2,
        pb: 2,
        pr: 1,
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
        <Box sx={{ display: "flex" }}>
          <Avatar variant="rounded" {...stringAvatar(transactionTo)} />
          <MyHeading
            text={transactionTo}
            variant="body1"
            sx={{ pl: 1, pt: 0.25 }}
          />
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-evenly",
            gap: 1,
            mt: 0.5,
          }}
        >
          <MyHeading
            text={formatDate("DD/MM/YYYY", transactionDate) + " -"}
            variant="caption"
          />
          <MyHeading text={transactionMode + " -"} variant="caption" />
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
      <Box>
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <MyHeading
            text={formatIndianCurrency(transactionAmount)}
            sx={{
              color: transactionType === "Credit" ? "green" : "red",
            }}
            variant="h6"
          />
          {thumbnailUrl !== null && (
            <img
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                window.open(fileUrl);
              }}
              src={thumbnailUrl}
              width={30}
              height={30}
              style={{ borderRadius: "50%" }}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};
export default LedgerListItem;

//https://script.google.com/macros/s/AKfycbxJRDQHRSuWU1bq2pE0pW4bFSPCcG4928Fie8ggaKU5C8ckIMoWzMB-5Dtq9dVk4839/exec
// save into sheet
