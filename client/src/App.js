import React, { useState, useEffect } from "react";
import { Route, Switch } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
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
  const isAuthorized = useSelector(getIsAuthorized);
  const currentUser = useSelector(getUser);
  const dispatch = useDispatch();
  const [showNav, setShowNav] = useState(false);
  const history = useHistory();

  const onIconClick = (event) => {
    // event.preventDefault();
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setShowNav(!showNav);
  };

  const onLogoClick = () => {
    history.push("/");
  };

  const handleLogout = () => {
    dispatch(authSlice.actions.logout());
  };

  useEffect(() => {
    const unlisten = history.listen(() => {
      // every time the location changes
      // we need to hide menu and scroll page to top
      setShowNav(false);
      window.scrollTo(0, 0);
    });
    return () => {
      unlisten();
    };
  }, [history]);

  return (
    <div className="container">
      <div className="top_container">
        <div className="row">
          <button className="anchor" onClick={onLogoClick}>
            <img src="assets/img/brand.svg" alt="brand" />
          </button>
          <button className="anchor" onClick={onIconClick}>
            <img
              style={{
                filter: showNav
                  ? "invert(100%) saturate(160%) hue-rotate(90deg) brightness(90%)"
                  : "invert(0%)",
              }}
              src="assets/icons/icn_account.svg"
              alt="acc"
            />
          </button>
        </div>
      </div>
      <div style={{ paddingTop: "56px" }}></div>
      <nav style={{ display: showNav ? "block" : "none" }}>
        <ul>
          <li>
            <div className="row">
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
            </div>
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
