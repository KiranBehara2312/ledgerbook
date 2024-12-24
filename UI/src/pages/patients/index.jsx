import React, { useEffect, useState } from "react";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import IconWrapper from "../../components/custom/IconWrapper";
import { Button, Dialog, DialogTitle, useTheme } from "@mui/material";
import {
  FaAddressCard,
  FaCalendar,
  FaEdit,
  FaEye,
  FaHistory,
  FaPrint,
  FaTrash,
  FaUsers,
} from "react-icons/fa";
import { GrNotes } from "react-icons/gr";
import MyTable from "../../components/custom/MyTable";
import { postData } from "../../helpers/http";
import { SiCashapp } from "react-icons/si";
import { MdNoteAlt, MdPersonAdd } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Registration from "../registration";
import { useSelector } from "react-redux";
import { ADMIN, DOCTOR, NURSE, STAFF } from "../../constants/roles";

const ACTIONS = [
  {
    name: "Edit",
    icon: <IconWrapper defaultColor icon={<FaEdit size={15} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
  },
  {
    name: "View",
    icon: <IconWrapper defaultColor icon={<FaEye size={15} />} />,
    disabled: false,
    access: [ADMIN, STAFF, NURSE, DOCTOR],
  },
  {
    name: "Collect Patient Vitals",
    icon: <IconWrapper defaultColor icon={<MdNoteAlt size={15} />} />,
    disabled: false,
    access: [ADMIN, NURSE],
  },
  {
    name: "Patient Registration Card",
    icon: <IconWrapper defaultColor icon={<FaAddressCard size={15} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
  },
  {
    name: "Book an Appointment",
    icon: <IconWrapper defaultColor icon={<FaCalendar size={15} />} />,
    disabled: false,
    access: [ADMIN, STAFF],
  },
  {
    name: "Visit History",
    icon: <IconWrapper defaultColor icon={<FaHistory size={15} />} />,
    disabled: false,
    access: [ADMIN, STAFF, NURSE, DOCTOR],
  },
  {
    name: "Prescription Notes",
    icon: <IconWrapper defaultColor icon={<GrNotes size={15} />} />,
    disabled: false,
    access: [ADMIN, STAFF, NURSE, DOCTOR],
  },
];

const Patients = () => {
  const theme = useTheme();
  const loggedInUser = useSelector((state) => state.userDetails.user);
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

  const Buttons = () => {
    return (
      <>
        {(loggedInUser?.role === STAFF || loggedInUser?.role === ADMIN) && (
          <Button variant="outlined" size="small" onClick={newRegnClickHandler}>
            <MdPersonAdd size={15} style={{ marginRight: "8px" }} /> New
            Registration
          </Button>
        )}
      </>
    );
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
          actions={ACTIONS.filter((x) => x.access.includes(loggedInUser?.role))}
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
            headerText={`${selectedPatient?.action} Registration`}
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
