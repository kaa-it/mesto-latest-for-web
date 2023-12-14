import {TAuthData} from "../../utils/types";
import {TAppThunk, TThunkAPI} from "../store";
import {createAsyncThunk} from "@reduxjs/toolkit";
import {setUserData} from "./reducer";
import { name } from "./constants";

export const register = createAsyncThunk<TAuthData, Required<TAuthData>, TThunkAPI>(
    `${name}/register`,
    async ({email, password}, {extra: {authApi}}) => {
        return authApi.register(email, password);
    }
);

export const login = createAsyncThunk<{ email: string }, Required<TAuthData>, TThunkAPI>(
    `${name}/login`,
    async ({email, password}, {extra: {authApi}}) => {
        const res = await authApi.login(email, password);
        localStorage.setItem("jwt", res.token);
        return {email};
    }
)

export const checkAuth = createAsyncThunk<TAuthData, void, TThunkAPI>(
    `${name}/checkAuth`,
    async (_, { extra: { authApi } }) => {
        const token = localStorage.getItem("jwt");
        if (token) {
            const res = await authApi.checkToken(token);
            return res.data;
        }
        return Promise.reject("Нет токена");
    }
)

export const signOut = (): TAppThunk => (dispatch) => {
    dispatch(setUserData(null));
    localStorage.removeItem("jwt");
};
