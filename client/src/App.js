import React from 'react';
import { Route, Switch } from 'react-router'
import {PizzaConfiguratorPage} from './PizzaConfiguratorPage';
import {PizzaOrderPage} from './PizzaOrderPage';
import {PizzaCheckPage} from './PizzaCheckPage';
import {NotFoundPage} from './NotFoundPage';
import {Link} from 'react-router-dom';
import {SignUpPage} from './SignUpPage';
import {SignInPage} from './SignInPage';
import {PizzaOrdersListPage} from './PizzaOrdersListPage';

export function App() {

  return <div className="container">
    <nav>
      <ul>
        <li><Link to="/signup">Регистрация</Link> <Link to="/signin">Авторизация</Link></li>
        <li>&nbsp;</li>
        <li><Link to="/">Конфигуратор</Link></li>
        <li><Link to="/pizza-order">Заказ</Link></li>
        <li><Link to="/pizza-check">Чек</Link></li>
        <li><Link to="/pizza-orders-list">Список заказов</Link></li>
      </ul>
    </nav>
    <Switch>
      <Route exact path="/">
        <PizzaConfiguratorPage/>
      </Route>
      <Route path="/pizza-order">
        <PizzaOrderPage/>
      </Route>
      <Route path="/pizza-orders-list">
        <PizzaOrdersListPage/>
      </Route>
      <Route path="/pizza-check">
        <PizzaCheckPage/>
      </Route>
      <Route path="/signup">
        <SignUpPage/>
      </Route>
      <Route path="/signin">
        <SignInPage/>
      </Route>
      <Route>
        <NotFoundPage />
      </Route>
    </Switch>
  </div>
}

