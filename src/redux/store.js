import { configureStore } from "@reduxjs/toolkit";
import userDetailsReducer from "./slices/userDetailsSlice";

export const store = configureStore({
  reducer: {
    userDetails: userDetailsReducer,
  },
});
