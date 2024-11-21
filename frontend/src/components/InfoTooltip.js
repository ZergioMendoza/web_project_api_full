
// Importa el CSS del componente


import React, { useEffect } from 'react';

function InfoTooltip({ isOpen, message, onClose, icon }) {
  // Manejar el cierre del popup al presionar "Escape"
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    // Agregar el evento al montar el componente
    document.addEventListener('keydown', handleEsc);

    // Limpiar el evento al desmontar el componente
    return () => {
      document.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]); // Aquí está bien porque `onClose` se pasa como prop

  // Manejar el cierre del popup al hacer clic afuera
  useEffect(() => {
    const handleClickOutside = (event) => {
      const popupContent = document.querySelector('.popup__content');
      if (isOpen && popupContent && !popupContent.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    // Limpiar el evento al desmontar el componente
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen, onClose]); // Añadido `onClose` para cumplir con ESLint

  return (
    <div className={`popup ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__content">
        <button type="button" className="popup__close-button" onClick={onClose} />
        <img src={icon} alt="Status" className="popup__status-icon" />
        <h2 className="popup__message">{message}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
