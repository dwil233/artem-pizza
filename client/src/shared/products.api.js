export const getIngredientTypes = async () => {
  const url = `${process.env.REACT_APP_HOST}/ingredients`;

  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      const result = [];
      result.push(json.filter((item) => item.category === "cheese"));
      result.push(json.filter((item) => item.category === "vegetables"));
      result.push(json.filter((item) => item.category === "meat"));
      return result;
    })
    .catch(() => {
      throw new Error("Не удалось загрузить данные по продуктам");
    });
};

export const addOrder = async (orderData) => {
  const url = `${process.env.REACT_APP_HOST}/orders`;

  fetch(url, {
    method: "POST",
    body: JSON.stringify(orderData),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch(() => {
      throw new Error(`Не удалось оформить заказ :\\`);
    });
};

export const getOrders = async () => {
  const url = `${process.env.REACT_APP_HOST}/orders`;

  return fetch(url)
    .then((response) => response.json())
    .then((json) => json)
    .catch(() => {
      throw new Error(`Не удалось получить список заказов`);
    });
};
