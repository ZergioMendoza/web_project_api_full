
import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar, isLoading }) {
  const avatarRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value
    });
    avatarRef.current.value = ''; // Limpiar el input después de enviar
  }

  useEffect(() => {
    avatarRef.current.value = '';
  }, [isOpen]);

  return (
    <PopupWithForm
      title="Cambiar foto de perfil"
      name="edit-avatar"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      buttonText={isLoading ? "Guardando..." : "Guardar"}
    >
      <input
        ref={avatarRef}
        type="url"
        name="avatar"
        placeholder="Enlace a la imagen"
        className="popup__input popup__input_type_avatar-link"
        required
      />
      <span className="popup__input-error avatar-link-input-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;

