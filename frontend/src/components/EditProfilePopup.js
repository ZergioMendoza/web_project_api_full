

import React, { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from './Contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (currentUser) {
      setName(currentUser.name || '');
      setDescription(currentUser.about || '');
    }
  }, [currentUser, isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description
    });
  }

  return (
    <PopupWithForm
      title="Editar perfil"
      name="edit-profile"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Guardando..." : "Guardar"}
    >
      <input
        type="text"
        name="name"
        placeholder="Nombre"
        className="popup__input popup__input_type_name"
        minLength="2"
        maxLength="40"
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <span className="popup__input-error name-input-error"></span>
      <input
        type="text"
        name="about"
        placeholder="Acerca de"
        className="popup__input popup__input_type_about"
        minLength="2"
        maxLength="200"
        required
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <span className="popup__input-error about-input-error"></span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
