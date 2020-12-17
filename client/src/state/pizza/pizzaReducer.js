import { defaultPizzaValues } from "../../pizzaContext";

export const pizzaReducer = (state = defaultPizzaValues, action) => {
  switch (action.type) {
    case "set_pizza":
      return action.pizza;
    default:
      return state;
  }
};
