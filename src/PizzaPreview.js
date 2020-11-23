import React from 'react'
import {calcPizzaPrice} from './calcPrice';
import {sauceTypes, doughTypes, pizzaSizes, cheeseTypes, vegetableTypes, meatTypes} from './pizzaData';

export function PizzaPreview({pizzaProps, onSubmitHandler}) {

  return (
    <>
      <div>
        <span>{pizzaSizes.find(i => i.id === pizzaProps.pizzaSize).name}</span> &bull;&nbsp;
        <span>{doughTypes.find(i => i.id === pizzaProps.doughType).name} тесто</span> &bull;&nbsp;
        <span>{sauceTypes.find(i => i.id === pizzaProps.sauceType).name} соус</span>
        {pizzaProps.cheeseType.map((item) => (<span key={item}> &bull;&nbsp;{
            cheeseTypes.find(i => i.id === item).name
          }</span>))
        }
        {pizzaProps.vegetableType.map((item) => (<span key={item}> &bull;&nbsp;{
            vegetableTypes.find(i => i.id === item).name
          }</span>))
        }
        {pizzaProps.meatType.map((item) => (<span key={item}> &bull;&nbsp;{
            meatTypes.find(i => i.id === item).name
          }</span>))
        }
      </div>
      <div>
        <h2>Сумма заказа: {calcPizzaPrice(pizzaProps)} руб</h2>
      </div>
      <button onClick={onSubmitHandler}>
      Вернуться в конфигуратор
      </button>
    </>
  )
}