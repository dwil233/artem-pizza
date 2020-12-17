import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authLogin } from "../state/auth/actions";
import { useDispatch } from "react-redux";

export function SignInPage() {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const queryParams = new URLSearchParams(location.search);
  const cameFrom = queryParams.get("cameFrom");

  const onSubmit = (data) => {
    dispatch(authLogin(data.email));
    cameFrom ? history.push(cameFrom) : history.push("/");
  };

  return (
    <>
      <h1>Авторизация пиццееда</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          E-mail
          <input ref={register({ required: true })} type="email" name="email" />
          {errors.email && <p>Введите адрес электронной почты</p>}
        </label>
        <label>
          Пароль
          <input
            ref={register({ required: true })}
            type="password"
            name="password"
          />
          {errors.password && <p>Пароль не должен быть пустым</p>}
        </label>
        <div>
          <button type="submit">Авторизоваться</button>
        </div>
        <div>
          <Link to="/signup">Регистрация</Link>
        </div>
      </form>
    </>
  );
}
