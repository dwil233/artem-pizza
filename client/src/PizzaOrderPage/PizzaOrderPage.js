import React, { useState } from "react";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { PizzaPreview } from "./PizzaPreview";
import { OrderForm } from "./OrderForm";
import { calcPizzaPrice } from "../shared/calcPrice";
import { addOrder } from "../shared/products.api";
import { getPizza } from "../state/pizza/selectors";
import { getToppings } from "../state/toppings/selectors";
import { getOrderData } from "./utils";

export function PizzaOrderPage() {
  const history = useHistory();
  const [error, setError] = useState(false);

  const pizza = useSelector(getPizza);
  const toppings = useSelector(getToppings);
  if (toppings.length === 0) return <></>;

  const orderTotal = calcPizzaPrice(pizza, toppings);

  console.log("PIZZA ORDER PAGE", new Date());

  const onSubmit = async (data) => {
    try {
      const orderData = getOrderData(pizza, toppings, data);
      await addOrder(orderData);
      history.push({ pathname: "/pizza-check", data: orderData });
    } catch (e) {
      setError(e.message);
    }
  };
  return (
    <>
      <h1>АртёмПицца: Ваш заказ</h1>
      {error && <h3>{error.message}</h3>}
      <PizzaPreview orderTotal={orderTotal} />
      <OrderForm orderTotal={orderTotal} onSubmit={onSubmit} />
    </>
  );
}
