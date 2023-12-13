import { configureStore } from "@reduxjs/toolkit";
import reducer from "./reducer";
import mestoApi from "../utils/mesto-api";
import * as authApi from "../utils/auth-api";
import { ThunkAction } from "redux-thunk";
import { TAuthActions } from "./auth/actions";
import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook,
} from "react-redux";

// !!!!!!! ОЧЕНЬ ВАЖНО НЕ ЗАБЫТЬ ПРИ ТИПИЗАЦИИ ХУКОВ
import type {} from "redux-thunk/extend-redux";

type TRootState = ReturnType<typeof reducer>;

const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware({
      thunk: {
        extraArgument: { mestoApi, authApi },
      },
    });
  },
});

export type TAppActions = TAuthActions;

export type TAppThunk<TReturnType = void> = ThunkAction<
  TReturnType,
  TRootState,
  { mestoApi: typeof mestoApi; authApi: typeof authApi },
  TAppActions
>;

type TAppDispatch<TReturnType = void> = (
  action: TAppActions | TAppThunk<TReturnType>
) => TReturnType;

export default store;

export const useDispatch: () => TAppDispatch = dispatchHook;

export const useSelector: TypedUseSelectorHook<TRootState> = selectorHook;
