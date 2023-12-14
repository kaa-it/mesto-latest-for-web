import React from "react";
import Popup from "./Popup";

type TPopupWithFormProps = {
  title: string;
  name: string;
  onClose: () => void;
  children?: React.ReactNode;
  onSubmit: (evt: React.SyntheticEvent) => void;
  buttonText?: string;
  isDisabled?: boolean;
};

function PopupWithForm({
  title,
  name,
  onClose,
  children,
  onSubmit,
  buttonText = "Сохранить",
  isDisabled = false,
}: TPopupWithFormProps): React.JSX.Element {
  return (
    <Popup onClose={onClose}>
      <form className='popup__form' name={name} noValidate onSubmit={onSubmit}>
        <button
          type='button'
          className='popup__close'
          onClick={onClose}
        ></button>
        <h3 className='popup__title'>{title}</h3>
        {children}
        <button
          type='submit'
          className={`button popup__button ${
            isDisabled && "popup__button_disabled"
          }`}
          disabled={isDisabled}
        >
          {buttonText}
        </button>
      </form>
    </Popup>
  );
}

export default PopupWithForm;
