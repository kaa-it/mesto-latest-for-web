import React, {useState, useEffect} from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Link, useRouteMatch, useHistory } from "react-router-dom";

import { getCurrentUser } from "../store/current-user/selectors";
import {
  getCards,
  getIsCardsLodaing,
  getCardsLoadError,
} from "../store/cards/selectors";

import {deleteCard, loadCards} from "../store/cards/actions";
import {loadData as loadUserInfo} from "../store/current-user/actions";

import Card from "./Card";
import Preloader from "./Preloader";
import PopupWithForm from './PopupWithForm';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';

function Main() {
  const history = useHistory();
  const {url, path} = useRouteMatch();

  const [cardForDelete, setCardForDelete] = useState(null);
  const currentUser = useSelector(getCurrentUser);
  const cards = useSelector(getCards);
  const isCardsLoading = useSelector(getIsCardsLodaing);
  const isCardsError = useSelector(getCardsLoadError);

  const dispatch = useDispatch();
  const handleCardDeleteRequest = (card) => setCardForDelete(card);

  useEffect(() => {
    dispatch(loadCards());
    dispatch(loadUserInfo());
  },[dispatch])

  const handleCardDelete = (evt) => {
    evt.preventDefault();
    dispatch(deleteCard(cardForDelete._id))
      .catch(() => console.log('delete error'))
      .finally(() => setCardForDelete(null));
  }

  function closePopup() {
    history.push('/gallery');
  }

  return (
    <>
      <main className='content'>
        <section className='profile page__section'>
          <Link
            className='profile__image'
            to={`${url}/edit-profile-avatar`}
            style={{ backgroundImage: `url(${currentUser.avatar})`}}
          ></Link>
          <div className='profile__info'>
            <h1 className='profile__title'>{currentUser.name}</h1>
            <Link
              className='profile__edit-button'
              type='button'
              to={`${url}/edit-profile`}
              ></Link>
            <p className='profile__description'>{currentUser.about}</p>
          </div>
          <Link
            className='profile__add-button'
            type='button'
            to={`${url}/add-card`}
          ></Link>
        </section>
        <section className='places page__section'>
          {isCardsLoading && <Preloader />}

          {isCardsError && <p className='places__loading'>{isCardsError}</p>}

          {!isCardsLoading && !isCardsError && (
            <ul className='places__list'>
              {cards.map((data) => (
                <Card
                  key={data._id}
                  card={data}
                  onDelete={handleCardDeleteRequest}
                />
              ))}
            </ul>
          )}
        </section>
      </main>
      <Route path={`${path}/edit-profile`}>
        <EditProfilePopup onClose={closePopup}/>
      </Route>
      <Route path={`${path}/add-card`}>
        <AddPlacePopup onClose={closePopup}/>
      </Route>
      <Route path={`${path}/edit-profile-avatar`}>
        <EditAvatarPopup onClose={closePopup}/>
      </Route>
      {cardForDelete && <PopupWithForm
        title='Вы уверены?'
        name='remove-card'
        buttonText='Да'
        onClose={() => setCardForDelete(null)}
        onSubmit={handleCardDelete}
      />}
    </>
  );
}

export default Main;
