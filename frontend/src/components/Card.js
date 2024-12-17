import React, { useContext } from 'react';
import CurrentUserContext from './Contexts/CurrentUserContext';

export default function Card({ card, onCardClick, onCardLike, onCardDelete }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner._id === currentUser._id;
  console.log(isOwn);
   // Verifica si el usuario actual es el propietario
  // const isLiked = card.isLiked; // Verifica si el usuario actual le dio "like"
  const isLiked = card.likes.length>0;
  const cardDeleteButtonClassName = `cards__delete-icon ${isOwn ? 'cards__delete-icon_visible' : 'cards__delete-icon_hidden'}`;
  const cardLikeButtonClassName = `cards__like-icon ${isLiked ? 'cards__like-color' : ''}`;
console.log(card);
  return (
    <article className="cards__card">
      <img
        src={card.link}
        alt={card.name}
        className="cards__image"
        onClick={() => onCardClick(card)} // Asegúrate de que se pase el card
      />
      <button
        className={cardDeleteButtonClassName}
        onClick={() => onCardDelete(card)}
        aria-label="Delete card"
      />
      <div className="cards__menu">
        <h2 className="cards__title">{card.name}</h2>
        <div className="cards__like-container">
          <button
            className={cardLikeButtonClassName}
            onClick={() => onCardLike(card)} // Llama la función onCardLike al hacer click
            aria-label="Like card"
          />
          {/*<span className="cards__like-count">{card.likes.length}</span>*/}
        </div>
      </div>
    </article>
  );
}
