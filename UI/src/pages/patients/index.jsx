import React, { useEffect, useState } from "react";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import IconWrapper from "../../components/custom/IconWrapper";
import { Button, Dialog, DialogTitle, useTheme } from "@mui/material";
import { FaEdit, FaEye, FaPrint, FaTrash, FaUsers } from "react-icons/fa";
import MyTable from "../../components/custom/MyTable";
import { postData } from "../../helpers/http";
import { SiCashapp } from "react-icons/si";
import { MdPersonAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Registration from "../registration";

const ACTIONS = [
  {
    name: "Edit",
    icon: <IconWrapper icon={<FaEdit size={15} />} />,
    disabled: false,
  },
  {
    name: "View",
    icon: <IconWrapper icon={<FaEye size={15} />} />,
    disabled: false,
  },
];
const Patients = () => {
  const theme = useTheme();

  const navigate = useNavigate();
  const [showPatientRegn, setShowPatientRegn] = useState({
    show: false,
    rerender: false,
  });
  const [selectedPatient, setSelectedPatient] = useState({
    action: "Edit",
    data: null,
  });
  const [tableObj, setTableObj] = useState({
    columns: [],
    data: [],
    totalCount: 0,
    defaultPage: 0,
  });
  useEffect(() => {
    fetchPatients({
      page: 1,
      limit: 10,
    });
  }, [showPatientRegn.rerender]);
  const Buttons = () => {
    return (
      <Button variant="outlined" size="small" onClick={newRegnClickHandler}>
        <MdPersonAdd size={15} style={{ marginRight: "8px" }} /> New
        Registration
      </Button>
    );
  };
  const fetchPatients = async (paginationObj) => {
    const response = await postData(`/patients/all`, paginationObj);
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
  const newRegnClickHandler = () => {
    navigate("/pages/registration");
  };

  const actionsHandler = (action, row) => {
    setSelectedPatient({
      action,
      data: row,
    });
    setShowPatientRegn({
      show: true,
      rerender: false,
    });
  };
  const CloseBtnHtml = () => {
    return (
      <Button
        size="small"
        type="button"
        variant="outlined"
        color="error"
        onClick={() => setShowPatientRegn({ rerender: false, show: false })}
      >
        close
      </Button>
    );
  };
  return (
    <>
      <HeaderWithSearch
        headerText="Patients"
        hideSearchBar
        html={<Buttons />}
        headerIcon={
          <IconWrapper
            icon={<FaUsers size={20} />}
            color={theme.palette.primary.main}
          />
        }
      />
      {tableObj.columns?.length > 0 && (
        <MyTable
          {...tableObj}
          helperNote={"Note: Right click on a record to view actions"}
          actions={ACTIONS}
          actionWithRecord={actionsHandler}
          changedPage={(newPage) => {
            fetchMastersData({
              page: newPage,
              limit: 10,
            });
          }}
        />
      )}

      {showPatientRegn.show && (
        <Dialog maxWidth="xl" fullWidth open={true}>
          <Registration
            dialogCloseBtn={<CloseBtnHtml />}
            headerText={`${selectedPatient?.action} Regitration`}
            selectedPatient={selectedPatient?.data}
            action={selectedPatient?.action}
            setShowPatientRegn={setShowPatientRegn}
          />
        </Dialog>
      )}
    </>
  );
};

export default Patients;
