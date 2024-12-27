import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";

export const userDetailsSlice = createSlice({
  name: "userDetails",
  initialState: {
    user: null,
  },
  reducers: {
    setUserDetails: (state, { payload }) => {
      let decodedToken = jwtDecode(payload);
      const issuedAt = new Date(decodedToken.iat * 1000).toLocaleString();
      const expiration = new Date(decodedToken.exp * 1000).toLocaleString();
      const newObj = { ...decodedToken, iat: issuedAt, exp: expiration };
      state.user = newObj;
    },
    getUserDetails: (state) => {
      return state.user;
    },
    emptyUserDetails: (state) => {
      state.user = null;
    },
  },
});

export const { setUserDetails, getUserDetails, emptyUserDetails } =
  userDetailsSlice.actions;

export default userDetailsSlice.reducer;
