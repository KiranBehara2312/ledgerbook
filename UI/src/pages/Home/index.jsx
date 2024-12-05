import { Box, Paper, Stack } from "@mui/material";
import React from "react";
import { GlassBG, MyHeading } from "../../components/custom";
import { IoPeople } from "react-icons/io5";
import { FaBed, FaCalendarCheck } from "react-icons/fa";

const Home = () => {
  const cards = [
    {
      count: 8,
      label: "Registrations",
      url: null,
      icon: <IoPeople size={25} />,
    },
    {
      count: 8,
      label: "Appointments",
      url: null,
      icon: <FaCalendarCheck size={25} />,
    },
    {
      count: 8,
      label: "In Patients",
      url: null,
      icon: <FaBed size={25} />,
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
            cardStyles={{ width: "150px", height: "60px", m: 0.5 }}
          >
            <Stack direction={"row"}>
              <MyHeading text={x.count} variant="h4" />
              <span style={{ flex: "1" }}></span>
              <span>{x.icon}</span>
            </Stack>
            <MyHeading text={x.label} variant="body2" sx={{ pt: 0.5 }} />
          </GlassBG>
        );
      })}
    </Box>
  );
};

export default Home;
