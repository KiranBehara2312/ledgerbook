import {
  Avatar,
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogContent,
  Divider,
  Fab,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import LedgerListItem from "../../components/shared/LedgerListItem";
import { csvToJson } from "../../helpers";
import { FaCirclePlus } from "react-icons/fa6";
import AddNewLedgerEntry from "./AddNewLedgerEntry";
import { WEB_APP_URL } from "../../constants/appScript";

const LedgerList = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  const [showDialog, setShowDialog] = useState({
    show: false,
    rerender: false,
    modalWidth: "md",
  });
  const [selectedLeger, setSelectedLedger] = useState({
    action: "ADD",
    data: null,
  });
  const [completeData, setCompleteData] = useState([]);

  useEffect(() => {
    getAllItems();
  }, [showDialog.rerender]);

  const closeDialog = () => {
    setShowDialog({ rerender: false, show: false });
    setSelectedLedger({ action: null, data: null });
  };

  const CloseBtnHtml = () => {
    return (
      <Button
        size="small"
        type="button"
        variant="outlined"
        color="error"
        sx={{
          maxWidth: "30px !important",
          minWidth: "30px !important",
          width: "30px !important",
        }}
        onClick={() => closeDialog()}
      >
        X
      </Button>
    );
  };

  const getAllItems = async () => {
    setLoading(true);
    await fetch(WEB_APP_URL)
      .then((response) => response.text())
      .then((data) => {
        const fullObj = JSON.parse(data);
        const arr = fullObj?.sheetData;
        if (arr?.length > 0) {
          const tilda1 = arr.map((x, i) => {
            return x.join("~kiran~");
          });
          const tilda2 = tilda1.join("\n");
          const finalData = csvToJson("~kiran~", tilda2);
          setLoading(false);
          setCompleteData(finalData);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.error("Error fetching sheet data:", error);
      });
  };

  return (
    <Box sx={{ overflowY: "auto", maxHeight: "calc(100vh - 100px)" }}>
      {completeData?.map((item, i) => {
        return (
          <span
            style={{ cursor: "pointer" }}
            key={i}
            onClick={() => {
              setSelectedLedger({
                action: "EDIT",
                data: { ...item, curIndex: i },
              });
              setShowDialog({
                show: true,
                rerender: false,
              });
            }}
          >
            <LedgerListItem {...item} />
            <Divider />
          </span>
        );
      })}
      <Fab
        variant="extended"
        size="large"
        color="primary"
        sx={{
          textTransform: "capitalize",
          position: "fixed",
          bottom: 20,
          right: 20,
        }}
        onClick={() => setShowDialog({ show: true, rerender: false })}
      >
        <FaCirclePlus style={{ paddingRight: "8px", fontSize: "20px" }} />
        New Transaction
      </Fab>

      {showDialog.show && (
        <Dialog fullWidth fullScreen={isSmallScreen} sx={{ mt: 5 }} open={true}>
          <DialogContent sx={{ m: 1 }}>
            <AddNewLedgerEntry
              dialogCloseBtn={<CloseBtnHtml />}
              selectedRow={selectedLeger?.data}
              action={selectedLeger?.action}
              setShowDialog={setShowDialog}
            />
          </DialogContent>
        </Dialog>
      )}
      {loading && (
        <Backdrop
          sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
          open={true}
        >
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
    </Box>
  );
};
export default LedgerList;
