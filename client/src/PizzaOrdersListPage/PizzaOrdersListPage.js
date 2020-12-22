import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getOrders } from "../shared/products.api";
import { getIsAuthorized } from "../state/auth/selectors";

export function PizzaOrdersListPage() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  const isAuthorized = useSelector(getIsAuthorized);
  const location = useLocation();

  useEffect(() => {
    if (isAuthorized) {
      try {
        getOrders().then((orders) => {
          orders = orders.reverse();
          orders.forEach((order) => {
            if (order?.ingredients) {
              order.ingredients = order.ingredients.join(", ");
            }
          });
          setOrders(orders);
          setIsLoading(false);
        });
      } catch (e) {
        setError(e.message);
      }
    }
  }, [isAuthorized]);

  if (!isAuthorized)
    return (
      <h3>
        Список заказов доступен только для{" "}
        <Link to={`/signin?cameFrom=${location.pathname}`}>авторизованных</Link>{" "}
        или{" "}
        <Link to={`/signup?cameFrom=${location.pathname}`}>
          зарегистрированных
        </Link>{" "}
        пользователей!
      </h3>
    );

  if (error) return <h3>{error}</h3>;
  else if (isLoading) return <h3>Загрузка списка заказов...</h3>;
  else
    return (
      <>
        <h1>АртемПицца: История заказов</h1>
        {orders.map((order, index) => (
          <div key={index}>
            <hr />
            <p>
              <span>ИМЯ:</span> {order.name}
            </p>
            <p>
              <span>АДРЕС:</span> {order.address}
            </p>
            <p>
              <span>ЗАКАЗ:</span> {order.ingredients}
            </p>
            <p>
              <span>КАРТА:</span> {order.card_number}
            </p>
          </div>
        ))}
      </>
    );
}
