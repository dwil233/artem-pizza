import React from "react";
import styled from "styled-components";
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

function OrderFormLayout({ orderTotal, onSubmit, className }) {
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
    <form onSubmit={handleSubmit(onSubmitForm)} className={className}>
      <fieldset>
        <legend>Адрес доставки</legend>
        <input
          type="text"
          ref={register}
          name="address"
          placeholder="Введите адрес"
          className={errors.address && "error"}
        />
        {errors.address && <p className="error">{errors.address.message}</p>}
        <div>
          <div className="row">
            <label>
              подъезд
              <input
                type="text"
                ref={register}
                name="entrance"
                className={errors.entrance && "error"}
              />
            </label>
            <label>
              этаж
              <input
                type="text"
                ref={register}
                name="floor"
                className={errors.floor && "error"}
              />
            </label>
            <label>
              квартира
              <input
                type="text"
                ref={register}
                name="flat"
                className={errors.flat && "error"}
              />
            </label>
          </div>
          {errors.entrance && (
            <p className="error">{errors.entrance.message}</p>
          )}
          {errors.floor && <p className="error">{errors.floor.message}</p>}
          {errors.flat && <p className="error">{errors.flat.message}</p>}
        </div>
      </fieldset>
      <hr />
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
            className={errors.cardNumber && "error"}
            style={
              getCardType(cardNumber) && {
                background: `#fff url(assets/img/ps/${getCardType(
                  cardNumber
                )}) no-repeat right 10px center`,
              }
            }
          />
          {errors.cardNumber && (
            <p className="error">{errors.cardNumber.message}</p>
          )}
        </div>
        <div>
          <div className="row">
            <input
              type="text"
              ref={register}
              name="cardDate"
              placeholder="MM/YYYY"
              onChange={onCardDateChange}
              className={errors.cardDate && "error"}
            />
            <input
              type="text"
              ref={register}
              name="cardCode"
              placeholder="CVV"
              onChange={onCardCodeChange}
              className={errors.cardCode && "error"}
            />
          </div>
          {errors.cardDate && (
            <p className="error">{errors.cardDate.message}</p>
          )}
          {errors.cardCode && (
            <p className="error">{errors.cardCode.message}</p>
          )}
        </div>
        <div>
          <input
            type="text"
            ref={register}
            name="cardHolder"
            placeholder="Имя как на карте"
            onChange={onCardHolderChange}
            className={errors.cardHolder && "error"}
          />
          {errors.cardHolder && (
            <p className="error">{errors.cardHolder.message}</p>
          )}
        </div>
      </fieldset>
      <hr />
      <div id="comment">
        Доставим пиццу в течение часа или вернем деньги. Артем слов на ветер не
        бросает.
      </div>
      <div style={{ paddingBottom: "150px" }}></div>
      <div className="bottom_container">
        <div className="row">
          <div>Стоимость заказа</div>
          <div>{orderTotal} руб</div>
        </div>
        <div className="row">
          <div>Доставка</div>
          <div>0 руб</div>
        </div>
        <hr />
        <div className="row">
          <div>К оплате</div>
          <div>{orderTotal} руб</div>
        </div>
        <button className="btn" style={{ display: "block" }}>
          Оплатить {orderTotal} руб
        </button>
      </div>
    </form>
  );
}

export const OrderForm = styled(OrderFormLayout)`
  fieldset {
    border: none;
    margin-left: 16px;
    margin-right: 16px;
    padding: 0;

    legend {
      font-weight: 500;
      font-size: 16px;
      line-height: 20px;
      color: #1f1f33;
      margin-bottom: 14px;
    }
  }

  fieldset:first-child {
    input[name="address"] {
      width: 100%;
    }

    div {
      margin-top: 16px;

      div {
        label {
          display: block;
          color: #4b4b7c;
        }

        input {
          display: block;
          width: 104px;
          margin-top: 4px;
        }
      }
    }
  }

  hr {
    border: 1px solid #e1e1ed;
    margin: 16px;
  }

  fieldset:nth-child(3) {
    margin-top: 16px;

    input[name="cardNumber"],
    input[name="cardHolder"] {
      width: 100%;
    }

    div: nth-child(3) {
      margin: 16px 0px;

      input[name="cardDate"] {
        width: 104px;
      }
      input[name="cardCode"] {
        width: 64px;
      }
    }
  }

  #comment {
    color: #4b4b7c;
    margin: 16px 0px;
    padding: 0px 16px;
  }

  .bottom_container {
    > div {
      font-size: 12px;
      line-height: 18px;
      color: #4b4b7c;
      margin-bottom: 4px;
    }
    hr {
      margin: 4px 0px;
    }
    hr + div {
      font-weight: 500;
      margin-bottom: 18px;
    }
  }
`;
