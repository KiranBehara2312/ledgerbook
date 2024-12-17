import React, { Fragment } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  TextField,
  Button,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
  FormHelperText,
  Dialog,
  DialogContent,
  DialogActions,
  Box,
  useMediaQuery,
  useTheme,
  DialogTitle,
} from "@mui/material";
import {
  DAILY_SHIFT,
  DOCTOR_DESIGNATIONS,
  GENDER_LIST,
  WEEK_DAYS_LIST,
} from "../../../constants/localDB/MastersDB";
import { REGEX_PATTERNS } from "../../../constants/Regex";
import { GlassBG, MyHeading } from "../../../components/custom";
import F_Select from "../../../components/custom/form/F_Select";
import F_Input from "../../../components/custom/form/F_Input";
import { IoCloseCircle } from "react-icons/io5";
import { postData } from "../../../helpers/http";
import { successAlert } from "../../../helpers";

const DoctorInformation = ({
  setShowAddDoc,
  docObj = { action: "New", data: [] },
}) => {
  const theme = useTheme();
  const disabledState = docObj?.action === "View";
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const CARD_WIDTH = isSmallScreen ? "100%" : "300px";
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    const response = await postData("/doctor/add", formData);
    successAlert(response.message, { autoClose: 1500 });
    setShowAddDoc({
      show: false,
      rerender: true,
    });
  };
  const onUpdate = async (formData) => {
    const response = await postData(
      `/doctor/update/${docObj?.data?.userName}`,
      formData
    );
    successAlert(response.message, { autoClose: 1500 });
    setShowAddDoc({
      show: false,
      rerender: true,
    });
  };

  return (
    <Dialog
      open={true}
      onClose={() =>
        setShowAddDoc({
          show: false,
          rerender: false,
        })
      }
      fullWidth
      maxWidth={"md"}
    >
      <DialogTitle
        sx={{
          m: 0,
          p: 1,
          pl: 2,
          pr: 2,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <span>
          {docObj?.action ?? "Add"} Doctor{" "}
          {docObj?.action !== "Add" ? ` - (${docObj?.data?.userName})` : ""}
        </span>
        <IoCloseCircle
          size={20}
          style={{ cursor: "pointer" }}
          onClick={() =>
            setShowAddDoc({
              show: false,
              rerender: false,
            })
          }
        />
      </DialogTitle>
      <DialogContent>
        <form
          onSubmit={handleSubmit(
            docObj?.action === "Add" ? onSubmit : onUpdate
          )}
          style={{ width: "100%" }}
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
                text="Doctor Information"
                variant="h6"
                sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
              />
              <F_Input
                name="firstName"
                isDisabled={disabledState}
                control={control}
                errors={errors}
                rules={{ required: "First Name is required" }}
                label="First Name"
                defaultValue={docObj?.data?.["firstName"] ?? ""}
              />
              <F_Input
                name="lastName"
                isDisabled={disabledState}
                control={control}
                errors={errors}
                rules={{ required: "Last Name is required" }}
                label="Last Name"
                defaultValue={docObj?.data?.["lastName"] ?? ""}
              />

              <F_Input
                name="dateOfBirth"
                isDisabled={disabledState}
                control={control}
                errors={errors}
                type="date"
                rules={{ required: "DOB is required" }}
                label=""
                defaultHelperText="Date Of Birth"
                defaultValue={docObj?.data?.["dateOfBirth"] ?? ""}
              />

              <F_Select
                control={control}
                name={"gender"}
                isDisabled={disabledState}
                label={"Gender"}
                list={GENDER_LIST}
                rules={{ required: "Gender is required" }}
                isRequired={true}
                errors={errors}
                defaultValue={docObj?.data?.["gender"] ?? ""}
              />

              <F_Input
                name="contactNumber"
                control={control}
                isDisabled={disabledState}
                errors={errors}
                rules={{
                  required: "Contact No is required",
                  pattern: {
                    value: REGEX_PATTERNS.mobileNumber,
                    message: "Invalid Contact number",
                  },
                }}
                label="Contact No"
                defaultValue={docObj?.data?.["contactNumber"] ?? ""}
              />

              <F_Input
                name="alternateMobileNo"
                control={control}
                isDisabled={disabledState}
                errors={errors}
                rules={{
                  pattern: {
                    value: REGEX_PATTERNS.mobileNumber,
                    message: "Invalid mobile number",
                  },
                }}
                label="Alt Contact No"
                defaultValue={docObj?.data?.["alternateMobileNo"] ?? ""}
              />
            </GlassBG>
            <GlassBG cardStyles={{ width: CARD_WIDTH, m: 1, height: "auto" }}>
              <MyHeading
                alignCenter
                text="Professional Information"
                variant="h6"
                sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
              />

              <F_Select
                control={control}
                isDisabled={disabledState}
                name={"designation"}
                label={"Designation"}
                list={DOCTOR_DESIGNATIONS}
                rules={{ required: "Designation is required" }}
                isRequired={true}
                errors={errors}
                defaultValue={docObj?.data?.["designation"] ?? ""}
              />

              <F_Input
                name="department"
                control={control}
                isDisabled={disabledState}
                errors={errors}
                rules={{
                  required: "Department is required",
                }}
                label="Department"
                defaultValue={docObj?.data?.["department"] ?? ""}
              />

              <F_Input
                name="specialization"
                control={control}
                isDisabled={disabledState}
                errors={errors}
                rules={{
                  required: "Specialization is required",
                }}
                label="Specialization"
                defaultValue={docObj?.data?.["specialization"] ?? ""}
              />

              <F_Input
                name="qualification"
                control={control}
                isDisabled={disabledState}
                errors={errors}
                rules={{
                  required: "Qualification is required",
                }}
                label="Qualification"
                defaultValue={docObj?.data?.["qualification"] ?? ""}
              />

              <F_Input
                name="medicalLicenseNumber"
                control={control}
                isDisabled={disabledState}
                errors={errors}
                defaultHelperText={"Ex: DL-12345/2020"}
                rules={{
                  required: "Medical License Number is required",
                  pattern: {
                    value: REGEX_PATTERNS.MEDICAL_LICENSE_NUMBER,
                    message: "Invalid MLN",
                  },
                }}
                label="Medical License Number"
                defaultValue={docObj?.data?.["medicalLicenseNumber"] ?? ""}
              />
            </GlassBG>

            <GlassBG cardStyles={{ width: CARD_WIDTH, m: 1, height: "auto" }}>
              <MyHeading
                alignCenter
                text="Shift & Fee Information"
                variant="h6"
                sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
              />

              <F_Select
                control={control}
                isDisabled={disabledState}
                name={"shiftTimings"}
                label={"Shift Timings"}
                list={DAILY_SHIFT}
                rules={{ required: "Shift Timings is required" }}
                isRequired={true}
                errors={errors}
                defaultValue={docObj?.data?.["shiftTimings"] ?? ""}
              />

              <F_Select
                control={control}
                isDisabled={disabledState}
                name={"availableDays"}
                label={"Available Days"}
                list={WEEK_DAYS_LIST}
                rules={{ required: "Available Days is required" }}
                isRequired={true}
                errors={errors}
                multiple
                defaultValue={docObj?.data?.["availableDays"] ?? []}
              />

              <F_Input
                name="slotTime"
                control={control}
                isDisabled={disabledState}
                errors={errors}
                rules={{
                  required: "Slot Time is required",
                }}
                label="Slot Time"
                defaultValue={docObj?.data?.["slotTime"] ?? ""}
              />
              <F_Input
                name="fee"
                control={control}
                isDisabled={disabledState}
                errors={errors}
                rules={{
                  required: "Fee is required",
                }}
                label="Fee"
                defaultValue={docObj?.data?.["fee"] ?? ""}
              />

              {docObj.action !== "View" && (
                <Box
                  sx={{
                    display: "flex",
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
      </DialogContent>
    </Dialog>
  );
};

export default DoctorInformation;
