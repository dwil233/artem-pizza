import { PizzaForm } from "./PizzaForm";
import React from "react";
import { usePizza } from "../pizzaContext";
import { useHistory } from "react-router";

export function PizzaConfiguratorPage({ _usePizzaHook = usePizza }) {
  const { setPizza } = _usePizzaHook();
  const history = useHistory();

  const handleSubmit = (pizza) => {
    setPizza(pizza);
    history.push("/pizza-order");
  };

  console.log("PIZZA CONFIGURATOR PAGE", Date.now());

  return (
    <>
      <h1>АртёмПицца: Соберите пиццу</h1>
      <PizzaForm onPizzaConfigSubmit={handleSubmit} />
    </>
  );
}
