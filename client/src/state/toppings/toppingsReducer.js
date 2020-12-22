import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getIngredientTypes } from "../../shared/products.api";

export const fetchToppings = createAsyncThunk(
  "toppings/fetchToppings",
  async () =>
    await getIngredientTypes().then((types) =>
      types.map((type) =>
        type.map((item) => ({
          ...item,
          price: Number(item.price),
        }))
      )
    )
);

export const toppingsSlice = createSlice({
  name: "toppings",
  initialState: {
    pending: false,
    error: null,
    data: [],
  },
  extraReducers: {
    [fetchToppings.pending]: (state) => {
      state.pending = true;
    },
    [fetchToppings.rejected]: (state, action) => {
      state.pending = false;
      state.error = action.error.message;
    },
    [fetchToppings.fulfilled]: (state, action) => {
      state.pending = false;
      state.error = null;
      state.data = action.payload;
    },
  },
});
