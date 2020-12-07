// If address is not valid it returns an error message, otherwise ""
export async function isAddressInvalid(address) {
  const url =
    "https://geocode-maps.yandex.ru/1.x/?apikey=570231c7-c5b1-4413-97fd-68bff923b5bb&format=json&geocode=" +
    address;

  if (!address) return "";

  // the next code is not perfect and is made explicitly for educational purposes
  // here must be more complex code for proper address validation, e.g. check object "kind"
  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      const found =
        json.response.GeoObjectCollection.metaDataProperty
          .GeocoderResponseMetaData.found;
      if (found === "0") {
        return "Такой адрес не найден!";
      } else if (found !== "1") {
        return "Уточните адрес!";
      } else {
        return "";
      }
    })
    .catch(() => {
      // if we can't get address info then consider it as a proper input
      return Promise.resolve("");
    });
}
