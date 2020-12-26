import React from "react";
import {
  fireEvent,
  render,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Router } from "react-router";
import { createMemoryHistory } from "history";
import { PizzaConfiguratorPage } from "./PizzaConfiguratorPage";
import { Provider } from "react-redux";
import { store } from "../store";

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
  it("renders correctly", async () => {
    const { getByText } = render(
      <Provider store={store}>
        <PizzaConfiguratorPage />
      </Provider>
    );
    await waitForElementToBeRemoved(getByText("Loading...")).then(() => {
      expect(getByText("Сохранить")).toBeInTheDocument();
    });
  });

  describe(".onPizzaConfigSubmit", () => {
    it("goes to pizza-order page", async () => {
      const history = createMemoryHistory();

      const { getByText } = render(
        <Router history={history}>
          <Provider store={store}>
            <PizzaConfiguratorPage />
          </Provider>
        </Router>
      );
      await waitForElementToBeRemoved(getByText("Loading...")).then(() => {
        fireEvent.click(getByText("Сохранить"));
        expect(history.location.pathname).toEqual("/pizza-order");
      });
    });
  });
});
