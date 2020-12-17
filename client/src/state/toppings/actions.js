export const toppingsRequest = () => ({
  type: "toppings/request",
});
export const toppingsSuccess = (payload) => ({
  type: "toppings/success",
  payload,
});
export const toppingsError = (payload) => ({
  type: "toppings/error",
  payload,
});
