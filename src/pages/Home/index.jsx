import { Box, Paper } from "@mui/material";
import React from "react";
import { GlassBG, MyHeading } from "../../components/custom";

const Home = () => {
  const cards = [
    {
      count: 8,
      label: "Registrations",
      url: null,
    },
    {
      count: 8,
      label: "Appointments",
      url: null,
    },
    {
      count: 8,
      label: "In Patients",
      url: null,
    },
    {
      count: 8,
      label: "Beds",
      url: null,
    },
    {
      count: 8,
      label: "OT",
      url: null,
    },
  ];
  return (
    <Box
      sx={{ display: "flex", m: 1, flexWrap: "wrap", justifyContent: "center" }}
    >
      {cards?.map((x, i) => {
        return (
          <GlassBG
            key={i}
            cardStyles={{ width: "150px", height: "60px", m: 0.25 }}
          >
            <MyHeading text={x.count} variant="h4"/>
            <MyHeading text={x.label} variant="body2"/>
          </GlassBG>
        );
      })}
    </Box>
  );
};

export default Home;
