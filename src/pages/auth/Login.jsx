import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import GlassBG from "../../components/custom";
import MyHeading from "../../components/custom/MyHeading";
import { useForm } from "react-hook-form";

const Login = () => {
  const [userName, setUserName] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        width: "100%",
      }}
    >
      <GlassBG cardStyles={{ height: "300px", width: "300px" }}>
        <MyHeading text="Login" alignCenter />
        <TextField
          error={errors.userName}
          label="User Name"
          defaultValue="Ex: John Doe"
          {...register("userName", { required: "User Name is required" })}
          helperText={errors.userName && "User Name is mandatory"}
        />
       <TextField
          error={errors.userName}
          label="User Name"
          defaultValue="Ex: John Doe"
          {...register("userName", { required: "User Name is required" })}
          helperText={errors.userName && "User Name is mandatory"}
        />
      </GlassBG>
    </Box>
  );
};

export default Login;
