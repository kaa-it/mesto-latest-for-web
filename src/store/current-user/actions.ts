import {TUserData} from "../../utils/types";
import {TAppThunk} from "../store";

export const name = "currentUser";

export const ActionTypes = {
    SET_DATA: `${name}/SET_DATA`,
    SET_DATA_LOADING: `${name}/SET_DATA_LOADING`,
    SET_DATA_LOAD_ERROR: `${name}/SET_DATA_LOADING_ERROR`,
    SET_INFO_SENDING: `${name}/SET_INFO_SENDING`,
    SET_INFO_SEND_ERROR: `${name}/SET_INFO_SENDING_ERROR`,
    SET_AVATAR_SENDING: `${name}/SET_AVATAR_SENDING`,
    SET_AVATAR_SEND_ERROR: `${name}/SET_AVATAR_SEND_ERROR`,
} as const;

type TSetUserDataAction = {
    type: typeof ActionTypes.SET_DATA,
    payload: TUserData | null,
}

type TSetDataLoadingAction = {
    type: typeof ActionTypes.SET_DATA_LOADING,
    payload: boolean
}

type TSetDataLoadErrorAction = {
    type: typeof ActionTypes.SET_DATA_LOAD_ERROR,
    payload: string
}

type TSetInfoSendingAction = {
    type: typeof ActionTypes.SET_INFO_SENDING,
    payload: boolean;
}

type TSetInfoSendErrorAction = {
    type: typeof ActionTypes.SET_INFO_SEND_ERROR,
    payload: string
}

type TSetAvatarSendingAction = {
    type: typeof ActionTypes.SET_AVATAR_SENDING,
    payload: boolean;
}

type TSetAvatarSendErrorAction = {
    type: typeof ActionTypes.SET_AVATAR_SEND_ERROR,
    payload: string
}

export const setData = (data: TUserData | null): TSetUserDataAction => ({
    type: ActionTypes.SET_DATA,
    payload: data,
});

export const setDataLoading = (isLoading: boolean): TSetDataLoadingAction => ({
    type: ActionTypes.SET_DATA_LOADING,
    payload: isLoading,
});

export const setDataLoadError = (error: string): TSetDataLoadErrorAction => ({
    type: ActionTypes.SET_DATA_LOAD_ERROR,
    payload: error,
});

export const setInfoSending = (isSending: boolean): TSetInfoSendingAction => ({
    type: ActionTypes.SET_INFO_SENDING,
    payload: isSending,
});

export const setInfoSendError = (error: string): TSetInfoSendErrorAction => ({
    type: ActionTypes.SET_INFO_SEND_ERROR,
    payload: error,
});

export const setAvatarSending = (isSending: boolean): TSetAvatarSendingAction => ({
    type: ActionTypes.SET_AVATAR_SENDING,
    payload: isSending,
});

export const setAvatarSendError = (error: string): TSetAvatarSendErrorAction => ({
    type: ActionTypes.SET_AVATAR_SEND_ERROR,
    payload: error,
});

export type TUserActions =
    TSetUserDataAction
    | TSetDataLoadingAction
    | TSetDataLoadErrorAction
    | TSetInfoSendingAction
    | TSetInfoSendErrorAction
    | TSetAvatarSendingAction
    | TSetAvatarSendErrorAction;

export const loadData = (): TAppThunk => (dispatch, _getState, {mestoApi}) => {
    dispatch(setDataLoading(true));
    dispatch(setDataLoadError(""));
    return mestoApi
        .getUserInfo()
        .then((data) => dispatch(setData(data)))
        .catch((err) => dispatch(setDataLoadError(err)))
        .finally(() => dispatch(setDataLoading(false)));
};

export const sendInfo = (data: Pick<TUserData, "name" | "about">): TAppThunk<Promise<unknown>> => (dispatch, _getState, {mestoApi}) => {
    dispatch(setInfoSending(true));
    dispatch(setInfoSendError(""));
    return mestoApi
        .setUserInfo(data)
        .then((data) => dispatch(setData(data)))
        .catch((err) => {
            dispatch(setInfoSendError(err));
            return Promise.reject(err);
        })
        .finally(() => dispatch(setInfoSending(false)));
};

export const sendAvatar = (data: Pick<TUserData, "avatar">): TAppThunk<Promise<unknown>> => (dispatch, _getState, {mestoApi}) => {
    dispatch(setAvatarSending(true));
    dispatch(setAvatarSendError(""));
    return mestoApi
        .setUserAvatar(data)
        .then((data) => dispatch(setData(data)))
        .catch((err) => {
            dispatch(setAvatarSendError(err));
            return Promise.reject(err);
        })
        .finally(() => dispatch(setAvatarSending(false)));
};
