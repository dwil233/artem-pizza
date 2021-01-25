import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getOrders } from "../shared/products.api";
import { getIsAuthorized } from "../state/auth/selectors";
import { calcPizzaPrice } from "../shared/calcPrice";
import { getToppings } from "../state/toppings/selectors";
import { PizzaIngredientsAsText } from "../sharedComponents/PizzaIngredientsAsText";
import { OrderCard } from "../sharedComponents/OrderCard";

function PizzaOrdersListPageLayout({ className }) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const isAuthorized = useSelector(getIsAuthorized);
  const toppings = useSelector(getToppings);
  const location = useLocation();

  useEffect(() => {
    if (isAuthorized) {
      try {
        getOrders().then((orders) => {
          orders = orders.reverse();
          orders.forEach((order) => {
            order.sum = calcPizzaPrice(order.ingredients, toppings);
            order.ingredients = PizzaIngredientsAsText({
              pizza: order.ingredients,
              toppings,
            });
          });
          setOrders(orders);
          setIsLoading(false);
        });
      } catch (e) {
        setError(e.message);
      }
    }
  }, [isAuthorized, toppings]);

  if (!isAuthorized)
    return (
      <div className={className} style={{ textAlign: "center" }}>
        <h3>
          Список заказов доступен только для{" "}
          <Link to={`/signin?cameFrom=${location.pathname}`}>
            <br />
            авторизованных
            <br />
          </Link>{" "}
          или{" "}
          <Link to={`/signup?cameFrom=${location.pathname}`}>
            зарегистрированных
            <br />
          </Link>{" "}
          пользователей!
        </h3>
      </div>
    );

  if (error) return <h3>{error}</h3>;

  if (isLoading)
    return (
      <div className={className}>
        <img src="assets/img/loading.gif" alt="loading..." />
      </div>
    );

  return (
    <div className={className}>
      {orders.map((order, index) => (
        <OrderCard
          name={order.name}
          ingredients={order.ingredients}
          address={order.address}
          sum={order.sum}
          card_number={order.card_number}
          key={index}
        />
      ))}
    </div>
  );
}

export const PizzaOrdersListPage = styled(PizzaOrdersListPageLayout)`
  background: #f9f9fb;
  height: 100%;
  padding: 16px;
`;
