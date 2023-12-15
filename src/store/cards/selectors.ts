import {name} from './constants';
import {TRootState} from "../store";

export const getCards = (store: TRootState) => store[name].data;
export const getIsCardsLoading = (store: TRootState) => store[name].loading;
export const getCardsLoadError = (store: TRootState) => store[name].loadError;

export const getIsCardSending = (store: TRootState) => store[name].isSending;
export const getCardSendError = (store: TRootState) => store[name].sendError;

export const getCardById = (store: TRootState, id: string) => store[name].data.find(item => item._id === id);
