class Api {
  constructor({ baseUrl }) {
    this.baseUrl = baseUrl;
  }

  // Obtener headers con el token de autorización desde localStorage
  _getHeaders() {
    const token = localStorage.getItem('token');
    if (!token) {
      return Promise.reject('No token found. Please log in.');
    }
    console.log('Token:', token);  // Verifica que el token se esté obteniendo correctamente
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }
  // Método para verificar la respuesta de la solicitud
  _checkResponse(res) {
    if (!res.ok) {
      // Manejo de errores según el código de estado
      if (res.status === 401) {
        // Si el token es inválido o ha expirado
        localStorage.removeItem('token');  // Eliminar token si es inválido
        alert('Your session has expired, please log in again.');
        setTimeout(() => {
          window.location.href = '/signin';  // Redirigir a la página de login
        }, 2000);  // Redirige después de 2 segundos para mostrar el mensaje al usuario
      } else if (res.status === 403) {
        // Token prohibido, no tiene permisos
        res.json().then((errorData) => {
          alert(`Error: ${errorData.message || 'Access Forbidden'}`);
        });
      } else {
        return res.json().then((errorData) => {
          alert(`Error: ${errorData.message || res.statusText}`);  // Mostrar mensaje de error al usuario
          return Promise.reject(`Error: ${res.status}`);
        });
      }
    }
    return res.json();
  }

  // Función para hacer solicitudes y manejar respuestas
  request(url, options = {}) {
    return fetch(url, options)
      .then(this._checkResponse)
      .catch((error) => {
        console.error('Error:', error);
        throw error;  // O maneja de acuerdo a la lógica de tu aplicación
      });
  }

  // Obtener información del usuario
  getUserInfo() {
    return this.request(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this._getHeaders(),
    });
  }

  // Obtener tarjetas
  getCards() {
    return this.request(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this._getHeaders(),
    });
  }

  // Actualizar información del usuario
  updateUserInfo(data) {
    return this.request(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify(data),
    });
  }

  // Actualizar avatar del usuario
  updateAvatar(avatar) {
    return this.request(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar }),
    });
  }

  // Agregar una nueva tarjeta
  addCard(cardData) {
    return this.request(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify(cardData),
    });
  }

  // Cambiar el estado del like en una tarjeta
  changeLikeCardStatus(cardId, isLiked) {
    return this.request(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._getHeaders(),
    });
  }

  // Eliminar una tarjeta
  deleteCard(cardId) {
    return this.request(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    });
  }
}

// Obtener la URL base desde las variables de entorno
const api = new Api({
  // Asegúrate de que la URL esté configurada correctamente para el entorno de producción
  baseUrl: process.env.REACT_APP_API_URL || 'https://api.instabook.mooo.com', // URL para producción
});

export default api;
