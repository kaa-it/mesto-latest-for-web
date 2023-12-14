import {TCardData} from "../../utils/types";
import {TAppThunk} from "../store";

export const name = "cards";

export const ActionTypes = {
    SET_DATA: `${name}/SET_DATA`,
    SET_DATA_LOADING: `${name}/SET_DATA_LOADING`,
    SET_DATA_LOAD_ERROR: `${name}/SET_DATA_LOADING_ERROR`,
    ADD: `${name}/ADD`,
    SET_ADD_SENDING: `${name}/SET_ADD_SENDING`,
    SET_ADD_SEND_ERROR: `${name}/SET_ADD_SEND_ERROR`,
    DELETE: `${name}/DELETE`,
    UPDATE: `${name}/UPDATE`,
} as const;

type TSetCardsAction = {
    type: typeof ActionTypes.SET_DATA,
    payload: Array<TCardData>
}

type TSetCardsLoadingAction = {
    type: typeof ActionTypes.SET_DATA_LOADING,
    payload: boolean
}

type TSetCardsLoadErrorAction = {
    type: typeof ActionTypes.SET_DATA_LOAD_ERROR,
    payload: string
}

type TAddCardToStoreAction = {
    type: typeof ActionTypes.ADD,
    payload: TCardData
}

type TSetCardSendingAction = {
    type: typeof ActionTypes.SET_ADD_SENDING,
    payload: boolean
}

type TSetCardSendErrorAction = {
    type: typeof ActionTypes.SET_ADD_SEND_ERROR,
    payload: string
}

type TUpdateCardAction = {
    type: typeof ActionTypes.UPDATE,
    payload: { id: string, data: TCardData }
}

type TDeleteFromStoreAction = {
    type: typeof ActionTypes.DELETE,
    payload: string
}

export type TCardActions =
    TSetCardsAction
    | TSetCardsLoadingAction
    | TSetCardsLoadErrorAction
    | TAddCardToStoreAction
    | TSetCardSendingAction
    | TSetCardSendErrorAction
    | TUpdateCardAction
    | TDeleteFromStoreAction;

export const setCards = (data: Array<TCardData>): TSetCardsAction => ({type: ActionTypes.SET_DATA, payload: data});

export const setCardsLoading = (isLoading: boolean): TSetCardsLoadingAction => ({
    type: ActionTypes.SET_DATA_LOADING,
    payload: isLoading,
});

export const setCardsLoadError = (error: string): TSetCardsLoadErrorAction => ({
    type: ActionTypes.SET_DATA_LOAD_ERROR,
    payload: error,
});

export const addCardToStore = (item: TCardData): TAddCardToStoreAction => ({
    type: ActionTypes.ADD,
    payload: item,
});

export const setCardSending = (isSending: boolean): TSetCardSendingAction => ({
    type: ActionTypes.SET_ADD_SENDING,
    payload: isSending,
});

export const setCardSendError = (error: string): TSetCardSendErrorAction => ({
    type: ActionTypes.SET_ADD_SEND_ERROR,
    payload: error,
});

export const updateCard = (id: string, data: TCardData): TUpdateCardAction => ({
    type: ActionTypes.UPDATE,
    payload: {id, data},
});

const deleteFromStore = (id: string): TDeleteFromStoreAction => ({
    type: ActionTypes.DELETE,
    payload: id,
});

export const loadCards = (): TAppThunk => (dispatch, _getState, {mestoApi}) => {
    dispatch(setCardsLoading(true));
    dispatch(setCardsLoadError(""));
    return mestoApi
        .getCardList()
        .then((data) => dispatch(setCards(data)))
        .catch((err) => dispatch(setCardsLoadError(err)))
        .finally(() => dispatch(setCardsLoading(false)));
};

export const addCard = (data: Pick<TCardData, "name" | "link">): TAppThunk<Promise<unknown>> => (dispatch, _getState, {mestoApi}) => {
    dispatch(setCardSending(true));
    dispatch(setCardSendError(""));
    return mestoApi
        .addCard(data)
        .then((data) => dispatch(addCardToStore(data)))
        .catch((err) => {
            dispatch(setCardSendError(err));
            return Promise.reject(err);
        })
        .finally(() => dispatch(setCardSending(false)));
};

export const deleteCard = (id: string): TAppThunk<Promise<unknown>> => (dispatch, _getState, {mestoApi}) => {
    return mestoApi.removeCard(id).then(() => dispatch(deleteFromStore(id)));
};

export const changeLikeCardStatus = (id: string, like: boolean): TAppThunk => (
    dispatch,
    _getState,
    {mestoApi}
) => {
    return mestoApi
        .changeLikeCardStatus(id, like)
        .then((data) => dispatch(updateCard(id, data)))
};
