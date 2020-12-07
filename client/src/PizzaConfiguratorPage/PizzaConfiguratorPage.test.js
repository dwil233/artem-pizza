import React from 'react'
import {fireEvent, render} from '@testing-library/react';
import {Router, MemoryRouter} from 'react-router';
import {createMemoryHistory} from 'history';
import {PizzaConfiguratorPage} from './PizzaConfiguratorPage';
import {PizzaProvider} from '../pizzaContext';


jest.mock("./PizzaForm", () => {
  return {
    PizzaForm: ({ onPizzaConfigSubmit }) => (
      <button onClick={() => onPizzaConfigSubmit({ foo: "bar" })}>
        Сохранить
      </button>
    ),
  };
});

describe("PizzaConfiguratorPage", () => {
  it("renders correctly", () => {
    const { getByText } = render(
      <PizzaProvider>
      <PizzaConfiguratorPage/>
      </PizzaProvider>
    )
    expect(getByText("АртёмПицца: Соберите пиццу")).toBeInTheDocument();
  })

  describe(".onPizzaConfigSubmit", () => {

    it("goes to pizza-order page", () => {
      const history = createMemoryHistory()

      const { getByText } = render(
        <Router history={history}>
          <PizzaProvider>
            <PizzaConfiguratorPage/>
          </PizzaProvider>
        </Router>
      )
      fireEvent.click(getByText("Сохранить"))
      expect(history.location.pathname).toEqual("/pizza-order")
    })

    it("sets pizza context", () => {

      const mockedSetPizza = jest.fn()
      const pizzaHook = () => ({ setPizza:mockedSetPizza })
      const { getByText } = render(
        <MemoryRouter>
          <PizzaConfiguratorPage _usePizzaHook={pizzaHook}/>
        </MemoryRouter>
      )

      fireEvent.click(getByText("Сохранить"))

      expect(mockedSetPizza).toBeCalledWith({foo:"bar"})
    })

  })
})