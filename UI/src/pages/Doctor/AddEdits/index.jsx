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

const DoctorInformation = ({ setShowAddDoc }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));
  const CARD_WIDTH = isSmallScreen ? "100%" : "300px";
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    console.log(formData);
    const response = await postData("/doctor/add", formData);
    console.log(response)
  };

  const resetForm = () => {
    reset({
      gender: "", // Reset the selected option to the default
    });
  };

  return (
    <Dialog
      open={true}
      onClose={() => setShowAddDoc(false)}
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
        <span>Add Doctor</span>
        <IoCloseCircle
          size={20}
          style={{ cursor: "pointer" }}
          onClick={() => setShowAddDoc(false)}
        />
      </DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
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
                control={control}
                errors={errors}
                rules={{ required: "First Name is required" }}
                label="First Name"
              />
              <F_Input
                name="lastName"
                control={control}
                errors={errors}
                rules={{ required: "last Name is required" }}
                label="Last Name"
              />

              <F_Input
                name="dateOfBirth"
                control={control}
                errors={errors}
                type="date"
                rules={{ required: "DOB is required" }}
                label=""
                defaultHelperText="Date Of Birth"
              />

              <F_Select
                control={control}
                name={"gender"}
                label={"Gender"}
                list={GENDER_LIST}
                rules={{ required: "Gender is required" }}
                isRequired={true}
                errors={errors}
              />

              <F_Input
                name="contactNumber"
                control={control}
                errors={errors}
                rules={{
                  required: "Contact No is required",
                  pattern: {
                    value: REGEX_PATTERNS.mobileNumber,
                    message: "Invalid Contact number",
                  },
                }}
                label="Contact No"
              />

              <F_Input
                name="alternateMobileNo"
                control={control}
                errors={errors}
                rules={{
                  pattern: {
                    value: REGEX_PATTERNS.mobileNumber,
                    message: "Invalid mobile number",
                  },
                }}
                label="Alt Contact No"
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
                name={"designation"}
                label={"Designation"}
                list={DOCTOR_DESIGNATIONS}
                rules={{ required: "Designation is required" }}
                isRequired={true}
                errors={errors}
              />

              <F_Input
                name="department"
                control={control}
                errors={errors}
                rules={{
                  required: "Department is required",
                }}
                label="Department"
              />

              <F_Input
                name="specialization"
                control={control}
                errors={errors}
                rules={{
                  required: "Specialization is required",
                }}
                label="Specialization"
              />

              <F_Input
                name="qualification"
                control={control}
                errors={errors}
                rules={{
                  required: "Qualification is required",
                }}
                label="Qualification"
              />

              <F_Input
                name="medicalLicenseNumber"
                control={control}
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
                name={"shiftTimings"}
                label={"Shift Timings"}
                list={DAILY_SHIFT}
                rules={{ required: "Shift Timings is required" }}
                isRequired={true}
                errors={errors}
              />

              <F_Select
                control={control}
                name={"availableDays"}
                label={"Available Days"}
                list={WEEK_DAYS_LIST}
                rules={{ required: "Available Days is required" }}
                isRequired={true}
                errors={errors}
                multiple
              />

              <F_Input
                name="slotTime"
                control={control}
                errors={errors}
                rules={{
                  required: "Slot Time is required",
                }}
                label="Slot Time"
              />
              <F_Input
                name="fee"
                control={control}
                errors={errors}
                rules={{
                  required: "Fee is required",
                }}
                label="Fee"
              />

              <Box
                sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}
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
            </GlassBG>
          </Box>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DoctorInformation;
