import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import loginSlice from "./reducers/loginSlice";
import profileSlice from "./reducers/profileSlice";
import messageSlice from "./reducers/messageSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["profile"],
  transforms: [encryptTransform({ secretKey: process.env.REACT_APP_SECRET_KEY || "generickeysupersecrettotest" })],
};

const rootReducer = combineReducers({
  profile: loginSlice,
  myProfile: profileSlice,
  msgs: messageSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer) as typeof rootReducer;

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
