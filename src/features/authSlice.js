import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  getCurrentUser,
} from "../utils/localStorage";


const initialState = {
  user: getCurrentUser(),
  loggedIn: false,
  userProfile: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.loggedIn = true;
    },
    logout: (state) => {
      state.user = null;
      state.loggedIn = false;
    },
    login: (state, action) => {
      state.user = action.payload;
      state.loggedIn = true;
    },
    register: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser, logout, login, register } = authSlice.actions;
export default authSlice.reducer;
