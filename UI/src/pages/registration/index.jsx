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

const Registration = ({
  dialogCloseBtn = null,
  headerText = "Registration",
  selectedPatient = null,
  action = null,
  setShowPatientRegn = () => {},
}) => {
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
    mode: "all",
    reValidateMode: "onBlur",
  });
  const formValues = watch();

  useEffect(() => {
    if (selectedPatient !== null) return;
    const interval = setInterval(() => {
      setValue("registrationDate", formatDate("DD/MM/YYYY HH:mm"));
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [selectedPatient]);

  useEffect(() => {
    if (selectedPatient !== null) {
      Object.entries(selectedPatient)?.map(([key, val], index) => {
        setValue(key, val, {
          shouldValidate: true,
          shouldTouch: true,
          shouldDirty: true,
        });
      });
    }
  }, [selectedPatient]);

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

  const onUpdate = async (formData) => {
    const response = await postData(
      `/registration/update/${selectedPatient?.UHID}`,
      formData
    );
    successAlert(response.message, { autoClose: 1500 });
    setShowPatientRegn({
      show: false,
      rerender: true,
    });
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
        <form
          onSubmit={handleSubmit(action === "Edit" ? onUpdate : onSubmit)}
          style={{ width: "100%" }}
        >
          <HeaderWithSearch
            headerText={headerText}
            hideSearchBar
            headerIcon={<IconWrapper icon={<FaUserPlus size={20} />} />}
            html={
              <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
                {action !== "View" && (
                  <>
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
                  </>
                )}
                {dialogCloseBtn}
              </Box>
            }
          />

          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Primary
              control={control}
              errors={errors}
              formValues={formValues}
              readOnly={action}
            />
            <Personal
              control={control}
              errors={errors}
              formValues={formValues}
              readOnly={action === "View"}
            />
            <Communication
              control={control}
              errors={errors}
              formValues={formValues}
              readOnly={action === "View"}
            />
            <Doctor
              control={control}
              errors={errors}
              formValues={formValues}
              readOnly={action === "View" || action === "Edit"}
              setValue={setValue}
            />
            {selectedPatient === null && (
              <Payment
                control={control}
                errors={errors}
                formValues={formValues}
                setValue={setValue}
              />
            )}
          </Box>
        </form>
      </Box>
    </>
  );
};

export default Registration;
