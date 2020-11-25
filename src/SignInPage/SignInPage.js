import React from 'react';
import {Link, useHistory} from 'react-router-dom';

export function SignInPage() {
  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    history.push('/')
  }

  return <>
    <h1>Авторизация пиццееда</h1>
    <form onSubmit={handleSubmit}>
      <label>
        E-mail
        <input type="email"/>
      </label>
      <label>
        Пароль
        <input type="password"/>
      </label>
      <div><button type="submit">Авторизоваться</button></div>
      <div><Link to="/signup">Регистрация</Link></div>
    </form>
  </>
}