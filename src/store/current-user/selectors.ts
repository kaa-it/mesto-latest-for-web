import {name} from './actions';
import {TRootState} from "../store";

export const getCurrentUser = (store: TRootState) => store[name].data;
export const getIsInfoSending = (store: TRootState) => store[name].infoSending;
export const getIsInfoSendError = (store: TRootState) => store[name].infoSendError;
export const getIsAvatarSending = (store: TRootState) => store[name].avatarSending;
export const getIsAvatarSendError = (store: TRootState) => store[name].avatarSendError;