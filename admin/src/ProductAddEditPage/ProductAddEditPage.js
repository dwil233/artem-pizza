import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { useHistory } from "react-router";
import { useForm } from "react-hook-form";
import { getProductInfo, addOrEditProduct } from "../shared/product.api";

export function ProductAddEditPage() {
  const history = useHistory();
  const { slugToWork } = useParams();
  const [error, setError] = useState(false);
  const { register, handleSubmit, errors, setValue } = useForm();

  const onSubmit = async (data) => {
    try {
      if (slugToWork) {
        await addOrEditProduct(data, slugToWork);
      } else {
        await addOrEditProduct(data);
      }
      history.push("/");
    } catch (e) {
      setError(e.message);
    }
  };

  const backToProductsList = (e) => {
    e.preventDefault();
    history.push("/");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProductInfo(slugToWork);
        const fields = ["category", "name", "slug", "price"];
        fields.forEach((field) => setValue(field, data[field]));
        setValue("image", null);
      } catch (e) {
        setError(e.message);
      }
    };

    if (slugToWork) {
      fetchData();
    } else {
      const defaultValues = {
        category: "vegetables",
        slug: "",
        name: "",
        price: "0",
        image: null,
      };
      Object.keys(defaultValues).forEach((key) =>
        setValue(key, defaultValues[key])
      );
    }
  }, []);

  if (error) {
    return (
      <>
        <h1>{error}</h1>
        <button onClick={backToProductsList}>
          Вернуться к списку продуктов
        </button>
      </>
    );
  } else
    return (
      <div className="container">
        {slugToWork ? (
          <h1>Редактирование {slugToWork}</h1>
        ) : (
          <h1>Новый продукт</h1>
        )}
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Категория:
            <select ref={register} name="category">
              <option value="vegetables">Овощи</option>
              <option value="sauces">Соусы</option>
              <option value="meat">Мясо</option>
              <option value="cheese">Сыры</option>
            </select>
          </label>
          <label>
            Наименование продукта:
            <input
              ref={register({
                required: {
                  value: true,
                  message: "Введите название продукта",
                },
              })}
              name="name"
            />
            {errors.name && <span>{errors.name.message}</span>}
          </label>
          <label>
            Идентификатор:
            <input
              ref={register({
                required: {
                  value: true,
                  message: "Введите идентификатор продукта",
                },
                pattern: {
                  value: /^[A-Za-z0-9_-]+$/i,
                  message:
                    "Код должен содержать буквы, цифры, тире или подчеркивание",
                },
              })}
              name="slug"
            />
            {errors.slug && <span>{errors.slug.message}</span>}
          </label>
          <label>
            Цена:
            <input
              ref={register({
                required: {
                  value: true,
                  message: "Введите цену продукта",
                },
                min: {
                  value: 0,
                  message: "Цена не может быть меньше нуля",
                },
                max: {
                  value: 1000,
                  message: "Цена не может быть больше тысячи",
                },
              })}
              name="price"
              type="number"
            />
            {errors.price && <span>{errors.price.message}</span>}
          </label>
          <label>
            Картинка:
            <input
              ref={register({
                required: {
                  value: true,
                  message: "Загрузите изображение продукта",
                },
              })}
              name="image"
              type="file"
            />
            {errors.image && <span>{errors.image.message}</span>}
          </label>
          <button>{slugToWork ? "Обновить данные" : "Добавить продукт"}</button>
        </form>
      </div>
    );
}
