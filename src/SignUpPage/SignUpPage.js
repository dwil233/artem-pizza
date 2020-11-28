import React from 'react';
import {Link, useHistory} from 'react-router-dom';

export function SignUpPage() {
  const history = useHistory()

  const handleSubmit = (event) => {
    event.preventDefault()
    history.push('/')
  }

  return <>
    <h1>Регистрация нового пиццееда</h1>
    <form onSubmit={handleSubmit}>
      <label>
        E-mail
        <input type="email"/>
      </label>
      <label>
        Пароль
        <input type="password"/>
      </label>
      <div><button type="submit">Зарегистрироваться</button></div>
      <div><Link to="/signin">Авторизоваться</Link></div>
    </form>
  </>
}