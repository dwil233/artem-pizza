import React from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { doughTypes, pizzaSizes, sauceTypes } from "../shared/pizzaData";
import { StyledRadioButtonFilter } from "../sharedComponents/RadioButtonFilter";
import { StyledCheckboxFilter } from "../sharedComponents/CheckboxFilter";
import { calcPizzaPrice } from "../shared/calcPrice";
import { getToppings } from "../state/toppings/selectors";
import { getPizza } from "../state/pizza/selectors";
import { StyledPizzaThumb } from "./PizzaThumb";
import { PizzaIngredientsAsText } from "../sharedComponents/PizzaIngredientsAsText";

export function PizzaForm({ onPizzaConfigSubmit }) {
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
    <>
      <StyledPizzaThumb pizzaProps={values} toppings={toppings} />
      <PizzaIngredientsAsText
        pizza={values}
        toppings={toppings}
        styles={{ padding: "8px 16px", color: "#4B4B7C" }}
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "16px",
          }}
        >
          <StyledRadioButtonFilter
            ref={register}
            name="pizzaSize"
            title="Размер"
            items={pizzaSizes}
          />
          <StyledRadioButtonFilter
            ref={register}
            name="doughType"
            title="Тесто"
            items={doughTypes}
          />
        </div>
        <StyledRadioButtonFilter
          ref={register}
          name="sauceType"
          title="Выберите соус"
          items={sauceTypes}
        />
        <StyledCheckboxFilter
          register={register}
          name="cheeseType"
          title="Добавьте сыр"
          items={toppings[0]}
        />
        <StyledCheckboxFilter
          register={register}
          name="vegetableType"
          title="Добавьте овощи"
          items={toppings[1]}
        />
        <StyledCheckboxFilter
          register={register}
          name="meatType"
          title="Добавьте мясо"
          items={toppings[2]}
        />
        <div style={{ paddingBottom: "64px" }}></div>
        <div className="bottom_container">
          <button className="btn">Заказать за {price} руб</button>
        </div>
      </form>
    </>
  );
}
