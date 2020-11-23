import React from 'react';
import {PizzaForm} from './PizzaForm';
import "@testing-library/jest-dom";

const { fireEvent, render } = require("@testing-library/react")


describe("PizzaForm", () => {

  it("renders correctly", () => {
    const {getByText} = render(<PizzaForm/>)
    expect(getByText("Размер")).toBeInTheDocument()
    expect(getByText("Добавьте сыр")).toBeInTheDocument()
  })

  describe("with no valuable ingredients checked", () => {
    it("shows bare price", () => {
      const {getByText} = render(<PizzaForm/>)
      expect(getByText("Заказать за 200 руб")).toBeInTheDocument()
    })
  })

  describe("with all ingredients checked", () => {
    it("shows maximum price", () => {
      const {getByText, getByLabelText} = render(<PizzaForm/>)

      fireEvent.click(getByText("35 см"))

      const mozarella = getByLabelText("Моцарелла 29 ₽")
      fireEvent.click(mozarella)
      expect(mozarella.checked).toEqual(true);

      fireEvent.click(getByLabelText("Чеддер 29 ₽"))
      fireEvent.click(getByLabelText("Дор блю 29 ₽"))

      fireEvent.click(getByLabelText("Помидоры 29 ₽"))
      fireEvent.click(getByLabelText("Грибы 29 ₽"))
      fireEvent.click(getByLabelText("Перец 29 ₽"))

      fireEvent.click(getByLabelText("Бекон 29 ₽"))
      fireEvent.click(getByLabelText("Пепперони 29 ₽"))
      fireEvent.click(getByLabelText("Ветчина 29 ₽"))

      expect(getByText("Заказать за 511 руб")).toBeInTheDocument()
    })
  })

  describe("onPizzaConfigSubmit", () => {
    it("passes configured pizza", () => {
      const onPizzaConfigSubmit = jest.fn()

      const { getByText } = render(<PizzaForm onPizzaConfigSubmit={onPizzaConfigSubmit} />)

      fireEvent.click(getByText("35 см"))
      fireEvent.click(getByText("Моцарелла", {exact:false}))
      fireEvent.click(getByText("Грибы", {exact:false}))
      fireEvent.click(getByText("Ветчина", {exact:false}))
      fireEvent.click(getByText("Заказать за 337 руб"))

      expect(onPizzaConfigSubmit).toBeCalledWith({
        pizzaSize: "size35",
        doughType: "thin",
        sauceType: "tomato",
        cheeseType: ["mozarella"],
        vegetableType: ["mushroom"],
        meatType: ["ham"],
      })

    })
  })

});