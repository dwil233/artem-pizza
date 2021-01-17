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
    <div style={{ background: "#F9F9FB", paddingTop: "2px" }}>
      {error && <h3>{error.message}</h3>}
      <PizzaPreview orderTotal={orderTotal} pizza={pizza} toppings={toppings} />
      <OrderForm orderTotal={orderTotal} onSubmit={onSubmit} />
    </div>
  );
}
