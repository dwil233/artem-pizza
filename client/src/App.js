import React from "react";
import { Route, Switch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { PizzaConfiguratorPage } from "./PizzaConfiguratorPage";
import { PizzaOrderPage } from "./PizzaOrderPage";
import { PizzaCheckPage } from "./PizzaCheckPage";
import { NotFoundPage } from "./NotFoundPage";
import { SignUpPage } from "./SignUpPage";
import { SignInPage } from "./SignInPage";
import { PizzaOrdersListPage } from "./PizzaOrdersListPage";
import { getIsAuthorized, getUser } from "./state/auth/selectors";
import { authSlice } from "./state/auth/authReducer";

export function App() {
  console.log("APP", Date.now());

  const isAuthorized = useSelector(getIsAuthorized);
  const currentUser = useSelector(getUser);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
  };

  return (
    <div className="container">
      <nav>
        <ul>
          <li>
            {isAuthorized && (
              <>
                <span>{currentUser} </span>
                <Link to="/" onClick={handleLogout}>
                  Выйти
                </Link>
              </>
            )}
            {!isAuthorized && (
              <>
                <Link to="/signin">Войти</Link>&nbsp;
                <Link to="/signup">Регистрация</Link>
              </>
            )}
          </li>
          <li>&nbsp;</li>
          <li>
            <Link to="/">Конфигуратор</Link>
          </li>
          <li>
            <Link to="/pizza-order">Заказ</Link>
          </li>
          <li>
            <Link to="/pizza-check">Чек</Link>
          </li>
          <li>
            <Link to="/pizza-orders-list">Список заказов</Link>
          </li>
        </ul>
      </nav>
      <Switch>
        <Route exact path="/">
          <PizzaConfiguratorPage />
        </Route>
        <Route path="/pizza-order">
          <PizzaOrderPage />
        </Route>
        <Route path="/pizza-orders-list">
          <PizzaOrdersListPage />
        </Route>
        <Route path="/pizza-check">
          <PizzaCheckPage />
        </Route>
        <Route path="/signup">
          <SignUpPage />
        </Route>
        <Route path="/signin">
          <SignInPage />
        </Route>
        <Route>
          <NotFoundPage />
        </Route>
      </Switch>
    </div>
  );
}
