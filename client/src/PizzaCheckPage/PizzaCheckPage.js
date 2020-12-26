import React from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router";

export function PizzaCheckPage() {
  const location = useLocation();
  if (!location.data) {
    return (
      <h3>
        Страница чека доступна только после заказа. Сначала{" "}
        <Link to="/">соберите</Link> пиццу!
      </h3>
    );
  } else {
    const { name, address, card_number, ingredients } = location.data;
    return (
      <>
        <h1>АртемПицца: чек оплаты</h1>
        <h3>Спасибо за заказ!</h3>
        <h4>Заказ успешно оплачен, ждите вашу пиццу уже через час</h4>
        <hr />
        <p>
          <span>ИМЯ:</span> {name}
        </p>
        <p>
          <span>АДРЕС:</span> {address}
        </p>
        <p>
          <span>ЗАКАЗ:</span> {ingredients.join(", ")}
        </p>
        <p>
          <span>КАРТА:</span> {card_number}
        </p>
      </>
    );
  }
}
