import React from "react";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import IconWrapper from "../../components/custom/IconWrapper";
import { FaCalendarAlt } from "react-icons/fa";
import NoDataFound from "../../components/shared/NoDataFound";

const Appointment = () => {
  return (
    <>
      <HeaderWithSearch
        hideSearchBar
        headerIcon={
          <IconWrapper defaultColor icon={<FaCalendarAlt size={20} />} />
        }
        headerText="Appointment"
      />
      <NoDataFound sx={{mt:10}} />
    </>
  );
};

export default Appointment;
