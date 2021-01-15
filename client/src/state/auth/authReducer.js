import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  name: "auth",
  initialState: { currentUser: "" },
  reducers: {
    signup: (state, action) => {
      state.currentUser = action.payload;
    },
    login: (state, action) => {
      state.currentUser = action.payload;
    },
    logout: (state) => {
      state.currentUser = "";
    },
  },
});
