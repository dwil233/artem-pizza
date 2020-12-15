import { BARE_PIZZA_PRICE, pizzaSizes } from "./pizzaData";

export const calcPizzaPrice = (pizzaProps, types) => {
  let price = BARE_PIZZA_PRICE;

  price = price + pizzaSizes.find((i) => i.slug === pizzaProps.pizzaSize).price;

  price =
    price +
    pizzaProps.cheeseType.reduce(
      (acc, item) => acc + +types[0].find((i) => i.slug === item).price,
      0
    );

  price =
    price +
    pizzaProps.vegetableType.reduce(
      (acc, item) => acc + +types[1].find((i) => i.slug === item).price,
      0
    );

  price =
    price +
    pizzaProps.meatType.reduce(
      (acc, item) => acc + +types[2].find((i) => i.slug === item).price,
      0
    );

  return price;
};
