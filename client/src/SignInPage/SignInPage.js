import React from 'react';
import {Link, useHistory} from 'react-router-dom';
import {useForm} from 'react-hook-form';

export function SignInPage() {
  const history = useHistory()
  const { register, handleSubmit, errors } = useForm()

  const onSubmit = (data) => {
    console.log(data)
    history.push('/')
  }

  return <>
    <h1>Авторизация пиццееда</h1>
    <form onSubmit={handleSubmit(onSubmit)}>
      <label>
        E-mail
        <input ref={ register({ required: true }) }
               type="email"
               name="email"
        />
        {errors.email && <p>Введите адрес электронной почты</p>}
      </label>
      <label>
        Пароль
        <input ref={ register({ required: true }) }
               type="password"
               name="password"
        />
        {errors.password && <p>Пароль не должен быть пустым</p>}
      </label>
      <div><button type="submit">Авторизоваться</button></div>
      <div><Link to="/signup">Регистрация</Link></div>
    </form>
  </>
}