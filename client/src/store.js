import { applyMiddleware, combineReducers, createStore } from "redux";
import { toppingsReducer } from "./state/toppings/toppingsReducer";
import { pizzaReducer } from "./state/pizza/pizzaReducer";
import logger from "redux-logger";
import thunk from "redux-thunk";
import { authReducer } from "./state/auth/authReducer";

const rootReducer = combineReducers({
  toppings: toppingsReducer,
  pizza: pizzaReducer,
  user: authReducer,
});

export const store = createStore(rootReducer, applyMiddleware(logger, thunk));
