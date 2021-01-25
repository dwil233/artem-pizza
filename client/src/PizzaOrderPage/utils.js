import { doughTypes, pizzaSizes, sauceTypes } from "../shared/pizzaData";

export const getOrderData = (pizza, types, payData) => {
  const ingredients = [];

  ingredients.push(pizzaSizes.find((i) => i.slug === pizza.pizzaSize).name);
  ingredients.push(
    doughTypes.find((i) => i.slug === pizza.doughType).name + " тесто"
  );
  ingredients.push(
    sauceTypes.find((i) => i.slug === pizza.sauceType).name + " соус"
  );
  pizza.cheeseType.forEach((item) => {
    ingredients.push(types[0].find((i) => i.slug === item).name);
  });
  pizza.vegetableType.forEach((item) => {
    ingredients.push(types[1].find((i) => i.slug === item).name);
  });
  pizza.meatType.forEach((item) => {
    ingredients.push(types[2].find((i) => i.slug === item).name);
  });

  return {
    // ingredients: ingredients,
    ingredients: pizza,
    address: `${payData.address} кв. ${payData.flat}, подъезд ${payData.entrance}, этаж ${payData.floor}`,
    name: payData.cardHolder,
    card_number: payData.cardNumber,
  };
};
