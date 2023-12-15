import {addCard, changeLikeCardStatus, deleteCard, loadCards} from "./actions";
import {TCardData} from "../../utils/types";
import { name } from "./constants";
import {createSlice} from "@reduxjs/toolkit";

type TCardInitialState = {
  data: Array<TCardData>,
  loading: boolean,
  loadError: string,
  isSending: boolean,
  sendError: string
}

const initialState: TCardInitialState = {
  data: [],
  loading: false,
  loadError: "",
  isSending: false,
  sendError: "",
};

const cardSlice = createSlice({
  name,
  initialState,
  reducers: {},
  extraReducers: (builder) => {

    builder.addCase(loadCards.pending, (state) => {
      state.loading = true;
      state.loadError = "";
    });
    builder.addCase(loadCards.fulfilled, (state, action) => {
      state.data = action.payload;
      state.loading = false;
    });
    builder.addCase(loadCards.rejected, (state, action) => {
      state.loading = false;
      state.loadError = action.error.message || "Ошибка при загрузке карточек";
    });

    builder.addCase(addCard.pending, (state, action) => {
      state.isSending = true;
      state.sendError = "";
    });

    builder.addCase(addCard.fulfilled, (state, action) => {
      state.data.unshift(action.payload);
      state.isSending = false;
    });

    builder.addCase(addCard.rejected, (state, action) => {
      state.isSending = false;
      state.sendError = action.error.message || "Ошибка при добавлении карточки";
    });

    builder.addCase(deleteCard.fulfilled, (state, action) => {
      state.data = state.data.filter((c) => c._id !== action.payload);
    });

    builder.addCase(changeLikeCardStatus.fulfilled, (state, action) => {
      state.data = state.data.map((c) => {
        return c._id === action.payload._id ? action.payload : c
      });
    });
  },
})

export default cardSlice.reducer;