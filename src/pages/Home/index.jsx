import { Box, Paper, Stack, Tab, Tabs } from "@mui/material";
import React from "react";
import { FaIndianRupeeSign } from "react-icons/fa6";
import { GoArrowDownLeft } from "react-icons/go";
import { GoArrowUpRight } from "react-icons/go";
import IconWrapper from "../../components/custom/IconWrapper";
import LedgerList from "../ledger/LedgerList";
import { formatDate } from "../../helpers";

const Home = () => {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const objArray = Array.from({ length: 20 }, () => ({
    transactionAmount: Math.floor(Math.random() * 100000000),
    transactionDate: formatDate("DD/MM/YYYY", new Date()),
    transactionMode: "Cash",
    transactionNote: "Sample note",
    transactionBy: "User",
    transactionTo: "Mr. Krishna",
    transactionType: Math.random() > 0.5 ? "Credit" : "Debit",
    transactionFor: "Sample transaction for",
  }));

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
        {value === 0 && objArray?.length > 0 && (
          <LedgerList ledgerArr={objArray} />
        )}
        {value === 1 && objArray?.length > 0 && (
          <LedgerList
            ledgerArr={objArray.filter((x) => x.transactionType === "Credit")}
          />
        )}
        {value === 2 && objArray?.length > 0 && (
          <LedgerList
            ledgerArr={objArray.filter((x) => x.transactionType === "Debit")}
          />
        )}
      </Box>
    </>
  );
};

export default Home;
