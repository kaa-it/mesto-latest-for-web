import React from "react";

type TInputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  error?: string;
};

const Input = React.forwardRef<HTMLInputElement, TInputProps>(
  ({ error = "", value = "", className, ...props }, ref) => {
    return (
      <label className="popup__label">
        <input className={`popup__input ${className}`} ref={ref} {...props} value={value}/>
        <span className="popup__error" id="place-name-error">
          {error || ""}
        </span>
      </label>
    );
  }
);

export default Input;
