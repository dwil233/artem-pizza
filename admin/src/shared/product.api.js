export const HOST = "http://localhost:3001";

export const getProductList = async () => {
  const url = `${HOST}/ingredients`;
  console.log(url);

  return fetch(url, { method: "GET" })
    .then((response) => response.json())
    .then((json) => json)
    .catch(() => {
      throw new Error("Не удалось загрузить данные по продуктам");
    });
};

export const getProductInfo = async (slug) => {
  const url = `${HOST}/ingredients/${slug}`;
  console.log(url);

  return fetch(url)
    .then((response) => response.json())
    .then((json) => json)
    .catch(() => {
      throw new Error(
        `Не удалось загрузить данные по продукту с кодом ${slug}`
      );
    });
};

export const addOrEditProduct = async (data, slugToUpdate = undefined) => {
  const { category, slug, name, price, image } = data;
  let url, method;

  // if slugToUpdate is presented then update its data or add new one otherwise
  if (slugToUpdate) {
    url = `${HOST}/ingredients/${slugToUpdate}`;
    method = "PUT";
  } else {
    url = `${HOST}/ingredients`;
    method = "POST";
  }

  const formData = new FormData();

  formData.append("category", category);
  formData.append("slug", slug);
  formData.append("name", name);
  formData.append("price", price);
  formData.append("image", image[0]);

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

export const deleteProduct = async (slug) => {
  const url = `${HOST}/ingredients/${slug}`;
  console.log(url);

  return fetch(url, { method: "DELETE" })
    .then((response) => response.json())
    .then((json) => json)
    .catch(() => {
      throw new Error(`Не удалось удалить продукт с кодом ${slug}`);
    });
};
