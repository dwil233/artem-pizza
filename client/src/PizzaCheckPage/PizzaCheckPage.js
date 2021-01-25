import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";
import { PizzaIngredientsAsText } from "../sharedComponents/PizzaIngredientsAsText";
import { useSelector } from "react-redux";
import { getToppings } from "../state/toppings/selectors";
import { OrderCard } from "../sharedComponents/OrderCard";
import { calcPizzaPrice } from "../shared/calcPrice";

function PizzaCheckPageLayout({ className }) {
  const location = useLocation();
  const toppings = useSelector(getToppings);

  if (!location.data) {
    return (
      <div className={className}>
        <h3>
          Страница чека доступна только после заказа. Сначала{" "}
          <Link to="/">соберите</Link> пиццу!
        </h3>
      </div>
    );
  } else {
    const { name, address, card_number, ingredients } = location.data;
    return (
      <div className={className}>
        <div>
          <img src="assets/img/orderok.svg" alt="orderok" />
          <h3>Спасибо за заказ!</h3>
          <h4>Заказ успешно оплачен, ждите вашу пиццу уже через час</h4>
        </div>
        <OrderCard
          name={name}
          ingredients={PizzaIngredientsAsText({ pizza: ingredients, toppings })}
          address={address}
          sum={calcPizzaPrice(ingredients, toppings)}
          card_number={card_number}
        />
      </div>
    );
  }
}

export const PizzaCheckPage = styled(PizzaCheckPageLayout)`
  padding: 16px;

  > div:first-child {
    text-align: center;
    padding: 16px 0px;

    img {
      margin-bottom: 16px;
    }

    h3 {
      margin: 8px 0px;
      font-weight: 500;
    }

    h4 {
      margin: 8px 0px;
      margin-bottom: 32px;
      padding: 0px 40px;
      font-size: 16px;
      font-weight: 400;
      line-height: 20px;
      color: #4b4b7c;
    }
  }
`;
