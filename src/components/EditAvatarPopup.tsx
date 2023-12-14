import React, {SyntheticEvent, useEffect, useRef} from "react";
import { useSelector, useDispatch } from "../store/store";
import PopupWithForm from "./PopupWithForm";

import {
  getCurrentUser,
  getIsAvatarSending,
  getIsAvatarSendError,
} from "../store/current-user/selectors";
import { sendAvatar } from "../store/current-user/actions";

import useFormWithValidation from "../hooks/useFormWithValidation";
import Input from "./ui/Input";

type TEditAvatarPopupProps = {
  onClose: () => void;
};

type TAvatarFormData = {
  avatar: string;
}

function EditAvatarPopup({ onClose }: TEditAvatarPopupProps): React.JSX.Element {
  const dispatch = useDispatch<Promise<unknown>>();
  const currentUser = useSelector(getCurrentUser);
  const isSending = useSelector(getIsAvatarSending);
  const sendingError = useSelector(getIsAvatarSendError);
  const { values, handleChange, resetForm, errors, isValid } =
    useFormWithValidation<TAvatarFormData>({avatar: ""});

  useEffect(() => {
    if (currentUser) {
      resetForm(currentUser, {avatar: ""}, false);
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
    dispatch(sendAvatar(values)).then(() => onClose());
  }

  return (
    <PopupWithForm
      onSubmit={handleSubmit}
      onClose={onClose}
      title="Обновить аватар"
      name="edit-avatar"
      buttonText={isSending ? "Сохранение..." : "Сохранить"}
      isDisabled={!isValid}
    >
      <Input
        ref={inputRef}
        type="url"
        name="avatar"
        id="owner-avatar"
        placeholder="Ссылка на изображение"
        value={values.avatar}
        error={errors.avatar}
        onChange={handleChange}
        required
      />
      {!!sendingError && (
        <span className="popup__send-error">{`Ошибка: ${sendingError}`}</span>
      )}
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
