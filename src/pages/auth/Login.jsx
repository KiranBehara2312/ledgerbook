import React from "react";
import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { GlassBG, MyHeading } from "../../components/custom";
import { useNavigate } from "react-router-dom";
import { postData } from "../../helpers/http";
import { successAlert } from "../../helpers";
import { useDispatch } from "react-redux";
import { setUserDetails } from "../../redux/slices/userDetailsSlice";
import { auth } from "../../firebaseConfig";
import {
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async ({ userName, password }) => {
    const loginObj = {
      userName,
      password,
    };
    const response = await signInWithEmailAndPassword(auth, userName, password);
    console.log(response);
    const welcomeMsg = `Welcome ${response?.user?.email}`;
    successAlert(welcomeMsg, { autoClose: 1500 });
    dispatch(setUserDetails(response?.user?.accessToken));
    localStorage.setItem("authToken", response?.user?.accessToken);
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
        <MyHeading
          alignCenter
          text="Login to My Ledger Book"
          variant="h6"
          sx={{ mb: 1, mt: -1 }}
        />
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: "100%" }}>
          <TextField
            {...register("userName", { required: "User Name is required" })}
            label="User Name"
            fullWidth
            margin="normal"
            size="small"
            error={!!errors.userName}
            autoComplete="off"
            helperText={errors.userName ? errors.userName.message : ""}
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

          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Submit
          </Button>
          {/* <Button
            type="button"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => navigate("/auth/signup")}
          >
            Register? Click here
          </Button> */}
        </form>
      </GlassBG>
    </Box>
  );
};

export default Login;
