import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authLogin } from "../state/auth/actions";

export function SignUpPage() {
  const location = useLocation();
  const history = useHistory();
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
      <h1>Регистрация нового пиццееда</h1>
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
          <button type="submit">Зарегистрироваться</button>
        </div>
        <div>
          <Link to="/signin">Авторизация</Link>
        </div>
      </form>
    </>
  );
}
