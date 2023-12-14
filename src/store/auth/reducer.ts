import { register, login, checkAuth } from "./actions";
import { TAuthData } from "../../utils/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { name } from "./constants";

type TAuthInitialState = {
  data: TAuthData | null;
  authChecking: boolean;
  registerSending: boolean;
  registerError: string;
  loginSending: boolean;
  loginError: string;
};

const initialState: TAuthInitialState = {
  data: null,
  authChecking: true,
  registerSending: false,
  registerError: "",
  loginSending: false,
  loginError: "",
};

const authSlice = createSlice({
  name,
  initialState,
  reducers: {
    setUserData(state, action: PayloadAction<TAuthData | null>) {
      state.data = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(register.pending, (state) => {
      state.registerSending = true;
    });
    builder.addCase(register.fulfilled, (state) => {
      state.registerSending = false;
      state.registerError = "";
    });
    builder.addCase(register.rejected, (state, action) => {
      state.registerSending = false;
      state.registerError = action.error.message ?? "Ошибка регистрации";
    });

    builder.addCase(login.pending, (state) => {
      state.loginSending = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      state.loginSending = false;
      state.loginError = "";
      state.data = {
        email: action.payload.email
      };
    });
    builder.addCase(login.rejected, (state, action) => {
      state.loginSending = false;
      state.loginError = action.error.message ?? "Ошибка авторизации";
    });

    builder.addCase(checkAuth.pending, (state) => {
      state.authChecking = true;
    });
    builder.addCase(checkAuth.fulfilled, (state, action) => {
      state.authChecking = false;
      state.data = action.payload;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.authChecking = false;
    });
  }
})

export const { setUserData } = authSlice.actions;

export default authSlice.reducer;

type TAuthActionCreators = typeof authSlice.actions

export type TAuthActions = ReturnType<TAuthActionCreators[keyof TAuthActionCreators]>;