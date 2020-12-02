import React from 'react';
import {useForm} from 'react-hook-form';
import {yupResolver} from '@hookform/resolvers/yup'
import {getCardType} from '../shared/cardType';
import {orderFormSchema} from './orderFormSchema';
import {normalizeCardNumber,
        normalizeCardCode,
        normalizeCardDate,
        normalizeCardHolder} from './cardFieldsNormalization';

// TODO: address input needs throttling decorator to avoid redundant Yandex geo API requests

export function OrderForm({orderTotal, onSubmit}) {

  const {register, handleSubmit, errors, watch} = useForm({
    resolver: yupResolver(orderFormSchema)
  });

  const cardNumber = watch("cardNumber")

  const onChange = (event) => {
    const { value, name } = event.target
    switch (name) {
      case "cardNumber":
        event.target.value = normalizeCardNumber(value);
        break;
      case "cardDate":
        event.target.value = normalizeCardDate(value);
        break;
      case "cardCode":
        event.target.value = normalizeCardCode(value);
        break;
      case "cardHolder":
        event.target.value = normalizeCardHolder(value);
        break;
      default:
    }
  }

  return <form onSubmit={handleSubmit(onSubmit)}>
    <fieldset>
      <legend>Адрес доставки</legend>
      <input ref={register} name="address" placeholder="Введите адрес"/>
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
        <label >
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
        <input ref={register}
                  name="cardNumber"
                  placeholder="Номер карты"
                  type="tel"
                  inputMode="numeric"
                  autoComplete="cc-number"
                  onChange={ onChange }
        />{ getCardType(cardNumber) && <span>{getCardType(cardNumber)}</span> }
        {errors.cardNumber && <p>{errors.cardNumber.message}</p>}
      </div>
      <div>
        <input ref={register} name="cardDate" placeholder="MM/YYYY" onChange={ onChange } />
        <input ref={register} name="cardCode" placeholder="CVV" onChange={ onChange } />
        {errors.cardDate && <p>{errors.cardDate.message}</p>}
        {errors.cardCode && <p>{errors.cardCode.message}</p>}
      </div>
      <div>
        <input ref={register} name="cardHolder" placeholder="Имя как на карте" onChange={ onChange } />
        {errors.cardHolder && <p>{errors.cardHolder.message}</p>}
      </div>
    </fieldset>

    <h5>Доставим пиццу в течение часа или вернем деньги. Артем слов на ветер не бросает.</h5>
    <button>Оплатить {orderTotal} руб</button>
  </form>
}