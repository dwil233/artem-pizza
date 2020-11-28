import React from 'react';

export function OrderForm() {

  return <form>
    <fieldset>
      <legend>Адрес доставки</legend>
      <input name="address" placeholder="адрес"/>
      <div>
        <label>
          подъезд
          <input name="entrance" />
        </label>
        <label >
          этаж
          <input name="floor" />
        </label>
        <label >
          квартира
          <input name="flat" />
        </label>
      </div>
    </fieldset>
    <div>&nbsp;</div>
    <fieldset>
      <legend>Данные для оплаты</legend>
      <div><input name="card-number" placeholder="Номер карты"/></div>
      <div><input name="card-date" placeholder="01/2020"/>
      <input name="card-code" placeholder="CCV"/></div>
      <div><input name="card-holder" placeholder="IVAN DRAGOV"/></div>
    </fieldset>

    <h5>Доставим пиццу в течение часа или вернем деньги. Артем слов на ветер не бросает.</h5>
  </form>
}