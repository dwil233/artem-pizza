import React from "react";
import { RadioButtonFilter } from "../sharedComponents/RadioButtonFilter";
import { CheckboxFilter } from "../sharedComponents/CheckboxFilter";
import { calcPizzaPrice } from "../shared/calcPrice";
import { usePizza } from "../pizzaContext";
import { useTypes } from "../typesContext";
import { doughTypes, pizzaSizes, sauceTypes } from "../shared/pizzaData";
import { useForm } from "react-hook-form";

export function PizzaForm({ onPizzaConfigSubmit }) {
  const { pizza } = usePizza();
  const { register, handleSubmit, watch } = useForm({
    defaultValues: pizza,
  });

  console.log("PIZZA FORM", new Date());

  // if it is a first time then do nothing and wait for types
  const { types } = useTypes();
  if (types.length === 0) return <></>;

  const values = watch();
  const price = calcPizzaPrice(values, types);

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
        itemsList={types[0]}
      />
      <CheckboxFilter
        register={register}
        name="vegetableType"
        title="Добавьте овощи"
        itemsList={types[1]}
      />
      <CheckboxFilter
        register={register}
        name="meatType"
        title="Добавьте мясо"
        itemsList={types[2]}
      />
      <div>
        <button>Заказать за {price} руб</button>
      </div>
    </form>
  );
}
