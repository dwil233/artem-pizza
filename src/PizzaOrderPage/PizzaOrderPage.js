import {PizzaPreview} from './PizzaPreview';
import React from 'react';
import {usePizza} from '../pizzaContext';
import {Link} from 'react-router-dom';
import {OrderForm} from './OrderForm';

export function PizzaOrderPage() {
  const { pizza } = usePizza()

  return <>
    <h1>АртёмПицца: Ваш заказ</h1>
    <PizzaPreview pizzaProps={pizza} />
    <OrderForm/>
    <Link to="/pizza-check">Оплатить</Link>
  </>
}