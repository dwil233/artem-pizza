export const HOST = "http://localhost:3001";

export const getProductList = async () => {
  const url = `${HOST}/ingredients`;

  return fetch(url, { method: "GET" })
    .then((response) => response.json())
    .then((json) => json)
    .catch(() => {
      throw new Error("Не удалось загрузить данные по продуктам");
    });
};

export const getProductInfo = async (prodId) => {
  const url = `${HOST}/ingredients/${prodId}`;

  return fetch(url)
    .then((response) => response.json())
    .then((json) => json)
    .catch(() => {
      throw new Error(
        `Не удалось загрузить данные по продукту с кодом ${prodId}`
      );
    });
};

export const addOrEditProduct = async (data, prodId = undefined) => {
  const { category, slug, name, price, image, thumbnail } = data;
  let url, method;

  // if product ID is presented then update its data or add new one otherwise
  if (prodId) {
    url = `${HOST}/ingredients/${prodId}`;
    method = "PUT";
  } else {
    url = `${HOST}/ingredients`;
    method = "POST";
  }

  const formData = new FormData();

  if (prodId) formData.append("ingredientId", prodId);
  formData.append("category", category);
  formData.append("slug", slug);
  formData.append("name", name);
  formData.append("price", price);
  formData.append("image", image[0]);
  formData.append("thumbnail", thumbnail[0]);

  fetch(url, {
    method: method,
    body: formData,
  })
    .then((response) => response.json())
    .then((json) => json)
    .catch(() => {
      throw new Error(`Операция не удалась`);
    });
};

export const deleteProduct = async (prodId) => {
  const url = `${HOST}/ingredients/${prodId}`;

  return fetch(url, { method: "DELETE" })
    .then((response) => response.json())
    .then((json) => json)
    .catch(() => {
      throw new Error(`Не удалось удалить продукт с кодом ${prodId}`);
    });
};
