import React, { useEffect, useState } from "react";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import { FaUserDoctor } from "react-icons/fa6";
import IconWrapper from "../../components/custom/IconWrapper";
import { Button } from "@mui/material";
import { FaPlus } from "react-icons/fa";
import DoctorInformation from "./AddEdits";
import MyTable from "../../components/custom/MyTable";
import { postData } from "../../helpers/http";

const Doctor = () => {
  const [showAddDoc, setShowAddDoc] = useState(false);
  const [tableObj, setTableObj] = useState({
    columns: [],
    data: [],
    totalCount: 0,
    defaultPage: 0,
  });
  useEffect(() => {
    fetchDoctors({
      page: 1,
      limit: 10,
    });
  }, []);
  const Buttons = () => {
    return (
      <Button variant="outlined" size="small" onClick={addDoctorHandler}>
        <FaPlus size={15} style={{ marginRight: "8px" }} /> Add Doctor
      </Button>
    );
  };
  const fetchDoctors = async (paginationObj) => {
    const response = await postData(`/doctor/doctors`, paginationObj);
    if (response) {
      const oneObj = response?.data?.[0];
      setTableObj({
        columns: Object.keys(oneObj)?.map((x) => {
          return {
            id: x,
            label: x,
            minWidth: 170,
            type: x === "createdAt" || x === "updatedAt" ? "date" : "string",
          };
        }),
        data: response?.data ?? [],
        totalCount: response?.totalPages || 0,
        defaultPage: response?.page || 0,
      });
    } else {
      setTableObj({
        columns: [],
        data: [],
        totalCount: 0,
        defaultPage: 0,
      });
    }
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
      {tableObj.columns?.length > 0 && (
        <MyTable
          {...tableObj}
          changedPage={(newPage) => {
            fetchMastersData({
              page: newPage,
              limit: 10,
            });
          }}
        />
      )}
    </>
  );
};

export default Doctor;
