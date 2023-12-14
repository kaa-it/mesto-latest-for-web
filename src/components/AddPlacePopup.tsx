import React, {SyntheticEvent, useEffect, useRef} from "react";
import {useSelector, useDispatch} from "../store/store";
import {getIsCardSending, getCardSendError} from "../store/cards/selectors";
import {addCard} from "../store/cards/actions";
import PopupWithForm from "./PopupWithForm";
import useFormWithValidation from "../hooks/useFormWithValidation";
import Input from "./ui/Input";

type TAddPlacePopup = {
    onClose: () => void;
};

type TPlaceFormData = {
    name: string;
    link: string;
}

function AddPlacePopup(
    {onClose}: TAddPlacePopup
): React.JSX.Element {
    const dispatch = useDispatch<Promise<unknown>>();
    const isSending = useSelector(getIsCardSending);
    const sendingError = useSelector(getCardSendError);

    const {values, handleChange, resetForm, errors, isValid} =
        useFormWithValidation<TPlaceFormData>({name: "", link: ""});

    useEffect(() => {
        resetForm();
    }, [resetForm]);

    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, []);

    function handleSubmit(evt: SyntheticEvent) {
        evt.preventDefault();
        dispatch(addCard(values)).then(() => onClose());
    }

    return (
        <PopupWithForm
            onSubmit={handleSubmit}
            onClose={onClose}
            title="Новое место"
            name="new-card"
            buttonText={isSending ? "Сохранение..." : "Сохранить"}
            isDisabled={!isValid || isSending}
        >
            <Input
                ref={inputRef}
                type="text"
                name="name"
                id="place-name"
                placeholder="Название"
                required
                minLength={1}
                maxLength={30}
                value={values.name}
                error={errors.name}
                onChange={handleChange}
            />
            <Input
                type="url"
                name="link"
                id="place-link"
                placeholder="Ссылка на картинку"
                required
                value={values.link}
                error={errors.link}
                onChange={handleChange}
            />
            {!!sendingError && (
                <span className="popup__send-error">{`Ошибка: ${sendingError}`}</span>
            )}
        </PopupWithForm>
    );
}

export default AddPlacePopup;
