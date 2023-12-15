import {TUserData} from "../../utils/types";
import {TThunkAPI} from "../store";
import { name } from "./constants";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const loadData = createAsyncThunk<TUserData, void, TThunkAPI>(
    `@{name}/loadData`,
    async (_, { extra: { mestoApi }}) => {
        return await mestoApi.getUserInfo();
    }
);

export const sendInfo = createAsyncThunk<TUserData,  Pick<TUserData, "name" | "about">, TThunkAPI>(
    `@{name}/sendInfo`,
    async (data, { extra: { mestoApi}}) => {
        return await mestoApi.setUserInfo(data);
    }
);

export const sendAvatar = createAsyncThunk<TUserData, Pick<TUserData, "avatar">, TThunkAPI>(
    `@{name}/sendAvatar`,
    async (data, { extra: { mestoApi }}) => {
        return await mestoApi.setUserAvatar(data);
    }
)