import React, { useEffect, useState } from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { GlassBG, MyHeading } from "../../components/custom";
import Personal from "./Details/Personal";
import Communication from "./Details/Communication";
import { useForm } from "react-hook-form";
import Doctor from "./Details/Doctor";
import Payment from "./Details/Payment";
import Primary from "./Details/Primary";
import { formatDate, successAlert } from "../../helpers";
import { REGISTRATION_CHARGES } from "../../constants/localDB/PaymentServices";
import { postData } from "../../helpers/http";
import HeaderWithSearch from "../../components/custom/HeaderWithSearch";
import IconWrapper from "../../components/custom/IconWrapper";
import { FaUserPlus } from "react-icons/fa";

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
  salutation: "",
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

  const getPaymentDetails = (formData) => {
    const paymentDate = formatDate("DD/MM/YYYY hh:mm:ss");
    const DOC_CONSULT_CHARGES = {
      serviceName: "Doctor Consultation Charges",
      serviceAmount: +formData.doctorConsultationFee,
      discountAppliedinPercent: 0,
      payeeName: formData.payeeName,
      paymentType: formData.paymentType,
      transactionId: formData.transactionId,
      paymentDate,
    };
    return [
      {
        ...REGISTRATION_CHARGES,
        payeeName: formData.payeeName,
        paymentType: formData.paymentType,
        transactionId: formData.transactionId,
        paymentDate,
      },
      DOC_CONSULT_CHARGES,
    ];
  };

  const onSubmit = async (formData) => {
    const payload = {
      ...formData,
      payments: getPaymentDetails(formData),
    };
    // /registration/create
    const response = await postData("/registration/create", payload);
    successAlert(response.message, { autoClose: 1500 });
  };
  return (
    <>
      <Box
        sx={{
          width: "100%",
          minHeight: "94%",
          height: "94%",
        }}
      >
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <HeaderWithSearch
            headerText="Registration"
            hideSearchBar
            headerIcon={<IconWrapper icon={<FaUserPlus size={20} />} />}
            html={
              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                <Button size="small" type="submit" variant="outlined">
                  Submit
                </Button>
                <Button
                  size="small"
                  type="button"
                  variant="outlined"
                  onClick={resetForm}
                >
                  Reset
                </Button>
              </Box>
            }
          />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Primary
              control={control}
              errors={errors}
              formValues={formValues}
            />
            <Personal
              control={control}
              errors={errors}
              formValues={formValues}
            />
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
    </>
  );
};

export default Registration;
