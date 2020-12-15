import React, { createContext, useState, useContext } from "react";
import { doughTypes, pizzaSizes, sauceTypes } from "./shared/pizzaData";

const PizzaContext = createContext(null);

export const defaultPizzaValues = {
  pizzaSize: pizzaSizes[0].slug,
  doughType: doughTypes[0].slug,
  sauceType: sauceTypes[0].slug,
  // store IDs here
  cheeseType: [], // ["mozarella", "cheddar"]
  vegetableType: [], // ["tomato"]
  meatType: [], // ["ham", "bacon", "pepperoni"]
};

export function PizzaProvider({ children }) {
  const [pizza, setPizza] = useState(defaultPizzaValues);
  console.log("PIZZAPROVIDER", Date.now());

  return (
    <PizzaContext.Provider value={{ pizza, setPizza }}>
      {children}
    </PizzaContext.Provider>
  );
}

export const usePizza = () => useContext(PizzaContext);
