import React, { useState } from "react";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import { FaUserDoctor } from "react-icons/fa6";
import IconWrapper from "../../components/custom/IconWrapper";
import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import DoctorInformation from "./AddEdits";

const Doctor = () => {
  const [showAddDoc, setShowAddDoc] = useState(false);
  const Buttons = () => {
    return (
      <Button variant="outlined" size="small" onClick={addDoctorHandler}>
        <FaPlus size={15} style={{ marginRight: "8px" }} /> Add Doctor
      </Button>
    );
  };
  const addDoctorHandler = () => {
    setShowAddDoc(true);
  };
  return (
    <>
      <HeaderWithSearch
        headerText="Doctor"
        hideSearchBar
        html={<Buttons />}
        headerIcon={<IconWrapper icon={<FaUserDoctor size={20} />} />}
      />
      {showAddDoc && <DoctorInformation setShowAddDoc={setShowAddDoc} />}
    </>
  );
};

export default Doctor;
