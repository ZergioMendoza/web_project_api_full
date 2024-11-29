import React, { useState } from 'react';
import PopupWithForm from './PopupWithForm';

function AddPlacePopup({ isOpen, onClose, onAddPlace, isLoading }) {
  const [name, setName] = useState('');
  const [link, setLink] = useState('');

  // Manejar el envío del formulario
  async function handleSubmit(e) {
    e.preventDefault();

    // Verificar si los valores son válidos
    if (!name || !link) return;

    try {
      // Setear el estado de carga en true
      onAddPlace({ isLoading: true });

      // Crear el objeto de datos de la tarjeta
      const cardData = { name, link };

      // Hacer la solicitud al backend para crear la tarjeta
      const response = await fetch('http://localhost:5000/cards', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`, // Incluyendo el token en el encabezado
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cardData),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 403) {
          // Token no válido o expirado, redirigir al login
          console.log('Token expirado o inválido. Redirigiendo a inicio de sesión...');
          localStorage.removeItem('token');
          window.location.href = '/signin'; // Redirigir al login
        } else {
          throw new Error(data.error || 'Error al crear la tarjeta');
        }
      }

      // Llamar a la función de agregar tarjeta si la respuesta es exitosa
      onAddPlace(data);  // Pasar la nueva tarjeta al componente principal
      onClose(); // Cerrar el popup

    } catch (error) {
      console.error('Error creando la tarjeta:', error);
    } finally {
      // Asegurarse de cambiar el estado de carga después de la solicitud
      onAddPlace({ isLoading: false });
    }

    // Limpiar los campos del formulario
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
