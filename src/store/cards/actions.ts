import {TCardData} from "../../utils/types";
import {TThunkAPI} from "../store";
import { name } from "./constants";
import {createAsyncThunk} from "@reduxjs/toolkit";

export const loadCards = createAsyncThunk<Array<TCardData>, void, TThunkAPI>(
    `@{name}/loadCards`,
    async (_, { extra: { mestoApi}}) => {
        return await mestoApi.getCardList();
    }
);

export const addCard = createAsyncThunk<TCardData, Pick<TCardData, "name" | "link">, TThunkAPI>(
    `@{name}/addCard`,
    async (data, { extra: { mestoApi}}) => {
        return await mestoApi.addCard(data);
    }
);

export const deleteCard = createAsyncThunk<string, string, TThunkAPI>(
    `@{name}/deleteCard`,
    async (id, { extra: {mestoApi}}) => {
        await mestoApi.removeCard(id);
        return id;
    }
);

export const changeLikeCardStatus = createAsyncThunk<TCardData, {id: string, like: boolean}, TThunkAPI>(
    `@{name}/changeLikeCardStatus`,
    async ({id, like}, { extra: { mestoApi}}) => {
        return await mestoApi.changeLikeCardStatus(id, like);
    }
);

