import React from 'react';
import {RadioButtonFilter} from '../sharedComponents/RadioButtonFilter';
import {CheckboxFilter} from '../sharedComponents/CheckboxFilter';
import {calcPizzaPrice} from '../shared/calcPrice';
import {usePizza} from '../pizzaContext';
import {cheeseTypes,
        doughTypes,
        meatTypes,
        pizzaSizes,
        sauceTypes,
        vegetableTypes} from '../shared/pizzaData';


export function PizzaForm({ onPizzaConfigSubmit }) {

  const { pizza, setPizza } = usePizza()

  const handleRadioInput = (event) => {
    const {name, value} = event.target;
    setPizza((prevProps) => ({...prevProps, [name]: value}))
  }

  const handleCheckboxInput = (event) => {
    const {checked, value, name} = event.target;

    setPizza((prevProps) => {
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
    onPizzaConfigSubmit(pizza);
  };

  return (
    <form onSubmit={handleSubmit}>
      <RadioButtonFilter
        name="pizzaSize"
        title="Размер"
        currentValue={pizza.pizzaSize}
        itemsList={pizzaSizes}
        onChange={handleRadioInput}
      />
      <RadioButtonFilter
        name="doughType"
        title="Тесто"
        currentValue={pizza.doughType}
        itemsList={doughTypes}
        onChange={handleRadioInput}
      />
      <RadioButtonFilter
        name="sauceType"
        title="Выберите соус"
        currentValue={pizza.sauceType}
        itemsList={sauceTypes}
        onChange={handleRadioInput}
      />
      <CheckboxFilter
        name="cheeseType"
        title="Добавьте сыр"
        currentValue={pizza.cheeseType}
        itemsList={cheeseTypes}
        onChange={handleCheckboxInput}
      />
      <CheckboxFilter
        name="vegetableType"
        title="Добавьте овощи"
        currentValue={pizza.vegetableType}
        itemsList={vegetableTypes}
        onChange={handleCheckboxInput}
      />
      <CheckboxFilter
        name="meatType"
        title="Добавьте мясо"
        currentValue={pizza.meatType}
        itemsList={meatTypes}
        onChange={handleCheckboxInput}
      />
      <div><button>Заказать за {calcPizzaPrice(pizza)} руб</button></div>
    </form>
  )
}