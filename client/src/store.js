// import logger from "redux-logger";
import { configureStore } from "@reduxjs/toolkit";
import { toppingsSlice } from "./state/toppings/toppingsReducer";
import { pizzaSlice } from "./state/pizza/pizzaReducer";
import { authSlice } from "./state/auth/authReducer";

const reducer = {
  toppings: toppingsSlice.reducer,
  pizza: pizzaSlice.reducer,
  auth: authSlice.reducer,
};

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), //.concat(logger),
  devTools: false,
});
