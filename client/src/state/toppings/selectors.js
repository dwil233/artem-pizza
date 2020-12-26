export const getIsLoading = (state) => state.toppings === "loading";

export const getError = (state) => {
  if (typeof state.toppings === "string" && state.toppings !== "loading") {
    return state.toppings;
  } else {
    return "";
  }
};

export const getToppings = (state) => {
  if (typeof state.toppings === "string") {
    return [];
  }
  return state.toppings;
};
