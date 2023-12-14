import React, { ReactNode } from "react";
import Popup from "./Popup";
import SuccessIcon from "../images/success-icon.svg";
import ErrorIcon from "../images/error-icon.svg";
import { JSX } from "react/jsx-runtime";

const ICONS = {
  success: SuccessIcon,
  error: ErrorIcon,
};

export type TMessageData = {
  text: string;
  iconType: keyof typeof ICONS;
};

type TInfoTooltipProps = {
  onClose: () => void;
  status: TMessageData;
  children?: ReactNode;
};

function InfoTooltip({
  onClose,
  status: { iconType, text } = { text: "", iconType: "success" },
}: TInfoTooltipProps): JSX.Element {
  return (
    <Popup onClose={onClose}>
      <img className="popup__icon" src={ICONS[iconType]} alt={text} />
      <p className="popup__status-message">{text}</p>
    </Popup>
  );
}

export default InfoTooltip;
