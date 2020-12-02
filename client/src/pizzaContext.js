import React, {createContext, useState, useContext} from 'react'
import {doughTypes, pizzaSizes, sauceTypes} from './shared/pizzaData';

const PizzaContext = createContext(null);

export const defaultPizzaValues = {
  pizzaSize: pizzaSizes[0].id,
  doughType: doughTypes[0].id,
  sauceType: sauceTypes[0].id,
  // store IDs here
  cheeseType: [],     // ["mozarella", "cheddar"]
  vegetableType: [],  // ["tomato"]
  meatType: [],       // ["ham", "bacon", "pepperoni"]
}

export function PizzaProvider({children}) {
  const [pizza, setPizza] = useState(defaultPizzaValues);

  return <PizzaContext.Provider value={ {pizza, setPizza} }>
    {children}
  </PizzaContext.Provider>
}

export const usePizza = () => useContext(PizzaContext);