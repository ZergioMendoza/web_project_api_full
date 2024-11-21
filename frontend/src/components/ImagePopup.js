import React from 'react';

function ImagePopup({ card, onClose }) {
  if (!card) return null;

  return (
    <div className={`popup popup_type_image ${card ? 'popup_is-opened' : ''}`} onClick={onClose}>
      <div className="popup__container popup__container_image">
        <img src={card.link} alt={card.name} className="popup__image" />
        <h3 className="popup__caption">{card.name}</h3>
        <button className="popup__close" type="button" onClick={onClose}></button>
      </div>
    </div>
  );
}

export default ImagePopup;

