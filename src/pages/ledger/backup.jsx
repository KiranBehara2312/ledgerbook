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

const AddNewLedgerEntry = ({
  dialogCloseBtn = null,
  setShowDialog = () => {},
  headerText = "Ledger Entry",
  selectedRow = null,
  action = null,
}) => {
  const theme = useTheme();
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [imageData, setImageData] = useState({
    base64Image: null,
    fileName: null,
    fileSize: null,
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
      let imageBlobURL = null;
      let imageBlobURL2 = base64ToBlobUrl(selectedRow?.image) ?? null;
      const imageTag = document.getElementById("addNewLedgerSrc");
      console.log(imageBlobURL2, "blob");
      imageTag.appendChild(image);
      setTimeout(() => {
        document.getElementById("addNewLedgerSrc").src = imageBlobURL2;
      }, 200);
    }
  }, [selectedRow]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const sizeInKilobytes = (file.size / 1024).toFixed(2);
      const sizeInMegabytes = (sizeInKilobytes / 1024).toFixed(2);
      if (sizeInMegabytes > 5) {
        return warnAlert("File size should be less than 5MB");
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageData({
          base64Image: reader.result,
          fileName: file.name,
          fileSize:
            sizeInKilobytes > 1024
              ? `${sizeInMegabytes} MB`
              : `${sizeInKilobytes} KB`,
        });
      };

      // Read the file as a data URL (Base64)
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = async (formData) => {
    saveNewLedger(formData);
    successAlert("Ledger Added...!", { autoClose: 1500 });
    setShowDialog({
      show: false,
      rerender: true,
    });
  };

  const dropBoxSuccessHandler = (files) => {
    const thumbnailLink = files[0].thumbnailLink;
    setThumbnailUrl(thumbnailLink);
  };

  const saveNewLedger = async (formData) => {
    const obj = {
      ...formData,
      uuid: crypto.randomUUID(),
      thumbnailUrl: thumbnailUrl,
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
  };

  const onUpdate = async (formData) => {
    const response = await postData(
      `/doctor/update/${selectedRow?.userName}`,
      formData
    );
    successAlert(response.message, { autoClose: 1500 });
    setShowDialog({
      show: false,
      rerender: true,
    });
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

            <label for="file-upload" class="custom-file-upload">
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
                <IconWrapper defaultColor icon={<FaUpload size={20} />} />
                <MyHeading text="Upload Image" variant="body1" sx={{ pl: 1 }} />
                <br />
                <MyHeading
                  text="PNG / JPG / JPEG"
                  variant="caption"
                  sx={{ pl: 1, pt: 0.5 }}
                />
              </Box>
            </label>

            <input
              id="file-upload"
              type="file"
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleImageUpload}
            />

            <DropboxChooser
              appKey={"2o0gkpgvmb2d2w7"}
              success={(files) => dropBoxSuccessHandler(files)}
              cancel={() => this.onCancel()}
              multiselect={false}
              extensions={[".png", ".jpeg", ".jpg"]}
            >
              <div className="dropbox-button">Click me!</div>
            </DropboxChooser>

            {imageData.fileName && (
              <Alert
                sx={{ mt: 1 }}
                variant="outlined"
                severity="info"
                onClose={() =>
                  setImageData({
                    base64Image: null,
                    fileName: null,
                    fileSize: null,
                  })
                }
              >
                <MyHeading
                  text={`${imageData.fileName} (${imageData.fileSize})`}
                  variant="body2"
                />
              </Alert>
            )}
            {selectedRow?.image !== null && (
              <img
                id="addNewLedgerSrc"
                width={"100%"}
                height={"450px"}
                style={{ borderRadius: "10px", marginTop: "10px" }}
                alt={selectedRow?.fileName ?? "File Name"}
              />
            )}
            {imageData.base64Image !== null && (
              <img
                src={imageData.base64Image}
                width={"100%"}
                height={"450px"}
                style={{ borderRadius: "10px", marginTop: "10px" }}
                alt={imageData?.fileName ?? "File Name"}
              />
            )}
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
