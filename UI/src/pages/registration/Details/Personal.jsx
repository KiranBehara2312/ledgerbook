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
} from "@mui/material";
import { GlassBG, MyHeading } from "../../../components/custom";
import { REGEX_PATTERNS } from "../../../constants/Regex";
import {
  BLOOD_GROUPS,
  GENDER_LIST,
  MARITAL_STATUS,
} from "../../../constants/localDB/MastersDB";

const Personal = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (formData) => {
    console.log(formData);
  };

  return (
    <>
      <GlassBG cardStyles={{ width: "300px", m: 1, height: "auto" }}>
        <MyHeading
          alignCenter
          text="Personal Information"
          variant="h6"
          sx={{ mt: "-10px", fontSize: "15px" }}
        />

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <TextField
            {...register("firstName", { required: "First Name is required" })}
            label="First Name"
            fullWidth
            margin="normal"
            size="small"
            error={!!errors.firstName}
            autoComplete="off"
            helperText={errors.firstName ? errors.firstName.message : ""}
          />
          <TextField
            {...register("lastName", { required: "Last Name is required" })}
            label="Last Name"
            fullWidth
            margin="normal"
            size="small"
            error={!!errors.lastName}
            autoComplete="off"
            helperText={errors.lastName ? errors.lastName.message : ""}
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
            helperText={errors.dateOfBirth ? errors.dateOfBirth.message : ""}
          />

          <TextField
            {...register("gender", { required: "Gender is required" })}
            select
            label="Gender"
            fullWidth
            defaultValue={null}
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
            {...register("bloodGroup", { required: "Blood Group is required" })}
            select
            label="Blood Group"
            fullWidth
            defaultValue={null}
            helperText={errors.bloodGroup ? errors.bloodGroup.message : ""}
            error={!!errors.bloodGroup}
          >
            {BLOOD_GROUPS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            {...register("maritalStatus", {
              required: "Marital Status is required",
            })}
            select
            label="Marital Status"
            fullWidth
            defaultValue={null}
            helperText={
              errors.maritalStatus ? errors.maritalStatus.message : ""
            }
            error={!!errors.maritalStatus}
          >
            {MARITAL_STATUS.map((option) => (
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
              errors.alternateMobileNo ? errors.alternateMobileNo.message : ""
            }
          />

          {/* Submit Button */}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </GlassBG>
    </>
  );
};

export default Personal;
