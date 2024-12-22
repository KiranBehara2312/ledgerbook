import React, { useEffect, useState } from "react";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import IconWrapper from "../../components/custom/IconWrapper";
import { Button } from "@mui/material";
import { FaEdit, FaEye, FaPrint, FaTrash } from "react-icons/fa";
import MyTable from "../../components/custom/MyTable";
import { postData } from "../../helpers/http";
import { SiCashapp } from "react-icons/si";

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
  {
    name: "Delete",
    icon: <IconWrapper icon={<FaTrash size={15} />} />,
    disabled: true,
  },
];
const PaymentLedger = () => {
  const [showAddDoc, setShowAddDoc] = useState({
    show: false,
    rerender: false,
  });
  const [selectedDoc, setSelectedDoc] = useState({
    action: "Add",
    data: null,
  });
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
  }, [showAddDoc.rerender]);
  const Buttons = () => {
    return (
      <Button variant="outlined" size="small" onClick={addDoctorHandler}>
        <FaPrint size={15} style={{ marginRight: "8px" }} /> Print
      </Button>
    );
  };
  const fetchDoctors = async (paginationObj) => {
    const response = await postData(`/paymentledger/history`, paginationObj);
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
    setSelectedDoc({
      action: "Add",
      data: null,
    });
    setShowAddDoc({
      show: true,
      rerender: false,
    });
  };

  const actionsHandler = (action, row) => {
    setSelectedDoc({
      action,
      data: row,
    });
    setShowAddDoc({
      show: true,
      rerender: false,
    });
  };
  return (
    <>
      <HeaderWithSearch
        headerText="Payment Ledger"
        hideSearchBar
        html={<Buttons />}
        headerIcon={<IconWrapper icon={<SiCashapp size={20} />} />}
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
    </>
  );
};

export default PaymentLedger;
