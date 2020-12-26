import React from "react";
import "@testing-library/jest-dom";
import { PizzaForm } from "./PizzaForm";
import { fireEvent, act, render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../store";

describe("PizzaForm", () => {
  it("renders correctly", () => {
    const { getByText } = act(() => {
      render(
        <Provider store={store}>
          <PizzaForm />
        </Provider>
      );
    });
    expect(getByText("Размер")).toBeInTheDocument();
    expect(getByText("Добавьте сыр")).toBeInTheDocument();
  });

  describe("with no valuable ingredients selected", () => {
    it("shows bare price", () => {
      const { getByText } = render(
        <Provider store={store}>
          <PizzaForm />
        </Provider>
      );
      expect(getByText("Заказать за 200 руб")).toBeInTheDocument();
    });
  });

  describe("with all ingredients checked", () => {
    it("shows maximum price", () => {
      const { getByText, getByLabelText } = render(
        <Provider store={store}>
          <PizzaForm />
        </Provider>
      );

      fireEvent.click(getByText("35 см"));

      const mozarella = getByLabelText("Моцарелла 29 ₽");
      fireEvent.click(mozarella);
      expect(mozarella.checked).toEqual(true);

      fireEvent.click(getByLabelText("Чеддер 29 ₽"));
      fireEvent.click(getByLabelText("Дор блю 29 ₽"));

      fireEvent.click(getByLabelText("Помидоры 29 ₽"));
      fireEvent.click(getByLabelText("Грибы 29 ₽"));
      fireEvent.click(getByLabelText("Перец 29 ₽"));

      fireEvent.click(getByLabelText("Бекон 29 ₽"));
      fireEvent.click(getByLabelText("Пепперони 29 ₽"));
      fireEvent.click(getByLabelText("Ветчина 29 ₽"));

      expect(getByText("Заказать за 511 руб")).toBeInTheDocument();
    });
  });

  describe("onPizzaConfigSubmit", () => {
    it("passes configured pizza", async () => {
      const onPizzaConfigSubmit = jest.fn();

      const { getByText } = render(
        <Provider store={store}>
          <PizzaForm onPizzaConfigSubmit={onPizzaConfigSubmit} />
        </Provider>
      );

      fireEvent.click(getByText("35 см"));
      fireEvent.click(getByText("Моцарелла", { exact: false }));
      fireEvent.click(getByText("Грибы", { exact: false }));
      fireEvent.click(getByText("Ветчина", { exact: false }));

      await act(async () => {
        fireEvent.click(getByText("Заказать за 337 руб"));
      });

      expect(onPizzaConfigSubmit).toBeCalledWith({
        pizzaSize: "size35",
        doughType: "thin",
        sauceType: "tomato",
        cheeseType: ["mozarella"],
        vegetableType: ["mushroom"],
        meatType: ["ham"],
      });
    });
  });
});
