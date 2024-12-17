import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { GlassBG, MyHeading } from "../../components/custom";
import Personal from "./Details/Personal";
import Communication from "./Details/Communication";
import { useForm } from "react-hook-form";

const Registration = () => {
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
    <Box
      sx={{
        width: "100%",
        minHeight: "94%",
        height: "94%",

        // alignItems: "center",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ width: "100%", display: "flex", justifyContent: "center" }}
      >
        <Personal control={control} errors={errors} />
        <Communication control={control} errors={errors} />
      </form>
    </Box>
  );
};

export default Registration;
