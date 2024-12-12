import React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import { Box, Typography } from "@mui/material";
import IconWrapper from "./IconWrapper";
import { FaSearch } from "react-icons/fa";
import MyHeading from "./MyHeading";

export default function HeaderWithSearch({
  hideSearchBar = false,
  searchedInput = null,
  headerText = "Default Value",
  headerIcon = null,
}) {
  const handleInputChange = (event) => {
    searchedInput(event.target.value);
  };

  // commented this because onKeyPress is depriciated
  //onKeyPress={(event) => handleKeyPress(event)}
  const handleKeyPress = (event) => {
    event.preventDefault();
    if (event.key === "Enter") {
      searchedInput(event.target.value);
    }
  };

  return (
    <Paper
      key={headerText}
      sx={{
        p: "0 10px",
        mb: 1.7,
        mt: 1,
        display: "flex",
        alignItems: "center",
        minHeight: "40px",
        justifyContent: "space-between",
        position: "relative",
        boxShadow:
          "rgba(17, 17, 26, 0.1) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px !important",
      }}
    >
      {headerIcon || null}
      <MyHeading text={headerText} variant="body1" sx={{fontWeight : "bold"}}/>
      <Box sx={{ flex: 1 }}></Box>
      {!hideSearchBar && (
        <>
          <Divider sx={{ height: 30, m: 0.5 }} orientation="vertical" />
          <InputBase
            onChange={(event) => handleInputChange(event)}
            sx={{
              ml: 1,
              width: "200px",
              "& input::placeholder": {
                fontSize: "13px",
              },
            }}
            autoFocus
            placeholder={`Search ${headerText}`}
            inputProps={{
              "aria-label": `Search ${headerText}`,
            }}
          />
          <IconWrapper icon={<FaSearch size={20} />} />
        </>
      )}
    </Paper>
  );
}
