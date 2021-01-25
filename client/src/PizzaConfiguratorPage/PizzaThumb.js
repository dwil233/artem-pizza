import React from "react";
import styled from "styled-components";

function PizzaThumb({ pizzaProps, toppings, className }) {
  const pp = {
    src: "assets/img/" + pizzaProps.doughType + ".png",
    width: pizzaProps.pizzaSize === "size30" ? "265" : "310",
    kt: pizzaProps.pizzaSize === "size30" ? 1 : 1.15,
  };
  return (
    <div className={className}>
      <img src={pp.src} width={pp.width} alt="dough" key="dough_type" />

      {pizzaProps.cheeseType.map((item, index) => (
        <img
          style={{
            transform: `scale(${pp.kt - index / 5})`,
            zIndex: 10 + index,
          }}
          key={"cheese_" + item}
          src={`${process.env.REACT_APP_HOST}/${
            toppings[0].find((i) => i.slug === item).image
          }`}
          alt={item}
        />
      ))}

      {pizzaProps.meatType.map((item, index) => (
        <img
          style={{
            zIndex: 20 + index,
            transform: `scale(${pp.kt})`,
          }}
          key={"meat_" + item}
          src={`${process.env.REACT_APP_HOST}/${
            toppings[2].find((i) => i.slug === item).image
          }`}
          alt={item}
        />
      ))}

      {pizzaProps.vegetableType.map((item, index) => (
        <img
          style={{
            zIndex: 30 + index,
            transform: `scale(${pp.kt})`,
          }}
          key={"meat_" + item}
          src={`${process.env.REACT_APP_HOST}/${
            toppings[1].find((i) => i.slug === item).image
          }`}
          alt={item}
        />
      ))}
    </div>
  );
}

export const StyledPizzaThumb = styled(PizzaThumb)`
  height: 310px;
  position: relative;

  img {
    max-height: 100%;
    max-width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
  }
`;
