import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    if (!name || !link) return;

    try {
      const cardData = { name, link };

      // Enviar los datos al backend
      const response = await fetch('http://localhost:3001/api/cards', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Error creando la tarjeta');

      onAddPlace(data); // Añadir la tarjeta
      onClose(); // Cerrar el popup
    } catch (error) {
      console.error('Error creando la tarjeta:', error);
    }

    setName('');
    setLink('');
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
