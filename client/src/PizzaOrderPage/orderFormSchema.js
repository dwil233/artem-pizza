import * as yup from 'yup';

export const orderFormSchema = yup.object().shape({
  address: yup.string().required("Введите улицу и номер дома")
    // the next code is not perfect and is made explicitly for educational purposes
    // here must be more complex code for proper address validation, e.g. check object "kind"
    .test('is-a-house', "Укажите адрес правильно",
      function (value) {
        return new Promise((resolve) => {
          if (!value) {
            resolve(true)
          } else {
            const url = "https://geocode-maps.yandex.ru/1.x/?apikey=570231c7-c5b1-4413-97fd-68bff923b5bb&format=json&geocode=" + value;
            fetch(url)
              .then(result => result.json())
              .then(json => {
                const found = json.response.GeoObjectCollection.metaDataProperty.GeocoderResponseMetaData.found
                if (found === "1") {
                  resolve(true)
                } else if (found === "0") {
                  resolve(this.createError({message: "Такой адрес не найден!"}))
                } else {
                  resolve(this.createError({message: "Уточните адрес!"}))
                }
              })
              .catch( () => {
                // if we can't get address info then consider it as a proper input
                resolve(true)
              })
          }
        })
      }),
  entrance: yup.number()
    .transform( (cv, ov) => (ov==="" ? undefined : cv))
    .typeError("Номер подъезда - это число")
    .integer("Введите целое число")
    .positive("Введите число больше нуля")
    .required("Укажите номер подъезда"),
  floor: yup.number()
    .transform( (cv, ov) => (ov==="" ? undefined : cv))
    .typeError("Номер этажа - это число")
    .integer("Введите целое число")
    .positive("Номер этажа - число больше нуля")
    .required("Укажите этаж"),
  flat: yup.string()
    .required("Укажите номер квартиры")
    .matches(/^\d{1,4}[a-zа-я]?$/i, "Введите правильный номер квартиры, например, 122 или 5А"),
  cardNumber: yup.string()
    .required("Введите номер карты")
    .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Номер карты - это 16 цифр"),
  cardDate: yup.string()
    .required("Укажите дату окончания действия карты"),
  cardCode: yup.string()
    .required("Укажите код карты")
    .matches(/^\d{3}$/, "Номер карты - это 3 цифры"),
  cardHolder: yup.string()
    .required("Укажите владельца карты")
})