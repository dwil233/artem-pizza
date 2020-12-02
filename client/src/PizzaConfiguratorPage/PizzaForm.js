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
import {useForm} from 'react-hook-form';


export function PizzaForm({ onPizzaConfigSubmit }) {

  const { pizza } = usePizza()
  const { register, handleSubmit, watch } = useForm({
    defaultValues: pizza
  })

  const values = watch();
  const price = calcPizzaPrice(values)

  const onSubmit = (data) => {
    onPizzaConfigSubmit(data);
  };

  return (
    <form onSubmit={ handleSubmit(onSubmit) }>
      <RadioButtonFilter
        register={register}
        name="pizzaSize"
        title="Размер"
        itemsList={pizzaSizes}
      />
      <RadioButtonFilter
        register={register}
        name="doughType"
        title="Тесто"
        itemsList={doughTypes}
      />
      <RadioButtonFilter
        register={register}
        name="sauceType"
        title="Выберите соус"
        itemsList={sauceTypes}
      />
      <CheckboxFilter
        register={register}
        name="cheeseType"
        title="Добавьте сыр"
        itemsList={cheeseTypes}
      />
      <CheckboxFilter
        register={register}
        name="vegetableType"
        title="Добавьте овощи"
        itemsList={vegetableTypes}
      />
      <CheckboxFilter
        register={register}
        name="meatType"
        title="Добавьте мясо"
        itemsList={meatTypes}
      />
      <div><button>Заказать за {price} руб</button></div>
    </form>
  )
}