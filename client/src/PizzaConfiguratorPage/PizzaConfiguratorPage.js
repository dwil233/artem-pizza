import React, { useEffect } from "react";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { PizzaForm } from "./PizzaForm";
import { fetchToppings } from "../state/toppings/toppingsReducer";
import { pizzaSlice } from "../state/pizza/pizzaReducer";
import { getError, getIsLoading } from "../state/toppings/selectors";

export function PizzaConfiguratorPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const handleSubmit = (pizza) => {
    dispatch(pizzaSlice.actions.set_pizza(pizza));
    history.push("/pizza-order");
  };

  console.log("PIZZA CONFIGURATOR PAGE", Date.now());

  useEffect(() => {
    dispatch(fetchToppings());
  }, [dispatch]); // passing [] instead of [dispatch] leads to double call of fetchToppings

  if (isLoading) {
    return <h3>Loading...</h3>;
  }

  if (error) {
    return <h3>ОШИБКА: {error}</h3>;
  }

  return (
    <>
      <h1>АртёмПицца: Соберите пиццу</h1>
      <PizzaForm onPizzaConfigSubmit={handleSubmit} />
    </>
  );
}
