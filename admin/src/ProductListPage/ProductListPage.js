import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { deleteProduct, getProductList, HOST } from "../shared/product.api";

export function ProductListPage() {
  const history = useHistory();
  const [error, setError] = useState(false);
  const [productList, setProductList] = useState(null);

  useEffect(() => {
    (async function loadProductList() {
      console.log("loadProductList");
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
    history.push(`/product/${dataset.slug}`);
  };

  const onDelete = async (event) => {
    const { dataset } = event.target;
    event.preventDefault();
    if (window.confirm(`Удалить продукт ${dataset.slug}`)) {
      await deleteProduct(dataset.slug);
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
            <th>Категория</th>
            <th>Код</th>
            <th style={{ width: "60%" }}>Название</th>
            <th>Цена</th>
            <th>Картинка</th>
            <th>?</th>
          </tr>
        </thead>
        <tbody>
          {productList &&
            productList.map((product) => (
              <tr key={product.slug}>
                <td>{product.category}</td>
                <td>{product.slug}</td>
                <td>{product.name}</td>
                <td>{product.price}</td>
                <td>
                  <img
                    src={`${HOST}/${product.image}`}
                    alt={product.name}
                    width="100"
                  />
                </td>
                <td>
                  <a href="/" data-slug={product.slug} onClick={onEdit}>
                    Редактировать
                  </a>
                  <a href="/" data-slug={product.slug} onClick={onDelete}>
                    Удалить
                  </a>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
}
