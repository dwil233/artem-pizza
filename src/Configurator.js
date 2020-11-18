import React, { useState } from 'react';
import {PizzaForm} from './PizzaForm';
import {PizzaPreview} from './PizzaPreview';

export function Configurator() {

  // Router
  const [pageToShow, setPageToShow] = useState(0);
  const [pizza, setPizza] = useState(null);

  const handleConfiguratorSubmit = (pizzaProps) => {
    setPizza({...pizzaProps});
    setPageToShow(1);
  }


  if (pageToShow === 0) {
    return <>
      <h1>АртёмПицца: Соберите пиццу</h1>
      <PizzaForm initialProps={pizza} onPizzaConfigSubmit={handleConfiguratorSubmit} />
    </>
  } else {
    return <>
      <h1>АртёмПицца: Ваш заказ</h1>
      <PizzaPreview pizzaProps={pizza} onSubmitHandler={() => setPageToShow(0)} />
    </>
  }
}
