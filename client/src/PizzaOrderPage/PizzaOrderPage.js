import { PizzaPreview } from "./PizzaPreview";
import React, { useState } from "react";
import { usePizza } from "../pizzaContext";
import { OrderForm } from "./OrderForm";
import { calcPizzaPrice } from "../shared/calcPrice";
import { useHistory } from "react-router";
import { useTypes } from "../typesContext";
import { addOrder } from "../shared/products.api";

export function PizzaOrderPage() {
  const history = useHistory();
  const [error, setError] = useState(false);

  const { pizza } = usePizza();
  const { types } = useTypes();
  if (types.length === 0) return <></>;

  const orderTotal = calcPizzaPrice(pizza, types);

  console.log("PIZZA ORDER PAGE", new Date());

  const onSubmit = async (data) => {
    try {
      const res = await addOrder(data, pizza, types);
      console.log("SERVER RESPONSE", res);
    } catch (e) {
      setError(e.message);
    }

    history.push("/pizza-check");
  };
  return (
    <>
      <h1>АртёмПицца: Ваш заказ</h1>
      {error && <h3>{error.message}</h3>}
      <PizzaPreview pizzaProps={pizza} orderTotal={orderTotal} />
      <OrderForm orderTotal={orderTotal} onSubmit={onSubmit} />
    </>
  );
}
