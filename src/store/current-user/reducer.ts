import {ActionTypes, TUserActions} from "./actions";
import {TUserData} from "../../utils/types";

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

const reducer = (state = initialState, action: TUserActions): TUserInitialState => {
  switch (action.type) {
    case ActionTypes.SET_DATA:
      return { ...state, data: action.payload };
    case ActionTypes.SET_DATA_LOADING:
      return { ...state, dataLoading: action.payload };
    case ActionTypes.SET_DATA_LOAD_ERROR:
      return { ...state, loadError: action.payload };
    case ActionTypes.SET_INFO_SENDING:
      return { ...state, infoSending: action.payload };
    case ActionTypes.SET_INFO_SEND_ERROR:
      return { ...state, infoSendError: action.payload };
    case ActionTypes.SET_AVATAR_SENDING:
      return { ...state, avatarSending: action.payload };
    case ActionTypes.SET_AVATAR_SEND_ERROR:
      return { ...state, avatarSendError: action.payload };
    default:
      return state;
  }
};

export default reducer;
