import { doughTypes, pizzaSizes, sauceTypes } from "./pizzaData";

const HOST = "http://localhost:3001";

export const getIngredientTypes = async () => {
  const url = `${HOST}/ingredients`;
  console.log(url);

  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      const result = [];
      result.push(json.filter((item) => item.category === "cheese"));
      result.push(json.filter((item) => item.category === "vegetables"));
      result.push(json.filter((item) => item.category === "meat"));
      return result;
    })
    .catch(() => {
      throw new Error("Не удалось загрузить данные по продуктам");
    });
};

export const addOrder = async (payData, pizza, types) => {
  const url = `${HOST}/orders`;
  console.log(url);

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

  const orderData = {
    ingredients: ingredients,
    address: `${payData.address} кв. ${payData.flat}, подъезд ${payData.entrance}, этаж ${payData.floor}`,
    name: payData.cardHolder,
    card_number: payData.cardNumber,
  };

  console.log("Данные заказа", orderData);

  fetch(url, {
    method: "POST",
    body: JSON.stringify(orderData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch(() => {
      throw new Error(`Не удалось оформить заказ :\\`);
    });
};

export const getOrders = async () => {
  const url = `${HOST}/orders`;
  console.log(url);

  return fetch(url)
    .then((response) => response.json())
    .then((json) => json)
    .catch(() => {
      throw new Error(`Не удалось получить список заказов`);
    });
};
