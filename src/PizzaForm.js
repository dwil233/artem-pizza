import React, { useState } from 'react';
import {RadioButtonFilter} from './RadioButtonFilter';
import {cheeseTypes, doughTypes, meatTypes, pizzaSizes, sauceTypes, vegetableTypes} from './pizzaData';
import {CheckboxFilter} from './CheckboxFilter';
import {calcPizzaPrice} from './calcPrice';

export function PizzaForm({initialProps, onPizzaConfigSubmit}) {

  // Pizza parameters state
  const [pizzaProps, setPizzaProps] = useState(initialProps || {
    pizzaSize: pizzaSizes[0].id,
    doughType: doughTypes[0].id,
    sauceType: sauceTypes[0].id,
    // store IDs here
    cheeseType: [],     // ["mozarella", "cheddar"]
    vegetableType: [],  // ["tomato"]
    meatType: [],       // ["ham", "bacon", "pepperoni"]
  });

  const handleRadioInput = (event) => {
    const $el = event.target;
    setPizzaProps((prevProps) => ({...prevProps, [$el.name]: $el.value}))
  }

  const handleCheckboxInput = (event) => {

    const {checked, value, name} = event.target;

    setPizzaProps((prevProps) => {

      return {...prevProps, [name]
      :
        checked
          ? [...prevProps[name], value]
          : [...prevProps[name].filter(item => item !== value)]
      }

    });
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    onPizzaConfigSubmit(pizzaProps);
  };

  return (
    <form onSubmit={handleSubmit}>
      <RadioButtonFilter
        name="pizzaSize"
        title="Размер"
        currentValue={pizzaProps.pizzaSize}
        itemsList={pizzaSizes}
        onChange={handleRadioInput}
      />
      <RadioButtonFilter
        name="doughType"
        title="Тесто"
        currentValue={pizzaProps.doughType}
        itemsList={doughTypes}
        onChange={handleRadioInput}
      />
      <RadioButtonFilter
        name="sauceType"
        title="Выберите соус"
        currentValue={pizzaProps.sauceType}
        itemsList={sauceTypes}
        onChange={handleRadioInput}
      />
      <CheckboxFilter
        name="cheeseType"
        title="Добавьте сыр"
        currentValue={pizzaProps.cheeseType}
        itemsList={cheeseTypes}
        onChange={handleCheckboxInput}
      />
      <CheckboxFilter
        name="vegetableType"
        title="Добавьте овощи"
        currentValue={pizzaProps.vegetableType}
        itemsList={vegetableTypes}
        onChange={handleCheckboxInput}
      />
      <CheckboxFilter
        name="meatType"
        title="Добавьте мясо"
        currentValue={pizzaProps.meatType}
        itemsList={meatTypes}
        onChange={handleCheckboxInput}
      />
      <button>Заказать за {calcPizzaPrice(pizzaProps)} руб</button>
    </form>
  )
}