import React from "react";
import { sauceTypes, doughTypes, pizzaSizes } from "../shared/pizzaData";
import { useSelector } from "react-redux";
import { getPizza } from "../state/pizza/selectors";
import { getToppings } from "../state/toppings/selectors";

export function PizzaPreview({ orderTotal }) {
  const pizza = useSelector(getPizza);
  const toppings = useSelector(getToppings);
  if (toppings.length === 0) return <></>;

  return (
    <>
      <div>
        <span>{pizzaSizes.find((i) => i.slug === pizza.pizzaSize).name}</span>{" "}
        &bull;&nbsp;
        <span>
          {doughTypes.find((i) => i.slug === pizza.doughType).name} тесто
        </span>{" "}
        &bull;&nbsp;
        <span>
          {sauceTypes.find((i) => i.slug === pizza.sauceType).name} соус
        </span>
        {pizza.cheeseType.map((item) => (
          <span key={item}>
            {" "}
            &bull;&nbsp;{toppings[0].find((i) => i.slug === item).name}
          </span>
        ))}
        {pizza.vegetableType.map((item) => (
          <span key={item}>
            {" "}
            &bull;&nbsp;{toppings[1].find((i) => i.slug === item).name}
          </span>
        ))}
        {pizza.meatType.map((item) => (
          <span key={item}>
            {" "}
            &bull;&nbsp;{toppings[2].find((i) => i.slug === item).name}
          </span>
        ))}
      </div>
      <div>
        <h2>Сумма заказа: {orderTotal} руб</h2>
      </div>
    </>
  );
}
