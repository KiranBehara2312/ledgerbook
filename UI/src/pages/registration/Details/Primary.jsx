import React from "react";
import { GlassBG, MyHeading } from "../../../components/custom";
import {
  PATIENT_TYPES,
  REGISTRATION_TYPES,
  VISIT_TYPES,
} from "../../../constants/localDB/MastersDB";
import F_Input from "../../../components/custom/form/F_Input";
import F_Select from "../../../components/custom/form/F_Select";
import { InputAdornment } from "@mui/material";
import { FaSearch } from "react-icons/fa";

const Primary = ({ control, errors, readOnly = "" }) => {
  return (
    <>
      <GlassBG cardStyles={{ width: "240px", m: 1, height: "auto" }}>
        <MyHeading
          alignCenter
          text="Primary Information"
          variant="h6"
          sx={{ mt: "-10px", fontSize: "15px", fontWeight: "bold" }}
        />

        <F_Input
          name="registrationDate"
          control={control}
          errors={errors}
          rules={{}}
          label="Registration Date"
          isDisabled
        />

        <F_Select
          control={control}
          name={"patientType"}
          label={"Patient Type"}
          list={PATIENT_TYPES}
          rules={{ required: "Patient Type is required" }}
          defaultValue={"Out Patient" ?? ""}
          isRequired={true}
          errors={errors}
          isDisabled={readOnly === "View"}
          readOnly={readOnly === "View"}
        />
        <F_Select
          control={control}
          name={"registrationType"}
          label={"Registration Type"}
          list={REGISTRATION_TYPES}
          rules={{ required: "Registration Type is required" }}
          defaultValue={"New" ?? ""}
          isRequired={true}
          errors={errors}
          isDisabled={readOnly === "View"}
          readOnly={readOnly === "View"}
        />
        <F_Select
          control={control}
          name={"visitType"}
          label={"Visit Type"}
          list={VISIT_TYPES}
          rules={{ required: "Visit Type is required" }}
          defaultValue={"New Case" ?? ""}
          isRequired={true}
          errors={errors}
          isDisabled={readOnly === "View"}
          readOnly={readOnly === "View"}
        />
        <F_Input
          name="UHID"
          control={control}
          errors={errors}
          rules={{}}
          label="UHID"
          readOnly={readOnly === "Edit" || readOnly === "View"}
          isDisabled={readOnly === "Edit" || readOnly === "View"}
          endAdornment={
            <InputAdornment
              position="start"
              sx={{ cursor: "pointer" }}
              onClick={() => alert("Hi")}
            >
              <FaSearch />
            </InputAdornment>
          }
          defaultHelperText="Type UHID and hit enter to load data"
        />
        <F_Input
          name="patientNo"
          control={control}
          errors={errors}
          rules={{}}
          label="Patient No"
          defaultHelperText="Type PatientNo and hit enter to load data"
          readOnly={readOnly === "Edit" || readOnly === "View"}
          isDisabled={readOnly === "Edit" || readOnly === "View"}
          endAdornment={
            <InputAdornment
              position="start"
              sx={{ cursor: "pointer" }}
              onClick={() => alert("Hi")}
            >
              <FaSearch />
            </InputAdornment>
          }
        />
      </GlassBG>
    </>
  );
};

export default Primary;
