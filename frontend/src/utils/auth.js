
const BASE_URL = 'https://se-register-api.en.tripleten-services.com/v1';

// Registrar usuario
export const register = (email, password) => {
  return fetch(`${BASE_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error(`Error de registro: ${text}`);
      });
    }
    return response.json();
  })
  .catch(err => {
    console.error("Error en la solicitud de registro:", err);
    throw err;
  });
};

// Iniciar sesión y guardar el token en localStorage
export const login = (email, password) => {
  return fetch(`${BASE_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error(`Error de inicio de sesión: ${text}`);
      });
    }
    return response.json();
  })
  .then((data) => {
    localStorage.setItem('token', data.token); // Almacenar el token en localStorage
    return data;
  })
  .catch(err => {
    console.error("Error en la solicitud de inicio de sesión:", err);
    throw err;
  });
};

// Obtener información del usuario usando el token
export const getUserInfo = (token) => {
  return fetch(`${BASE_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // Enviar token en el encabezado Authorization
    },
  })
  .then(response => {
    if (!response.ok) {
      return response.text().then(text => {
        throw new Error(`Error obteniendo datos del usuario: ${text}`);
      });
    }
    return response.json();
  })
  .catch(err => {
    console.error("Error al obtener la información del usuario:", err);
    throw err;
  });
};
