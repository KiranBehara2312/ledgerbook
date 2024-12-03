import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { GlassBG, MyHeading } from "../../components/custom";
import { formatDate, setUserInfoInSStorage } from "../../helpers";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = ({ username, password }) => {
    const userObj = {
      uid: crypto.randomUUID(),
      userName: username,
      password: window.btoa(password),
      loggedInTime: formatDate("dd/MM/yyyy"),
    };
    setUserInfoInSStorage(userObj)
    navigate("/pages/home");
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <GlassBG cardStyles={{ width: "300px", height: "auto" }}>
        <MyHeading alignCenter text="Login" variant="h5" />

        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <TextField
            {...register("username", { required: "User Name is required" })}
            label="User Name"
            fullWidth
            margin="normal"
            size="small"
            error={!!errors.username}
            autoComplete="off"
            helperText={errors.username ? errors.username.message : ""}
          />

          <TextField
            {...register("password", { required: "Password is required" })}
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            size="small"
            autoComplete="off"
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
          />

          {/* Submit Button */}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
        </form>
      </GlassBG>
    </Box>
  );
};

export default Login;
