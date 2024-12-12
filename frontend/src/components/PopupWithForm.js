import React, { useEffect } from 'react';

function PopupWithForm({
  title,
  name,
  isOpen,
  onClose,
  onSubmit,
  children,
  buttonText,
}) {
  useEffect(() => {
    const handleEscKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('keydown', handleEscKey);
    };
  }, [onClose]);

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlayClick}
      role="dialog"
      aria-labelledby={`${name}-title`}
      aria-hidden={!isOpen}
    >
      <div className="popup__container">
        <h2 className="popup__title" id={`${name}-title`}>
          {title}
        </h2>
        <button
          className="popup__close"
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
        ></button>
        <form
          className="popup__form"
          name={name}
          onSubmit={onSubmit}
          noValidate
        >
          {children}
          <button type="submit" className="popup__submit">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
