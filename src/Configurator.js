import React, { useState } from 'react';
import {RadioButtonFilter} from './RadioButtonFilter';
import {CheckboxFilter} from './CheckboxFilter';

export function Configurator() {

  // Bare pizza price
  const BARE_PIZZA_PRICE = 200;

  // Size
  const [SIZE_30, SIZE_35] = ['30 см', '35 см'];
  const pizzaSizes = [SIZE_30, SIZE_35];
  const SIZE_35_PRICE = 50;

  // Dough
  const [THIN, PUFFY] = ['Тонкое', 'Пышное'];
  const doughTypes = [THIN, PUFFY];

  // Sauce
  const [TOMATO_SAUCE, WHITE_SAUCE, SPICY_SAUCE] = ['Томатный', 'Белый', 'Острый'];
  const sauceTypes = [TOMATO_SAUCE, WHITE_SAUCE, SPICY_SAUCE];

  // Cheese
  const [MOZARELLA, CHEDDAR, DOR_BLUE] = ['Моцарелла', 'Чеддер', 'Дор блю'];
  const cheeseTypes = [MOZARELLA, CHEDDAR, DOR_BLUE];
  const cheesePrices = {}
  cheeseTypes.forEach((type) => {
    cheesePrices[type] = 29;
  });

  // Vegetables
  const [TOMATO, MUSHROOM, BELL_PEPPER] = ['Помидоры', 'Грибы', 'Перец'];
  const vegetableTypes = [TOMATO, MUSHROOM, BELL_PEPPER];
  const vegetablePrices = {}
  vegetableTypes.forEach((type) => {
    vegetablePrices[type] = 29;
  });

  // Meat
  const [BACON, PEPPERONI, HAM] = ['Бекон', 'Пепперони', 'Ветчина'];
  const meatTypes = [BACON, PEPPERONI, HAM];
  const meatPrices = {}
  meatTypes.forEach((type) => {
    meatPrices[type] = 29;
  });

  // Pizza parameters state
  const [pizzaProps, setPizzaProps] = useState({
    pizzaSize: SIZE_30,
    doughType: THIN,
    sauceType: TOMATO_SAUCE,
    cheeseType: [],
    vegetableType: [],
    meatType: [],
  });

  // Router
  const [pageToShow, setPageToShow] = useState(0);

  const calcPizzaPrice = () => {

    let price = BARE_PIZZA_PRICE;

    if (pizzaProps.pizzaSize === SIZE_35) price = price + SIZE_35_PRICE;

    price = price + pizzaProps.cheeseType.reduce((acc, item) => acc + cheesePrices[item], 0)
    price = price + pizzaProps.vegetableType.reduce((acc, item) => acc + vegetablePrices[item], 0)
    price = price + pizzaProps.meatType.reduce((acc, item) => acc + meatPrices[item], 0)

    return price;
  }

  const handleRadioInput = (event) => {
    const $el = event.target;
    setPizzaProps((prevProps) => ({...prevProps, [$el.name]: $el.value}))
  }

  const handleCheckboxInput = (event) => {
    const $el = event.target;

    setPizzaProps((prevProps) => ({...prevProps, [$el.name]: $el.checked ?
      [...prevProps[$el.name], $el.value] :
      prevProps[$el.name].filter(item => item !== $el.value)
    }));
  }

  const handleConfiguratorSubmit = (event) => {
    event.preventDefault();
    setPageToShow(1);
  }

  const handleBackToConfigurator = (event) => {
    event.preventDefault();
    setPageToShow(0);
  }


  if (pageToShow === 0) {

    return <>
      <h1>АртёмПицца</h1>
      <form>
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
          pricesList={cheesePrices}
          onChange={handleCheckboxInput}
        />
        <CheckboxFilter
          name="vegetableType"
          title="Добавьте овощи"
          currentValue={pizzaProps.vegetableType}
          itemsList={vegetableTypes}
          pricesList={vegetablePrices}
          onChange={handleCheckboxInput}
        />
        <CheckboxFilter
          name="meatType"
          title="Добавьте мясо"
          currentValue={pizzaProps.meatType}
          itemsList={meatTypes}
          pricesList={meatPrices}
          onChange={handleCheckboxInput}
        />
        <button onClick={handleConfiguratorSubmit}>
          Заказать за {calcPizzaPrice()} руб
        </button>
      </form>
    </>
  } else if (pageToShow === 1) {
    return <>
      <h1>АртёмПицца: Ваш заказ на {calcPizzaPrice()} руб</h1>
      <div>
        <span>{pizzaProps.pizzaSize}</span> &bull;&nbsp;
        <span>{pizzaProps.doughType} тесто</span> &bull;&nbsp;
        <span>{pizzaProps.sauceType} соус</span>
        {pizzaProps.cheeseType.map((item) => (<span key={item}> &bull;&nbsp;{item}</span>))}
        {pizzaProps.vegetableType.map((item) => (<span key={item}> &bull;&nbsp;{item}</span>))}
        {pizzaProps.meatType.map((item) => (<span key={item}> &bull;&nbsp;{item}</span>))}
      </div>
      <button onClick={handleBackToConfigurator}>
        Вернуться в конфигуратор
      </button>
    </>
  } else {
    return <h1>Unhandled page</h1>
  }
}
