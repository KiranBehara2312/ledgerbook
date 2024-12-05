import { createSlice } from "@reduxjs/toolkit";

export const userProfileSlice = createSlice({
  name: "userProfile",
  initialState: {
    user: null,
  },
  reducers: {
    setuserProfile: (state, { payload }) => {
      state.user = payload;
    },
    getUserProfile: (state) => {
      return state.user;
    },
  },
});

export const { setuserProfile, getUserProfile } = userProfileSlice.actions;

export default userProfileSlice.reducer;
