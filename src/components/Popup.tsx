import React, {SyntheticEvent} from "react";
import ReactDOM from "react-dom";

const modalRoot = document.getElementById("modals");

type TPopupProps = {
  onClose: () => void;
  children: React.ReactNode;
  popupClass?: string;
  contentClass?: string;
};

function Popup({ onClose, children, popupClass="", contentClass="" }: TPopupProps): React.JSX.Element {
  React.useEffect(() => {
    const handleEscapeClose = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.addEventListener("keydown", handleEscapeClose);
    return () => {
      document.removeEventListener("keydown", handleEscapeClose);
    };
  }, [onClose]);

  const handleOverlayClose = (event: SyntheticEvent) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return ReactDOM.createPortal(
    <div
      className={`popup popup_is-opened ${popupClass}`}
      onMouseDown={handleOverlayClose}
    >
      <div className={`popup__content ${contentClass}`}>
        <button
          type='button'
          className='popup__close'
          onClick={onClose}
        ></button>
        {children}
      </div>
    </div>,
    modalRoot!
  );
}

export default Popup;