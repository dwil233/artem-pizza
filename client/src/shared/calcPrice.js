import {BARE_PIZZA_PRICE, cheeseTypes, meatTypes, pizzaSizes, vegetableTypes} from './pizzaData';


export const calcPizzaPrice = (pizzaProps) => {

  let price = BARE_PIZZA_PRICE;

  price = price + pizzaSizes.find(i => i.id === pizzaProps.pizzaSize).price;

  price = price + pizzaProps.cheeseType.reduce((acc, item) =>
      acc + cheeseTypes.find(i => i.id === item).price
    , 0)

  price = price + pizzaProps.vegetableType.reduce((acc, item) =>
    acc + vegetableTypes.find(i => i.id === item).price
    , 0)

  price = price + pizzaProps.meatType.reduce((acc, item) =>
    acc + meatTypes.find(i => i.id === item).price
    , 0)

  return price;
}