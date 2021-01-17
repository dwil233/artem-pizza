import React from "react";
import { pizzaSizes, sauceTypes } from "../shared/pizzaData";

export function PizzaIngredientsAsText({ pizza, toppings, styles }) {
  return (
    <div style={styles}>
      <span>{pizzaSizes.find((i) => i.slug === pizza.pizzaSize).name}</span>
      {" на "}
      <span>{pizza.doughType === "thin" ? "тонком" : "пышном"} тесте</span>{" "}
      <span>{sauceTypes.find((i) => i.slug === pizza.sauceType).text}</span>
      <br />
      {pizza.cheeseType.map((item, index) => (
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
  );
}
