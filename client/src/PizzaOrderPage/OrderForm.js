import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { getCardType } from "../shared/cardType";
import { orderFormSchema } from "./orderFormSchema";
import {
  normalizeCardNumber,
  normalizeCardCode,
  normalizeCardDate,
  normalizeCardHolder,
} from "./cardFieldsNormalization";

// TODO: address input needs throttling decorator to avoid redundant Yandex geo API requests

export function OrderForm({ orderTotal, onSubmit }) {
  const { register, handleSubmit, errors, watch, setValue } = useForm({
    resolver: yupResolver(orderFormSchema),
  });

  const cardNumber = watch("cardNumber");

  const onCardNumberChange = (event) => {
    const { value } = event.target;
    setValue("cardNumber", normalizeCardNumber(value));
  };

  const onCardDateChange = (event) => {
    const { value } = event.target;
    setValue("cardDate", normalizeCardDate(value));
  };

  const onCardCodeChange = (event) => {
    const { value } = event.target;
    setValue("cardCode", normalizeCardCode(value));
  };

  const onCardHolderChange = (event) => {
    const { value } = event.target;
    setValue("cardHolder", normalizeCardHolder(value));
  };

  const onSubmitForm = (data) => {
    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <fieldset>
        <legend>Адрес доставки</legend>
        <input ref={register} name="address" placeholder="Введите адрес" />
        {errors.address && <p>{errors.address.message}</p>}
        <div>
          <label>
            подъезд
            <input ref={register} name="entrance" />
            {errors.entrance && <p>{errors.entrance.message}</p>}
          </label>
          <label>
            этаж
            <input ref={register} name="floor" />
            {errors.floor && <p>{errors.floor.message}</p>}
          </label>
          <label>
            квартира
            <input ref={register} name="flat" />
            {errors.flat && <p>{errors.flat.message}</p>}
          </label>
        </div>
      </fieldset>
      <div>&nbsp;</div>
      <fieldset>
        <legend>Данные для оплаты</legend>
        <div>
          <input
            ref={register}
            name="cardNumber"
            placeholder="Номер карты"
            type="tel"
            inputMode="numeric"
            autoComplete="cc-number"
            onChange={onCardNumberChange}
          />
          {getCardType(cardNumber) && <span>{getCardType(cardNumber)}</span>}
          {errors.cardNumber && <p>{errors.cardNumber.message}</p>}
        </div>
        <div>
          <input
            ref={register}
            name="cardDate"
            placeholder="MM/YYYY"
            onChange={onCardDateChange}
          />
          <input
            ref={register}
            name="cardCode"
            placeholder="CVV"
            onChange={onCardCodeChange}
          />
          {errors.cardDate && <p>{errors.cardDate.message}</p>}
          {errors.cardCode && <p>{errors.cardCode.message}</p>}
        </div>
        <div>
          <input
            ref={register}
            name="cardHolder"
            placeholder="Имя как на карте"
            onChange={onCardHolderChange}
          />
          {errors.cardHolder && <p>{errors.cardHolder.message}</p>}
        </div>
      </fieldset>

      <h5>
        Доставим пиццу в течение часа или вернем деньги. Артем слов на ветер не
        бросает.
      </h5>
      <button>Оплатить {orderTotal} руб</button>
    </form>
  );
}
