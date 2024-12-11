import { Box, Stack, useTheme } from "@mui/material";
import React, { useState } from "react";
import { MASTERS_ITEMS } from "../../constants/Menu/MastersItems";
import { GlassBG, MyHeading } from "../../components/custom";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import { alpha } from "@mui/material/styles";

const Masters = () => {
  const theme = useTheme();
  const [selectedMenuCard, setSelectedMenuCard] = useState("");
  const MasterItems = () => {
    return (
      <Stack direction={"row"} sx={{ display: "flex", flexWrap: "wrap" }}>
        {MASTERS_ITEMS.map((x, i) => {
          return (
            <Box
              onClick={() => setSelectedMenuCard(x.label)}
              sx={{
                flexBasis: "47.4%",
                m: 0.5,
              }}
              key={i}
            >
              <GlassBG
                cardStyles={{
                  height: "40px",
                  cursor: "pointer",
                  minWidth: "75px",
                }}
              >
                <MyHeading text={x.icon} alignCenter variant="body1" />
                <MyHeading text={x.label} alignCenter variant="caption" />
              </GlassBG>
            </Box>
          );
        })}
      </Stack>
    );
  };
  return (
    <Stack direction={"row"} sx={{ display: "flex" }}>
      <Box sx={{ flexBasis: "20%", m: 0.5 }}>
        <MasterItems />
      </Box>
      <Box sx={{ flexBasis: "80%", m: 0.5 }}>
        <HeaderWithSearch headerText={selectedMenuCard} />
      </Box>
    </Stack>
  );
};

export default Masters;
