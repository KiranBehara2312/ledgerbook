import { Box, Paper, Stack, Tab, Tabs } from "@mui/material";
import React from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { GoArrowDownLeft } from "react-icons/go";
import { GoArrowUpRight } from "react-icons/go";
import IconWrapper from "../../components/custom/IconWrapper";
import YouWillGet from "../ledger/YouWillGet";
import YouWillGive from "../ledger/YouWillGive";

const Home = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon position tabs example"
        centered
      >
        <Tab
          icon={
            <>
              <IconWrapper
                defaultColor
                icon={<FaIndianRupeeSign style={{ marginTop: "5px" }} />}
              />
            </>
          }
          iconPosition="start"
          label={"All"}
        />
        <Tab
          icon={
            <>
              <GoArrowDownLeft />
              <FaIndianRupeeSign />
            </>
          }
          iconPosition="start"
          label={"You will Get"}
        />
        <Tab
          icon={
            <>
              <GoArrowUpRight />
              <FaIndianRupeeSign />
            </>
          }
          iconPosition="start"
          label="You will Give"
        />
      </Tabs>
      <Box sx={{ mt: 1 }}>
        {value === 1 && <YouWillGet />}
        {value === 2 && <YouWillGive />}
      </Box>
    </>
  );
};

export default Home;
