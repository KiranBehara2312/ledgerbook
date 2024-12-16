import React from "react";
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
} from "@mui/material";
import {
  GENDER_LIST,
  WEEK_DAYS_LIST,
} from "../../../constants/localDB/MastersDB";
import { REGEX_PATTERNS } from "../../../constants/Regex";
import { GlassBG, MyHeading } from "../../../components/custom";

const DoctorInformation = ({ setShowAddDoc }) => {
  const {
    register,
    handleSubmit,
    getValues,
    control,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
  };
  const resetForm = () => {
    reset({
      gender: "", // Reset the selected option to the default
    });
  };

  return (
    <>
      <Dialog
        open={true}
        onClose={() => setShowAddDoc(false)}
        fullWidth
        maxWidth={"md"}
      >
        <DialogContent>
          <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <GlassBG cardStyles={{ width: "300px", m: 1, height: "auto" }}>
                <MyHeading
                  alignCenter
                  text="Doctor Information"
                  variant="h6"
                  sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
                />

                <TextField
                  {...register("fullName", {
                    required: "Full Name is required",
                  })}
                  label="Full Name"
                  fullWidth
                  margin="normal"
                  size="small"
                  error={!!errors.fullName}
                  autoComplete="off"
                  helperText={errors.fullName ? errors.fullName.message : ""}
                />

                <TextField
                  {...register("dateOfBirth", { required: "DOB is required" })}
                  type="date"
                  fullWidth
                  placeholder=""
                  margin="normal"
                  size="small"
                  autoComplete="off"
                  error={!!errors.dateOfBirth}
                  helperText={
                    errors.dateOfBirth ? errors.dateOfBirth.message : ""
                  }
                />

                <TextField
                  {...register("gender", { required: "Gender is required" })}
                  select
                  label="Gender"
                  fullWidth
                  name="gender"
                  helperText={errors.gender ? errors.gender.message : ""}
                  error={!!errors.gender}
                >
                  {GENDER_LIST.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  {...register("contactNo", {
                    required: "Contact No is required",
                    pattern: {
                      value: REGEX_PATTERNS.mobileNumber,
                      message: "Invalid mobile number",
                    },
                  })}
                  type="text"
                  label="Contact No"
                  fullWidth
                  placeholder=""
                  margin="normal"
                  size="small"
                  autoComplete="off"
                  error={!!errors.contactNo}
                  helperText={errors.contactNo ? errors.contactNo.message : ""}
                />
                <TextField
                  {...register("alternateMobileNo", {
                    pattern: {
                      value: REGEX_PATTERNS.mobileNumber,
                      message: "Invalid mobile number",
                    },
                  })}
                  type="text"
                  label="Alt Contact No"
                  fullWidth
                  placeholder=""
                  margin="normal"
                  autoComplete="off"
                  error={!!errors.alternateMobileNo}
                  helperText={
                    errors.alternateMobileNo
                      ? errors.alternateMobileNo.message
                      : ""
                  }
                />
              </GlassBG>
              <GlassBG cardStyles={{ width: "300px", m: 1, height: "auto" }}>
                <MyHeading
                  alignCenter
                  text="Professional Information"
                  variant="h6"
                  sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
                />

                <TextField
                  {...register("designation", {
                    required: "Designation is required",
                  })}
                  label="Designation"
                  fullWidth
                  margin="normal"
                  size="small"
                  error={!!errors.designation}
                  autoComplete="off"
                  helperText={
                    errors.designation ? errors.designation.message : ""
                  }
                />

                <TextField
                  {...register("department", {
                    required: "Department is required",
                  })}
                  label="Department"
                  fullWidth
                  margin="normal"
                  size="small"
                  error={!!errors.department}
                  autoComplete="off"
                  helperText={
                    errors.department ? errors.department.message : ""
                  }
                />

                <TextField
                  {...register("specialization", {
                    required: "Specialization is required",
                  })}
                  label="Specialization"
                  fullWidth
                  margin="normal"
                  size="small"
                  error={!!errors.specialization}
                  autoComplete="off"
                  helperText={
                    errors.specialization ? errors.specialization.message : ""
                  }
                />

                <TextField
                  {...register("qualification", {
                    required: "Qualification is required",
                  })}
                  label="Qualification"
                  fullWidth
                  margin="normal"
                  size="small"
                  error={!!errors.qualification}
                  autoComplete="off"
                  helperText={
                    errors.qualification ? errors.qualification.message : ""
                  }
                />

                <TextField
                  {...register("medicalLicenseNumber", {
                    required: "Qualification is required",
                    pattern: {
                      value: REGEX_PATTERNS.MEDICAL_LICENSE_NUMBER,
                      message: "Invalid MLN",
                    },
                  })}
                  label="Medical License Number"
                  fullWidth
                  placeholder="DL-12345/2015"
                  margin="normal"
                  size="small"
                  error={!!errors.medicalLicenseNumber}
                  autoComplete="off"
                  helperText={
                    errors.medicalLicenseNumber
                      ? errors.medicalLicenseNumber.message
                      : ""
                  }
                />
              </GlassBG>
              <GlassBG cardStyles={{ width: "300px", m: 1, height: "auto" }}>
                <MyHeading
                  alignCenter
                  text="Shift & Fee Information"
                  variant="h6"
                  sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
                />

                <TextField
                  {...register("shiftTimings", {
                    required: "Shift Timings is required",
                  })}
                  label="Shift Timings"
                  fullWidth
                  margin="normal"
                  size="small"
                  error={!!errors.shiftTimings}
                  autoComplete="off"
                  helperText={
                    errors.shiftTimings ? errors.shiftTimings.message : ""
                  }
                />

                <TextField
                  {...register("availableDays", {
                    required: "Available Days is required",
                  })}
                  select
                  label="Available Days"
                  fullWidth
                  defaultValue={''}
                  helperText={
                    errors.availableDays ? errors.availableDays.message : ""
                  }
                  error={!!errors.availableDays}
                >
                  {WEEK_DAYS_LIST.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>

                <TextField
                  {...register("slotTime", {
                    required: "slot Time is required",
                  })}
                  label="Slot Time"
                  fullWidth
                  margin="normal"
                  size="small"
                  error={!!errors.slotTime}
                  autoComplete="off"
                  helperText={errors.slotTime ? errors.slotTime.message : ""}
                />

                <TextField
                  {...register("fee", {
                    required: "Fee is required",
                    pattern: {
                      value: REGEX_PATTERNS.POSITIVE_NUMBER_ONLY,
                      message: "Amount is invalid",
                    },
                  })}
                  label="Fee"
                  fullWidth
                  margin="normal"
                  size="small"
                  error={!!errors.fee}
                  autoComplete="off"
                  helperText={errors.fee ? errors.fee.message : ""}
                />

                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
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
                    onClick={() => reset()}
                    variant="contained"
                    fullWidth
                    sx={{ m: 0.5 }}
                  >
                    Reset
                  </Button>
                  <Button
                    variant="contained"
                    color="error"
                    onClick={() => setShowAddDoc(false)}
                    fullWidth
                    sx={{ m: 0.5 }}
                  >
                    Close
                  </Button>
                </Box>
              </GlassBG>
            </Box>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DoctorInformation;
