import React from "react";
import styled from "styled-components";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { authSlice } from "../state/auth/authReducer";

function SignInPageLayout({ className }) {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const { register, handleSubmit, errors } = useForm();

  const queryParams = new URLSearchParams(location.search);
  const cameFrom = queryParams.get("cameFrom");

  const onSubmit = (data) => {
    dispatch(authSlice.actions.login(data.email));
    cameFrom ? history.push(cameFrom) : history.push("/");
  };

  return (
    <div className={className}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          E-mail
          <input
            ref={register({ required: true })}
            type="email"
            name="email"
            autoComplete="username"
          />
          {errors.email && <p>Введите адрес электронной почты</p>}
        </label>
        <label>
          Пароль
          <input
            ref={register({ required: true })}
            type="password"
            name="password"
            autoComplete="current-password"
          />
          {errors.password && <p>Пароль не должен быть пустым</p>}
        </label>
        <div>
          <button className="btn" type="submit">
            Войти
          </button>
        </div>
        <div>
          <Link to="/signup">Регистрация</Link>
        </div>
      </form>
    </div>
  );
}

export const SignInPage = styled(SignInPageLayout)`
  background: #f9f9fb;
  height: 100%;
  padding: 16px;

  form {
    background: #ffffff;
    padding: 16px;

    box-shadow: 0px 8px 16px rgba(75, 75, 124, 0.05);
    border-radius: 16px;

    label {
      display: block;
      color: #4b4b7c;
      margin-bottom: 16px;
    }

    input {
      display: block;
      margin-top: 4px;
      margin-bottom: 16px;
      width: 100%;
    }

    div {
      margin: 8px 0px;
      text-align: center;
    }
  }
`;
