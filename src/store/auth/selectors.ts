import {name} from './constants';
import {TRootState} from "../store";

export const getIsAuth = (store: TRootState) => !!store[name].data;
export const getUserData = (store: TRootState) => store[name].data;
export const getIsAuthChecking = (store: TRootState) => store[name].authChecking;
export const getRegisterSending = (store: TRootState) => store[name].registerSending;
export const getRegisterError = (store: TRootState) => store[name].registerError;
export const getLoginSending = (store: TRootState) => store[name].loginSending;
export const getLoginError = (store: TRootState) => store[name].loginError;
