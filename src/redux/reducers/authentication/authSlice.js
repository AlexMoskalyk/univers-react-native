import { createSlice } from "@reduxjs/toolkit";
import {
  registerDB,
  loginDB,
  logoutDB,
  updateAvatarDB,
} from "./authOperations";

const initialState = {
  user: { login: null, email: null, userId: "", photo: "" },
  error: null,
  isLogged: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearUserInfo(state) {
      state.user = { login: null, email: null, userId: "", photo: "" };
      state.isLogged = false;
    },

    setUserInfo(state, action) {
      state.user = action.payload;
      state.isLogged = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerDB.fulfilled, (state, action) => {
        state.isLogged = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerDB.rejected, (state, action) => {
        state.isLogged = false;
        state.error = action.payload;
      })
      .addCase(loginDB.fulfilled, (state, action) => {
        state.isLogged = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginDB.rejected, (state, action) => {
        state.isLogged = false;
        state.error = action.payload;
      })
      .addCase(logoutDB.fulfilled, (state) => {
        state.user = { login: null, email: null, userId: "", photo: "" };
        state.isLogged = false;
        state.error = null;
      })
      .addCase(updateAvatarDB.fulfilled, (state, action) => {
        state.user.photo = action.payload.photo;
        state.error = null;
      })
      .addCase(updateAvatarDB.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export const authReducer = authSlice.reducer;

export const { clearUserInfo, setUserInfo } = authSlice.actions;
