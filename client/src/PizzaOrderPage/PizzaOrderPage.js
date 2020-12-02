import {PizzaPreview} from './PizzaPreview';
import React from 'react';
import {usePizza} from '../pizzaContext';
import {OrderForm} from './OrderForm';
import {calcPizzaPrice} from '../shared/calcPrice';
import {useHistory} from 'react-router';

export function PizzaOrderPage() {
  const history = useHistory()
  const { pizza } = usePizza()
  const orderTotal = calcPizzaPrice(pizza)

  const onSubmit = (data) => {
    console.log(JSON.stringify(data))
    history.push('/pizza-check')
  }
  return <>
    <h1>АртёмПицца: Ваш заказ</h1>
    <PizzaPreview pizzaProps={pizza} orderTotal={orderTotal} />
    <OrderForm orderTotal={orderTotal} onSubmit={onSubmit}/>
  </>
}