import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import loginSlice from "./reducers/loginSlice";
import profileSlice from "./reducers/profileSlice";
import messageSlice from "./reducers/messageSlice";
import lezioniSlice, { lezioniFetch } from "./reducers/lezioniSlice";
import corsiSlice from "./reducers/corsiSlice";
import docentiSlice from "./reducers/docentiSlice";
import studentiSlice from "./reducers/studentiSlice";
import presenzeSlice from "./reducers/presenzeSlice";

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
  lezioni: lezioniSlice,
  corsi: corsiSlice,
  docenti: docentiSlice,
  studenti: studentiSlice,
  presenze: presenzeSlice,
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
