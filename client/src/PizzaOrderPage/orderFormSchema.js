import * as yup from "yup";
import { isAddressInvalid } from "./checkAddress";

export const orderFormSchema = yup.object().shape({
  address: yup
    .string()
    .required("Введите улицу и номер дома")
    .test("is-a-house", "Укажите адрес правильно", async function (value) {
      const isInvalid = await isAddressInvalid(value);
      if (isInvalid) {
        return this.createError({ message: isInvalid });
      } else {
        return true;
      }
    }),
  entrance: yup
    .number()
    .transform((cv, ov) => (ov === "" ? undefined : cv))
    .typeError("Номер подъезда - это число")
    .integer("Введите целое число")
    .positive("Введите число больше нуля")
    .required("Укажите номер подъезда"),
  floor: yup
    .number()
    .transform((cv, ov) => (ov === "" ? undefined : cv))
    .typeError("Номер этажа - это число")
    .integer("Введите целое число")
    .positive("Номер этажа - число больше нуля")
    .required("Укажите этаж"),
  flat: yup
    .string()
    .required("Укажите номер квартиры")
    .matches(
      /^\d{1,4}[a-zа-я]?$/i,
      "Введите правильный номер квартиры, например, 122 или 5А"
    ),
  cardNumber: yup
    .string()
    .required("Введите номер карты")
    .matches(/^\d{4} \d{4} \d{4} \d{4}$/, "Номер карты - это 16 цифр"),
  cardDate: yup.string().required("Укажите дату окончания действия карты"),
  cardCode: yup
    .string()
    .required("Укажите код карты")
    .matches(/^\d{3}$/, "Номер карты - это 3 цифры"),
  cardHolder: yup.string().required("Укажите владельца карты"),
});
