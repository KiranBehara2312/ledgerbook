import React, { Fragment, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  Button,
  Box,
  useMediaQuery,
  useTheme,
  InputAdornment,
  Alert,
} from "@mui/material";
import { FaUpload } from "react-icons/fa";
import { REGEX_PATTERNS } from "../../constants/Regex";
import { GlassBG, MyHeading } from "../../components/custom";
import F_Select from "../../components/custom/form/F_Select";
import F_Input from "../../components/custom/form/F_Input";
import { postData } from "../../helpers/http";
import {
  base64ToBlobUrl,
  formatDate,
  numberToWords,
  successAlert,
  warnAlert,
} from "../../helpers";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import { FaPlus } from "react-icons/fa";
import IconWrapper from "../../components/custom/IconWrapper";
import F_DatePicker from "../../components/custom/form/F_DatePicker";
import { WEB_APP_URL } from "../../constants/appScript";
import DropboxChooser from "react-dropbox-chooser";
import { FaDropbox } from "react-icons/fa6";

const AddNewLedgerEntry = ({
  dialogCloseBtn = null,
  setShowDialog = () => {},
  headerText = "Ledger Entry",
  selectedRow = null,
  action = "ADD",
}) => {
  const theme = useTheme();
  const [dropboxDetails, setDropboxDetails] = useState({
    thumbnailUrl: selectedRow?.thumbnailUrl ?? null,
    fileSize: selectedRow?.fileSize ?? null,
    fileUrl: selectedRow?.fileUrl ?? null,
  });
  const readOnly = action === "VIEW";
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const CARD_WIDTH = isSmallScreen ? "100%" : "550px";
  const inputWidth = "100%";
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm();
  const formValues = watch();

  useEffect(() => {
    if (selectedRow !== null) {
      Object.entries(selectedRow)?.map(([key, val], index) => {
        let actualVal = "";
        if (key === "transactionDate") {
          actualVal = formatDate("YYYY-MM-DD", val);
        } else {
          actualVal = val;
        }
        setValue(key, actualVal, {
          shouldValidate: true,
          shouldTouch: true,
          shouldDirty: true,
        });
      });
    }
  }, [selectedRow]);

  const onSubmit = async (formData) => {
    // saveNewLedger(formData);
    const obj = {
      ...formData,
      uuid: crypto.randomUUID(),
      ...dropboxDetails,
    };
    const MSGS = {
      0: "Error while inserting...",
      1: "Successfully Inserted...!",
    };
    performAction("insert", obj, MSGS);
  };

  const dropBoxSuccessHandler = (files) => {
    const thumbnailLink = files[0].thumbnailLink;
    const link = files[0].link;
    const sizeInKilobytes = (files[0].bytes / 1024).toFixed(2);
    const sizeInMegabytes = (sizeInKilobytes / 1024).toFixed(2);
    setDropboxDetails({
      thumbnailUrl: thumbnailLink,
      fileSize:
        sizeInKilobytes > 1024
          ? `${sizeInMegabytes} MB`
          : `${sizeInKilobytes} KB`,
      fileUrl: link,
    });
  };

  const saveNewLedger = async (formData) => {
    const obj = {
      ...formData,
      uuid: crypto.randomUUID(),
      ...dropboxDetails,
    };
    const entries = Object.entries(obj);
    let strPayload = ``;
    entries.forEach(([key, value], index) => {
      if (index === entries.length - 1) {
        strPayload += `${key}=${value}`;
      } else {
        strPayload += `${key}=${value}&`;
      }
    });
    const response = await fetch(WEB_APP_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: strPayload,
    });
    setShowDialog({
      show: false,
      rerender: true,
    });
  };

  const performAction = async (action, data, messages) => {
    const payload = {
      action: action, // Action method (e.g., 'update', 'delete', 'insert')
      row: selectedRow?.curIndex ?? 0 + 1,
      data: data,
    };

    try {
      const response = await fetch(WEB_APP_URL, {
        method: "POST",
        // headers: {
        //   "Content-Type": "application/json",
        // },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (response.ok) {
        successAlert(messages?.["1"], { autoClose: 1500 });
        setShowDialog({
          show: false,
          rerender: true,
        });
      } else {
        console.error("Error performing action:", result);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  const onUpdate = async (formData) => {
    const obj = {
      ...formData,
      ...dropboxDetails,
    };
    const MSGS = {
      0: "Error while updating...",
      1: "Successfully Updated...!",
    };
    performAction("update", obj, MSGS);
  };

  const updateSheet = async (row, data) => {
    const payload = {
      row: row + 1, // we are adding 1 here because header row is not included here
      data: data,
    };

    try {
      const response = await fetch(`${WEB_APP_URL}?action=doNiceUpdate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload), // Send the payload as JSON
      });

      const result = await response.json();
      if (response.ok) {
        successAlert(response.message, { autoClose: 1500 });
        setShowDialog({
          show: false,
          rerender: true,
        });
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <>
      <HeaderWithSearch
        notScrollable
        hideSearchBar
        headerIcon={<IconWrapper defaultColor icon={<FaPlus size={20} />} />}
        headerText={headerText}
        html={<>{dialogCloseBtn}</>}
      />
      <form
        onSubmit={handleSubmit(action === "ADD" ? onSubmit : onUpdate)}
        style={{ width: "100%", paddingTop: "50px" }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: isSmallScreen ? "wrap" : "nowrap",
          }}
        >
          <GlassBG cardStyles={{ width: CARD_WIDTH, m: 1, height: "auto" }}>
            <MyHeading
              alignCenter
              text="Transaction Details"
              variant="h6"
              sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
            />
            <F_Input
              name="transactionTo"
              readOnly={readOnly}
              control={control}
              errors={errors}
              maxWidth={inputWidth}
              rules={{ required: "Transaction To is required" }}
              label="To"
            />
            <F_Select
              control={control}
              name={"transactionType"}
              readOnly={readOnly}
              maxWidth={inputWidth}
              label={"Type"}
              list={[
                { label: "Credit", value: "Credit" },
                { label: "Debit", value: "Debit" },
              ]}
              rules={{ required: "Transaction Type is required" }}
              isRequired={true}
              errors={errors}
            />

            <F_Select
              control={control}
              name={"transactionMode"}
              readOnly={readOnly}
              maxWidth={inputWidth}
              label={"Mode"}
              list={[
                { label: "Cash", value: "Cash" },
                { label: "Cheque", value: "Cheque" },
                { label: "Google Pay", value: "Google Pay" },
                { label: "Phonepe", value: "Phonepe" },
                { label: "Other UPI's", value: "Other UPI's" },
                { label: "IMPS", value: "IMPS" },
                { label: "NEFT/RTGs", value: "NEFT/RTGs" },
              ]}
              rules={{ required: "Transaction Mode is required" }}
              isRequired={true}
              errors={errors}
            />

            <F_DatePicker
              name="transactionDate"
              readOnly={readOnly}
              control={control}
              errors={errors}
              type="date"
              maxWidth={inputWidth}
              rules={{ required: "Transaction Date is required" }}
              label="Date"
            />

            <F_Input
              name="transactionAmount"
              control={control}
              readOnly={readOnly}
              errors={errors}
              maxWidth={inputWidth}
              rules={{
                required: "Amount is required",
                maxLength: {
                  value: 10,
                  message: "Amount is too long",
                },
                pattern: {
                  value: REGEX_PATTERNS.POSITIVE_NUMBER_ONLY,
                  message: "Invalid Amount",
                },
              }}
              endAdornment={
                <InputAdornment
                  position="start"
                  sx={{ cursor: "pointer", fontSize: "0.75rem !important" }}
                >
                  INR
                </InputAdornment>
              }
              defaultHelperText={numberToWords(formValues.transactionAmount)}
              label="Amount"
            />

            <F_Input
              name="transactionFor"
              readOnly={readOnly}
              control={control}
              errors={errors}
              multiline
              maxRows={3}
              maxWidth={inputWidth}
              rules={{ required: "Transaction For is required" }}
              label="Transaction For"
            />

            <F_Input
              name="transactionNote"
              readOnly={readOnly}
              control={control}
              errors={errors}
              multiline
              maxRows={3}
              maxWidth={inputWidth}
              rules={{}}
              label="Transaction Note"
            />

            <DropboxChooser
              appKey={"2o0gkpgvmb2d2w7"}
              success={(files) => dropBoxSuccessHandler(files)}
              cancel={() => this.onCancel()}
              multiselect={false}
              extensions={[".png", ".jpeg", ".jpg"]}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  flexDirection: "row",
                  border: "0.25px dashed #000000",
                  borderRadius: "10px",
                  p: 2,
                }}
              >
                <IconWrapper defaultColor icon={<FaDropbox size={20} />} />
                <MyHeading text="Upload Image" variant="body1" sx={{ pl: 1 }} />
                <br />
                <MyHeading
                  text="PNG / JPG / JPEG"
                  variant="caption"
                  sx={{ pl: 1, pt: 0.5 }}
                />
              </Box>
            </DropboxChooser>

            {action !== "VIEW" && (
              <Box
                sx={{
                  display: "flex",
                  // width: "100%",
                  justifyContent: "space-between",
                  mt: 2,
                }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  sx={{ m: 0.5 }}
                >
                  Submit
                </Button>
                <Button
                  type="reset"
                  onClick={() => resetForm()}
                  variant="contained"
                  fullWidth
                  sx={{ m: 0.5 }}
                >
                  Reset
                </Button>
              </Box>
            )}
          </GlassBG>
        </Box>
      </form>
    </>
  );
};

export default AddNewLedgerEntry;
