import { ActionTypes, TAuthActions } from "./actions";
import { TAuthData } from "../../utils/types";

type TAuthInitialState = {
  data: TAuthData | null;
  authChecking: boolean;
  registerSending: boolean;
  registerError: string;
  loginSending: boolean;
  loginError: string;
};

const initialState: TAuthInitialState = {
  data: null,
  authChecking: true,
  registerSending: false,
  registerError: "",
  loginSending: false,
  loginError: "",
};

const reducer = (
  state = initialState,
  action: TAuthActions
): TAuthInitialState => {
  switch (action.type) {
    case ActionTypes.SET_USER_DATA:
      return { ...state, data: action.payload };
    case ActionTypes.SET_AUTH_CHECKING:
      return { ...state, authChecking: action.payload };
    case ActionTypes.SET_REGISTER_SENDING:
      return { ...state, registerSending: action.payload };
    case ActionTypes.SET_REGISTER_SEND_ERROR:
      return { ...state, registerError: action.payload };
    case ActionTypes.SET_LOGIN_SENDING:
      return { ...state, loginSending: action.payload };
    case ActionTypes.SET_LOGIN_SEND_ERROR:
      return { ...state, loginError: action.payload };
    default:
      return state;
  }
};

export default reducer;
