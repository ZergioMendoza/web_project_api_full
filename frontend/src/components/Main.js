

import { useContext, useState, useEffect } from 'react';
import profileLogo from '../images/img-profile.jpg';
import vector from '../images/Vector.svg';
import api from '../utils/Api';
import Card from './Card';
import CurrentUserContext from './Contexts/CurrentUserContext';

export default function Main({
  onEditProfileClick,
  onAddPlaceClick,
  onEditAvatarClick,
  onCardClick,
  onCardLike,
  onCardDelete,
  cards
}) {
  // Obtén el usuario actual del contexto
  const currentUser = useContext(CurrentUserContext);

  const [userName, setUserName] = useState('');
  const [userDescription, setUserDescription] = useState('');
  const [userAvatar, setUserAvatar] = useState(profileLogo);

  // Efecto para sincronizar la información del usuario del contexto con los estados locales
  useEffect(() => {
    if (currentUser) {
      setUserName(currentUser.name);
      setUserDescription(currentUser.about);
      setUserAvatar(currentUser.avatar || profileLogo);
    }
  }, [currentUser]);

  return (
    <main id="main">
      <section className="profile">
        <div className="profile__avatar-container" onClick={onEditAvatarClick}>
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${userAvatar})` }}
          />
          <div className="profile__avatar-edit-icon">
            <img src={vector} alt="Edit icon" />
          </div>
        </div>

        <div className="profile__info">
          <h1 className="profile__name">{userName}</h1>
          <button className="profile__edit-button" onClick={onEditProfileClick} aria-label="Edit profile"></button>
          <p className="profile__about">{userDescription}</p>
          <button className="profile__add-button" onClick={onAddPlaceClick} aria-label="Add place"></button>
        </div>
      </section>

      {/* Sección de tarjetas */}
      <section className="cards">
        {cards.length > 0 ? (
          cards.map((card) => (
            <Card
              key={card._id}
              card={card}
              onCardClick={onCardClick}
              onCardLike={onCardLike}
              onCardDelete={onCardDelete}
            />
          ))
        ) : (
          <p>No hay tarjetas disponibles.</p>
        )}
      </section>
    </main>
  );
}
