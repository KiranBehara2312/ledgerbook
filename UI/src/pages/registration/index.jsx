import React from "react";
import { TextField, Button, Box, Typography } from "@mui/material";
import { GlassBG, MyHeading } from "../../components/custom";
import Personal from "./Details/Personal";
import Communication from "./Details/Communication";
import { useForm } from "react-hook-form";
import Doctor from "./Details/Doctor";
import Payment from "./Details/Payment";

const Registration = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
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
      }}
    >
      <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
        <Box sx={{ display: "flex", gap: 1, justifyContent: "flex-end" }}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
          <Button type="reset" variant="contained" onClick={reset}>
            Reset
          </Button>
        </Box>
        <Box sx={{ display: "flex", justifyContent: "center" }}>
          <Personal control={control} errors={errors} />
          <Communication control={control} errors={errors} />
          <Doctor control={control} errors={errors} />
          <Payment control={control} errors={errors} />
        </Box>
      </form>
    </Box>
  );
};

export default Registration;
