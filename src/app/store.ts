import { configureStore, ThunkAction, Action, Reducer, combineReducers } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { encryptTransform } from "redux-persist-transform-encrypt";
import loginSlice from "./reducers/loginSlice";
import profileSlice from "./reducers/profileSlice";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["profile"],
  transforms: [encryptTransform({ secretKey: process.env.REACT_APP_SECRET_KEY || "generickeysupersecrettotest" })],
};

const rootReducer = combineReducers({
  profile: loginSlice as Reducer,
  myProfile: profileSlice as Reducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

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
