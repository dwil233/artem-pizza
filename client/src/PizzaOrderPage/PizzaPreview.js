import React from "react";
import styled from "styled-components";
import { PizzaIngredientsAsText } from "../sharedComponents/PizzaIngredientsAsText";

function PizzaPreviewLayout({ orderTotal, pizza, toppings, className }) {
  if (toppings.length === 0) return <></>;

  return (
    <div className={className}>
      <div>Ваша пицца</div>
      <PizzaIngredientsAsText
        pizza={pizza}
        toppings={toppings}
        styles={{ color: "#4B4B7C" }}
      />
      <hr />
      <div>{orderTotal} руб</div>
    </div>
  );
}

export const PizzaPreview = styled(PizzaPreviewLayout)`
  background: #ffffff;
  box-shadow: 0px 8px 16px rgba(75, 75, 124, 0.05);
  border-radius: 16px;
  margin: 16px;
  padding: 12px 16px 19px;

  div:first-child {
    font-weight: 500;
    font-size: 16px;
    line-height: 20px;
    padding-bottom: 8px;
  }

  hr {
    border: 1px dashed #e1e1ed;
  }

  div:last-child {
    color: #4b4b7c;
    font-weight: 800;
    font-size: 16px;
    line-height: 16px;
    margin-top: 13px;
  }
`;
