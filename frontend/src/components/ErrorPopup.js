// ErrorPopup.js
import React from 'react';

const ErrorPopup = ({ isOpen, onClose }) => {
  return (
    <div className={`error-popup ${isOpen ? 'error-popup_open' : ''}`}>
      <div className="error-popup__content">
        <img src="/path/to/form.svg" alt="Error" className="error-popup__image" />
        <button className="error-popup__close" onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ErrorPopup;
