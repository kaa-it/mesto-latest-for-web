import React, {SyntheticEvent} from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../store/auth/actions";
import { getLoginSending } from "../store/auth/selectors";
import { useSelector, useDispatch } from "../store/store";
import useForm from "../hooks/useForm";
import {TMessageData} from "./InfoTooltip";

type TLoginProps = {
  setTooltip: (message: TMessageData) => void;
}

type TFormData = {
  email: string;
  password: string;
}

function Login({ setTooltip }: TLoginProps): React.JSX.Element {
  const navigate = useNavigate();
  const dispatch = useDispatch<Promise<unknown>>();
  const isSending= useSelector(getLoginSending);
  const { values, handleChange } = useForm<TFormData>({
    email: "",
    password: ""
  });

  function handleSubmit(evt: SyntheticEvent) {
    evt.preventDefault();
    dispatch(login(values))
      .then(() => {
        navigate("/gallery");
      })
      .catch(() => {
        setTooltip({
          text: "Что-то пошло не так! Попробуйте ещё раз.",
          iconType: "error",
        });
      });
  }

  return (
    <div className='auth-form'>
      <form className='auth-form__form' onSubmit={handleSubmit}>
        <div className='auth-form__wrapper'>
          <h3 className='auth-form__title'>Вход</h3>
          <label className='auth-form__input'>
            <input
              type='email'
              name='email'
              id='email'
              className='auth-form__textfield'
              placeholder='Email'
              value={values.email || ''}
              onChange={handleChange}
              required
            />
          </label>
          <label className='auth-form__input'>
            <input
              type='password'
              name='password'
              id='password'
              className='auth-form__textfield'
              placeholder='Пароль'
              value={values.password || ''}
              onChange={handleChange}
              required
            />
          </label>
        </div>
        <button
          className='auth-form__button'
          type='submit'
          disabled={isSending}
        >
          {isSending ? "Вход..." : "Войти"}
        </button>
      </form>
    </div>
  );
}

export default Login;
