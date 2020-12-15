import React from "react";
import { sauceTypes, doughTypes, pizzaSizes } from "../shared/pizzaData";
import { useTypes } from "../typesContext";

export function PizzaPreview({ pizzaProps, orderTotal }) {
  const { types } = useTypes();
  if (types.length === 0) return <></>;

  return (
    <>
      <div>
        <span>
          {pizzaSizes.find((i) => i.slug === pizzaProps.pizzaSize).name}
        </span>{" "}
        &bull;&nbsp;
        <span>
          {doughTypes.find((i) => i.slug === pizzaProps.doughType).name} тесто
        </span>{" "}
        &bull;&nbsp;
        <span>
          {sauceTypes.find((i) => i.slug === pizzaProps.sauceType).name} соус
        </span>
        {pizzaProps.cheeseType.map((item) => (
          <span key={item}>
            {" "}
            &bull;&nbsp;{types[0].find((i) => i.slug === item).name}
          </span>
        ))}
        {pizzaProps.vegetableType.map((item) => (
          <span key={item}>
            {" "}
            &bull;&nbsp;{types[1].find((i) => i.slug === item).name}
          </span>
        ))}
        {pizzaProps.meatType.map((item) => (
          <span key={item}>
            {" "}
            &bull;&nbsp;{types[2].find((i) => i.slug === item).name}
          </span>
        ))}
      </div>
      <div>
        <h2>Сумма заказа: {orderTotal} руб</h2>
      </div>
    </>
  );
}
