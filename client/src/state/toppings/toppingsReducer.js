export const toppingsReducer = (state = [], action) => {
  switch (action.type) {
    case "toppings/success":
      return action.payload;
    case "toppings/error":
      return action.payload;
    case "toppings/request":
      return "loading";
    default:
      return state;
  }
};
