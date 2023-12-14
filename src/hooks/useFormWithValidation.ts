import React, {ChangeEvent, useCallback} from "react";

type TUseFormWithValidation<T> = {
  values: T,
  errors: T,
  isValid: Boolean,
  handleChange: (evt: ChangeEvent<HTMLInputElement>) => void,
  resetForm: (newValues?: T, newErrors?: T, newIsValid?: boolean) => void
}

export default function useFormWithValidation<T>(initialState: T): TUseFormWithValidation<T> {
  const [values, setValues] = React.useState<T>(initialState);
  const [errors, setErrors] = React.useState<T>(initialState);
  const [isValid, setIsValid] = React.useState(false);

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const input = evt.target;
    const value = input.value;
    const name = input.name;
    setValues({ ...values, [name]: value });
    setErrors({ ...errors, [name]: input.validationMessage });
    const form = input.closest("form");
    setIsValid(!!(form && form.checkValidity()));
  };

  const resetForm = useCallback(
    (newValues = initialState, newErrors = initialState, newIsValid = false) => {
      setValues(newValues);
      setErrors(newErrors);
      setIsValid(newIsValid);
    },
    [setValues, setErrors, setIsValid]
  );

  return { values, handleChange, resetForm, errors, isValid };
}
