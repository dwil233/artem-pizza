import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { deleteProduct, getProductList, HOST } from "../shared/product.api";

export function ProductListPage() {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [productList, setProductList] = useState(null);

  useEffect(() => {
    (async function loadProductList() {
      try {
        const data = await getProductList();
        setProductList(data);
      } catch (e) {
        setError(e.message);
      }
    })();
  }, []);

  const onEdit = (event) => {
    const { dataset } = event.target;
    event.preventDefault();
    history.push(`/product/${dataset.id}`);
  };

  const onDelete = async (event) => {
    const { dataset } = event.target;
    event.preventDefault();
    if (window.confirm(`Удалить продукт ${dataset.id}`)) {
      await deleteProduct(dataset.id);
      window.location.reload();
    }
  };

  if (error) {
    return <h1>{error}</h1>;
  } else
    return (
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Категория</th>
            <th>Код</th>
            <th>Название</th>
            <th>Цена</th>
            <th>Картинка</th>
            <th>Превью</th>
            <th>?</th>
          </tr>
        </thead>
        <tbody>
          {productList &&
            productList.map((product) => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td>{product.category}</td>
                <td>{product.slug}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <img
                    src={`${HOST}/${product.image}`}
                    alt={product.name}
                    width="96"
                  />
                </td>
                <td>
                  <img
                    src={`${HOST}/${product.thumbnail}`}
                    alt={product.name}
                    width="64"
                  />
                </td>
                <td>
                  <a href="/" data-id={product.id} onClick={onEdit}>
                    Редактировать
                  </a>
                  <a href="/" data-id={product.id} onClick={onDelete}>
                    Удалить
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
}
