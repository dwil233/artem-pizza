import { createSlice } from "@reduxjs/toolkit";
import { defaultPizzaValues } from "../../shared/pizzaData";

export const pizzaSlice = createSlice({
  name: "pizza",
  initialState: defaultPizzaValues,
  reducers: {
    set_pizza: (state, action) => {
      Object.keys(state).forEach((key) => (state[key] = action.payload[key]));
    },
  },
});
