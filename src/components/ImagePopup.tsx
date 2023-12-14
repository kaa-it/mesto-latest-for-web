import React, { useEffect } from "react";
import Popup from "./Popup";
import { useSelector, useDispatch } from "../store/store";
import { getCardById, getIsCardsLoading } from "../store/cards/selectors";
import { useParams } from "react-router";
import { loadCards } from "../store/cards/actions";

type TImagePopupProps = {
  onClose: () => void;
};

function ImagePopup({ onClose }: TImagePopupProps): React.JSX.Element | null {
  const {id} = useParams();
  const isCardsLoading = useSelector(getIsCardsLoading);
  const card = useSelector(store => getCardById(store, id!))
  const dispatch = useDispatch();

  useEffect(() => {
    if (!card && !isCardsLoading) {
      dispatch(loadCards());
    }
  }, [card, isCardsLoading, dispatch])

  if (!card) return null;

  return (
    <Popup
      onClose={onClose}
      popupClass='popup_type_image'
      contentClass='popup__content_content_image'
    >
      <img
        alt={card ? card.name : ""}
        src={card ? card.link : ""}
        className='popup__image'
      />
      <p className='popup__caption'>{card ? card.name : ""}</p>
    </Popup>
  );
}

export default ImagePopup;
