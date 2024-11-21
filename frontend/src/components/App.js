import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import api from '../utils/Api';
import { getUserInfo } from '../utils/auth';
import CurrentUserContext from './Contexts/CurrentUserContext';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import InfoTooltip from './InfoTooltip';
import ImagePopup from './ImagePopup';
import { login, register } from '../utils/auth';
import successIcon from '../images/success.png';
import errorIcon from '../images/error.png';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [infoTooltipOpen, setInfoTooltipOpen] = useState(false);
  const [infoMessage, setInfoMessage] = useState('');
  const [tooltipIcon, setTooltipIcon] = useState('');
  const navigate = useNavigate();

  // Manejo de token en localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      authenticateUser(storedToken);
    }
  }, []);

  // Función de autenticación
  const authenticateUser = async (token) => {
    try {
      const userInfo = await getUserInfo(token);
      if (userInfo) {
        setCurrentUser(userInfo.data);
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.error(`Error verifying token: ${err}`);
      localStorage.removeItem('token');
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {      
      api.getCards(localStorage.getItem('token'))
        .then((fetchedCards) => setCards(fetchedCards))
        .catch((err) => console.error('Error fetching cards:', err));
    }
  }, [isAuthenticated]);

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setSelectedCard(null);
  }

  function handleUpdateUser(data) {
    setIsLoading(true);
    api.updateUserInfo(data)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => console.error(`Error updating user info: ${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleUpdateAvatar({ avatar }) {
    setIsLoading(true);
    api.updateAvatar(avatar)
      .then((updatedUser) => {
        setCurrentUser(updatedUser);
        closeAllPopups();
      })
      .catch((err) => console.error(`Error updating avatar: ${err}`))
      .finally(() => setIsLoading(false));
  }

  function handleCardLike(card) {
    const isLiked = card.isLiked;
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((prevCards) => prevCards.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => console.error(`Error liking card: ${err}`));
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id)
      .then(() => {
        setCards((prevCards) => prevCards.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.error(`Error deleting card: ${err}`));
  }

  function handleAddPlaceSubmit({ name, link }) {
    setIsLoading(true);
    api.addCard({ name, link })
      .then((newCard) => {
        setCards((prevCards) => [newCard, ...prevCards]);
        closeAllPopups();
      })
      .catch((err) => console.error(`Error adding card: ${err}`))
      .finally(() => setIsLoading(false));
  }

  const handleLogin = async (email, password) => {
    try {
      const data = await login(email, password);
      localStorage.setItem('token', data.token);
      authenticateUser(data.token);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
      setInfoMessage('Login failed. Please check your credentials.');
      setTooltipIcon(errorIcon);
      setInfoTooltipOpen(true);
    }
  };

  const handleRegister = async (email, password) => {
    try {
      await register(email, password);
      setInfoMessage('Registration successful. You can now log in.');
      setTooltipIcon(successIcon);
      setInfoTooltipOpen(true);
    } catch (error) {
      console.error('Registration error:', error);
      setInfoMessage('Registration failed. Please try again.');
      setTooltipIcon(errorIcon);
      setInfoTooltipOpen(true);
    }
  };

  const closeInfoTooltip = () => {
    setInfoTooltipOpen(false);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser({});
    localStorage.removeItem('token');
    navigate('/signin');
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <Header isAuthenticated={isAuthenticated} onLogout={handleLogout} />
      <Routes>
        <Route path="/signup" element={<Register onRegister={handleRegister} />} />
        <Route path="/signin" element={<Login onLogin={handleLogin} />} />
        <Route
          path="/"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <div className="page">
                <Main
                  cards={cards}
                  onEditProfileClick={() => setIsEditProfilePopupOpen(true)}
                  onAddPlaceClick={() => setIsAddPlacePopupOpen(true)}
                  onEditAvatarClick={() => setIsEditAvatarPopupOpen(true)}
                  onCardClick={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                />
                <Footer />
                <EditProfilePopup
                  isOpen={isEditProfilePopupOpen}
                  onClose={closeAllPopups}
                  onUpdateUser={handleUpdateUser}
                  isLoading={isLoading}
                />
                <EditAvatarPopup
                  isOpen={isEditAvatarPopupOpen}
                  onClose={closeAllPopups}
                  onUpdateAvatar={handleUpdateAvatar}
                  isLoading={isLoading}
                />
                <AddPlacePopup
                  isOpen={isAddPlacePopupOpen}
                  onClose={closeAllPopups}
                  onAddPlace={handleAddPlaceSubmit}
                  isLoading={isLoading}
                />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
              </div>
            </ProtectedRoute>
          }
        />
      </Routes>
      <InfoTooltip
        isOpen={infoTooltipOpen}
        message={infoMessage}
        icon={tooltipIcon}
        onClose={closeInfoTooltip}
      />
    </CurrentUserContext.Provider>
  );
}

export default App;
