

// class Api {
//   constructor({ baseUrl }) {
//     this.baseUrl = baseUrl;
//   }

//   // Obtener headers con el token de autorización desde localStorage
//   _getHeaders() {
//     const token = localStorage.getItem('token');
//     return {
//       Authorization: `f91e0604-69c2-4542-b692-9fcd94072601`,
//       'Content-Type': 'application/json',
//     };
//   }

//   // Método para verificar la respuesta de la solicitud
//   _checkResponse(res) {
//     if (!res.ok) {
//       return Promise.reject(`Error: ${res.status}`);
//     }
//     return res.json();
//   }

//   // Obtener información del usuario
//   getUserInfo() {
//     return fetch(`${this.baseUrl}/users/me`, {
//       method: 'GET',
//       headers: this._getHeaders()
//     }).then(this._checkResponse);
//   }

//   // Obtener tarjetas
//   getCards(token) {
//     return fetch(`${this.baseUrl}/cards`, {
//       method: 'GET',
//       headers: this._getHeaders(),
//     }).then(this._checkResponse);
//   }

//   // Actualizar información del usuario
//   updateUserInfo(data) {
//     return fetch(`${this.baseUrl}/users/me`, {
//       method: 'PATCH',
//       headers: this._getHeaders(),
//       body: JSON.stringify(data),
//     }).then(this._checkResponse);
//   }

//   // Actualizar avatar del usuario
//   updateAvatar(avatar) {
//     return fetch(`${this.baseUrl}/users/me/avatar`, {
//       method: 'PATCH',
//       headers: this._getHeaders(),
//       body: JSON.stringify({ avatar }),
//     }).then(this._checkResponse);
//   }

//   // Agregar una nueva tarjeta
//   addCard(cardData) {
//     return fetch(`${this.baseUrl}/cards`, {
//       method: 'POST',
//       headers: this._getHeaders(),
//       body: JSON.stringify(cardData),
//     }).then(this._checkResponse);
//   }

//   // Cambiar el estado del like en una tarjeta
//   changeLikeCardStatus(cardId, isLiked) {
//     return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
//       method: isLiked ? 'PUT' : 'DELETE',
//       headers: this._getHeaders(),
//     }).then(this._checkResponse);
//   }

//   // Eliminar una tarjeta
//   deleteCard(cardId) {
//     return fetch(`${this.baseUrl}/cards/${cardId}`, {
//       method: 'DELETE',
//       headers: this._getHeaders(),
//     }).then(this._checkResponse);
//   }
// }

// // Crear una instancia de la API con la URL base
// const api = new Api({
//   baseUrl: 'https://around-api.es.tripleten-services.com/v1',
  
// });

// export default api;

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
    return {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
  }

  // Método para verificar la respuesta de la solicitud
  _checkResponse(res) {
    if (!res.ok) {
      if (res.status === 401) {
        // Si el token es inválido o ha expirado, puedes manejarlo aquí
        localStorage.removeItem('token'); // Eliminar token si es inválido
        window.location.href = '/signin';  // Redirigir a la página de login
      }
      return Promise.reject(`Error: ${res.status}`);
    }
    return res.json();
  }

  // Obtener información del usuario
  getUserInfo() {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'GET',
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  // Obtener tarjetas
  getCards() {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'GET',
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  // Actualizar información del usuario
  updateUserInfo(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify(data),
    }).then(this._checkResponse);
  }

  // Actualizar avatar del usuario
  updateAvatar(avatar) {
    return fetch(`${this.baseUrl}/users/me/avatar`, {
      method: 'PATCH',
      headers: this._getHeaders(),
      body: JSON.stringify({ avatar }),
    }).then(this._checkResponse);
  }

  // Agregar una nueva tarjeta
  addCard(cardData) {
    return fetch(`${this.baseUrl}/cards`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify(cardData),
    }).then(this._checkResponse);
  }

  // Cambiar el estado del like en una tarjeta
  changeLikeCardStatus(cardId, isLiked) {
    return fetch(`${this.baseUrl}/cards/${cardId}/likes`, {
      method: isLiked ? 'PUT' : 'DELETE',
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }

  // Eliminar una tarjeta
  deleteCard(cardId) {
    return fetch(`${this.baseUrl}/cards/${cardId}`, {
      method: 'DELETE',
      headers: this._getHeaders(),
    }).then(this._checkResponse);
  }
}

// Crear una instancia de la API con la URL base
const api = new Api({
  baseUrl: 'https://around-api.es.tripleten-services.com/v1',
});

export default api;
