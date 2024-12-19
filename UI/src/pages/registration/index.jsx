import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { GlassBG, MyHeading } from "../../components/custom";
import Personal from "./Details/Personal";
import Communication from "./Details/Communication";
import { useForm } from "react-hook-form";
import Doctor from "./Details/Doctor";
import Payment from "./Details/Payment";
import Primary from "./Details/Primary";
import { formatDate } from "../../helpers";

const DEFAULT_VAL = {
  UHID: "",
  registrationDate: formatDate("DD/MM/YYYY HH:mm"),
  addressLineOne: "",
  addressLineTwo: "",
  alternateMobileNo: "",
  bloodGroup: "",
  contactNumber: "",
  dateOfBirth: "",
  doctor: "",
  firstName: "",
  gender: "",
  lastName: "",
  maritalStatus: "",
  middleName: "",
  patientNo: "",
  patientType: "Out Patient",
  payeeName: "",
  paymentType: "",
  pinCode: "",
  registrationType: "New",
  salutation: "",
  state: "",
  transactionId: "",
  doctorConsultationFee: 0,
  visitType: "New Case",
  paymentStatus: "",
  payments: [],
};

const Registration = () => {
  const {
    register,
    handleSubmit,
    control,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: DEFAULT_VAL,
  });
  const formValues = watch();

  useEffect(() => {
    const interval = setInterval(() => {
      setValue("registrationDate", formatDate("DD/MM/YYYY HH:mm"));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  const resetForm = () => {
    reset(DEFAULT_VAL);
  };
  const onSubmit = (formData) => {
    console.log(formData);
  };
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "94%",
        height: "94%",
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
          <Button type="button" variant="contained" onClick={resetForm}>
            Reset
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Primary control={control} errors={errors} formValues={formValues} />
          <Personal control={control} errors={errors} formValues={formValues} />
          <Communication
            control={control}
            errors={errors}
            formValues={formValues}
          />
          <Doctor
            control={control}
            errors={errors}
            formValues={formValues}
            setValue={setValue}
          />
          <Payment
            control={control}
            errors={errors}
            formValues={formValues}
            setValue={setValue}
          />
        </Box>
      </form>
    </Box>
  );
};

export default Registration;
