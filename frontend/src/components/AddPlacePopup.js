
import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    onAddPlace({
      name,
      link
    });
    setName(''); // Limpiar el input
    setLink(''); // Limpiar el input
  }

  return (
    <PopupWithForm
      title="Nuevo lugar"
      name="add-place"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Guardando..." : "Crear"}
    >
      <input
        type="text"
        name="name"
        placeholder="Título"
        className="popup__input popup__input_type_place-title"
        minLength="2"
        maxLength="30"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="popup__input-error place-title-input-error"></span>
      <input
        type="url"
        name="link"
        placeholder="Enlace a la imagen"
        className="popup__input popup__input_type_place-link"
        required
        value={link}
        onChange={(e) => setLink(e.target.value)}
      />
      <span className="popup__input-error place-link-input-error"></span>
    </PopupWithForm>
  );
}

export default AddPlacePopup;
  