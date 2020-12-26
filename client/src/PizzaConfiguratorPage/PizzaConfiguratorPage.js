import React, { useEffect } from "react";
import { PizzaForm } from "./PizzaForm";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { setPizza } from "../state/pizza/actions";
import { fetchToppings } from "../state/toppings/thunk";
import { getError, getIsLoading } from "../state/toppings/selectors";

export function PizzaConfiguratorPage() {
  const dispatch = useDispatch();
  const history = useHistory();

  const isLoading = useSelector(getIsLoading);
  const error = useSelector(getError);

  const handleSubmit = (pizza) => {
    dispatch(setPizza(pizza));
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
