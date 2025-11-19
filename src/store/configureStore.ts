import { configureStore } from "@reduxjs/toolkit";

import reducer from "../reducers";
import { localStorageMiddleware } from "../middlewares/localStorageMiddleware";

export const store = configureStore({
  reducer,
  devTools: true,
  middleware: (getDefault) => getDefault().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
