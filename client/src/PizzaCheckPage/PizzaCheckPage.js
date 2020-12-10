import React, { useEffect, useState } from "react";
import { getOrders } from "../shared/products.api";

export function PizzaCheckPage() {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
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
  }, []);

  if (error) return <h1>{error}</h1>;
  else if (isLoading) return <h1>Загрузка списка заказов...</h1>;
  else
    return (
      <>
        <h1>АртемПицца: чек оплаты</h1>
        <h3>Спасибо за заказ!</h3>
        <h4>Заказ успешно оплачен, ждите вашу пиццу уже через час</h4>
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
