import React, {SyntheticEvent, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "../store/store";
import {
  getCurrentUser,
  getIsInfoSending,
  getIsInfoSendError,
} from "../store/current-user/selectors";
import { sendInfo } from "../store/current-user/actions";

import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";
import Input from "./ui/Input";

type TEditProfilePopupProps = {
  onClose: () => void;
};

type TProfileFormData = {
  name: string;
  about: string;
}

function EditProfilePopup({ onClose }: TEditProfilePopupProps): React.JSX.Element {
  const dispatch = useDispatch<Promise<unknown>>();
  const currentUser = useSelector(getCurrentUser);
  const isSending = useSelector(getIsInfoSending);
  const sendingError = useSelector(getIsInfoSendError);

  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation<TProfileFormData>({
      name: "",
      about: ""
    });

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {name: "", about: ""}, true);
    }
  }, [currentUser, resetForm]);

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  function handleSubmit(evt: SyntheticEvent) {
    evt.preventDefault();
    dispatch(sendInfo(values)).then(() => onClose());
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Редактировать профиль"
      name="edit"
      buttonText={isSending ? "Сохранение..." : "Сохранить"}
      isDisabled={!isValid || isSending}
    >
      <Input
        ref={inputRef}
        type="text"
        name="name"
        id="owner-name"
        placeholder="Имя"
        required
        minLength={2}
        maxLength={40}
        pattern="[a-zA-Zа-яА-Я -]{1,}"
        value={values.name}
        error={errors.name}
        onChange={handleChange}
      />
      <Input
        type="text"
        name="about"
        id="owner-description"
        placeholder="Занятие"
        required
        minLength={2}
        maxLength={200}
        value={values.about}
        error={errors.about}
        onChange={handleChange}
      />
      {!!sendingError && (
        <span className="popup__send-error">{`Ошибка: ${sendingError}`}</span>
      )}
    </PopupWithForm>
  );
}

export default EditProfilePopup;
