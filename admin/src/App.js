import React from "react";
import { Route, Switch } from "react-router";
import { ProductAddEditPage } from "./ProductAddEditPage";
import { Link } from "react-router-dom";
import { ProductListPage } from "./ProductListPage";

export function App() {
  return (
    <div className="container">
      <nav>
        <Link to="/">Список продуктов</Link>
        <Link to="/product/">Добавить ингредиент</Link>
      </nav>
      <Switch>
        <Route exact path="/">
          <ProductListPage />
        </Route>
        <Route path="/product/:prodId">
          <ProductAddEditPage />
        </Route>
        <Route path="/product/">
          <ProductAddEditPage />
        </Route>
      </Switch>
    </div>
  );
}
