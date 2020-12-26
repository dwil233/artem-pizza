import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { doughTypes, pizzaSizes, sauceTypes } from "../shared/pizzaData";
import { RadioButtonFilter } from "../sharedComponents/RadioButtonFilter";
import { CheckboxFilter } from "../sharedComponents/CheckboxFilter";
import { calcPizzaPrice } from "../shared/calcPrice";
import { getToppings } from "../state/toppings/selectors";
import { getPizza } from "../state/pizza/selectors";

export function PizzaForm({ onPizzaConfigSubmit }) {
  console.log("PIZZA FORM", new Date());

  const pizza = useSelector(getPizza);
  const { register, handleSubmit, watch } = useForm({
    defaultValues: pizza,
  });

  const toppings = useSelector(getToppings);

  const values = watch();
  const price = calcPizzaPrice(values, toppings);

  const onSubmit = (data) => {
    onPizzaConfigSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        itemsList={toppings[0]}
      />
      <CheckboxFilter
        register={register}
        name="vegetableType"
        title="Добавьте овощи"
        itemsList={toppings[1]}
      />
      <CheckboxFilter
        register={register}
        name="meatType"
        title="Добавьте мясо"
        itemsList={toppings[2]}
      />
      <div>
        <button>Заказать за {price} руб</button>
      </div>
    </form>
  );
}
