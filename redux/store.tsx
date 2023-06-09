import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { authApi } from "../api/auth";
import { spaceApi } from "../api/space";
import appReducer from "./slices/app";
import cartReducer from "./slices/cart";

export const store = configureStore({
  reducer: {
    app: appReducer,
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    [spaceApi.reducerPath]: spaceApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, spaceApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
