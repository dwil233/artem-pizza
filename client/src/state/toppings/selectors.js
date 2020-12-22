export const getIsLoading = (state) => state.toppings.pending;

export const getError = (state) => {
  if (state.toppings.error) {
    return state.toppings.error;
  } else {
    return "";
  }
};

export const getToppings = (state) => state.toppings.data;
