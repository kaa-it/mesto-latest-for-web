import {loadData, sendAvatar, sendInfo} from "./actions";
import {TUserData} from "../../utils/types";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { name } from "./constants";

type TUserInitialState = {
  data: TUserData | null,
  dataLoading: boolean,
  loadError: string,
  infoSending: boolean,
  infoSendError: string,
  avatarSending: boolean,
  avatarSendError: string
}

const initialState: TUserInitialState = {
  data: null,
  dataLoading: false,
  loadError: "",
  infoSending: false,
  infoSendError: "",
  avatarSending: false,
  avatarSendError: "",
};

const currentUserSlice = createSlice({
  name,
  initialState,
  reducers: {
    setData(state, action: PayloadAction<TUserData>) {
      state.data = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loadData.pending, (state) => {
      state.dataLoading = true;
      state.loadError = "";
    });
    builder.addCase(loadData.fulfilled, (state, action) => {
      state.data = action.payload;
      state.dataLoading = false;
    });
    builder.addCase(loadData.rejected, (state, action) => {
      state.dataLoading = false;
      state.loadError = action.error.message || "Ошибка при получении данных пользователя";
    });

    builder.addCase(sendInfo.pending, (state) => {
      state.infoSending = true;
      state.infoSendError = "";
    });
    builder.addCase(sendInfo.fulfilled, (state, action) => {
      state.data = action.payload;
      state.infoSending = false;
    });
    builder.addCase(sendInfo.rejected, (state, action) => {
      state.infoSending = false;
      state.infoSendError = action.error.message || "Ошибка при обновлении данных пользователя";
    });

    builder.addCase(sendAvatar.pending, (state) => {
      state.avatarSending = true;
      state.avatarSendError = "";
    });
    builder.addCase(sendAvatar.fulfilled, (state, action) => {
      state.data = action.payload;
      state.avatarSending = false;
    });
    builder.addCase(sendAvatar.rejected, (state, action) => {
      state.avatarSending = false;
      state.avatarSendError = action.error.message || "Ошибка при установке аватара пользователя";
    });
  }
})

export const { setData } = currentUserSlice.actions;

export default currentUserSlice.reducer;

type TUserActionCreators = typeof currentUserSlice.actions

export type TUserActions = ReturnType<TUserActionCreators[keyof TUserActionCreators]>;
