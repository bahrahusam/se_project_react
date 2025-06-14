import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import "./App.css";
import { coordinates, APIkey } from "../../utils/constants";
import Header from "../Header/Header";
import Main from "../Main/Main";

import ItemModal from "../ItemModal/ItemModal";
import CurrentTemperatureUnitContext from "../../contexts/CurrentTemperatureUnit";

import { getWeather, filterWeatherData } from "../../utils/weatherApi";
import AddItemModal from "../AddItemModal/AddItemModal";

import Profile from "../Profile/Profile";

import { getItems, deleteItem, postItem } from "../../utils/api";
import LoginModal from "../LoginModal/LoginModal";

import { register, authorize, checkToken } from "../../utils/auth";

import RegisterModal from "../RegisterModal/RegisterModal";
import EditProfileModal from "../EditProfileModal/EditProfileModal";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { updateUserProfile } from "../../utils/api";
import { addCardLike, removeCardLike } from "../../utils/api";

function App() {
  const [weatherData, setWeatherData] = useState({
    type: "",
    temp: { F: 999, C: 999 },
    city: "",
    condition: "",
    isDay: false,
  });

  const [clothingItems, setClothingItems] = useState([]); //defaultclothingitems was here
  const [activeModal, setActiveModal] = useState("");
  const [selectedCard, setSelectedCard] = useState({});
  const [currentTemperatureUnit, setCurrentTemperatureUnit] = useState("F");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [currentUser, setCurrentUser] = useState(null);

  const [token, setToken] = useState(localStorage.getItem("jwt") || null);

  const handleToggleSwitchChange = () => {
    setCurrentTemperatureUnit(currentTemperatureUnit === "F" ? "C" : "F");
  };

  const handleCardClick = (card) => {
    setActiveModal("preview");
    setSelectedCard(card);
  };

  const handleAddClick = () => {
    setActiveModal("add-garment");
  };

  //new handler for login
  const handleLoginClick = () => {
    setActiveModal("login");
  };

  const handleSignUpClick = () => {
    setActiveModal("signUp");
  };
  const handleEditClick = () => {
    setActiveModal("edit");
  };

  const handleCloseClick = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, image, weather }) => {
    postItem({ name, imageUrl: image, weather }, token) // Call API to add item
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]); // Update state with new item

        handleCloseClick(); // Close modal after successful addition
      })
      .catch((err) => console.error("Error adding item:", err));
  };

  const handleDeleteItem = (card) => {
    deleteItem(card._id, token) // Call the API to delete the item
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== card._id)
        ); // Remove item from state
        handleCloseClick(); // Close the modal
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

  const handleRegister = ({ name, avatarUrl, email, password }) => {
    register({ name, avatar: avatarUrl, email, password })
      .then(() => {
        return authorize({ email, password });
      })
      .then((userData) => {
        if (userData.token) {
          localStorage.setItem("jwt", userData.token);
          setToken(userData.token);
          setIsLoggedIn(true);
          handleCloseClick();
          console.log("User registered and logged in:", userData);
        } else {
          return Promise.reject("No token in registration login response");
        }
      })
      .catch((err) => {
        console.error("Registration or login error:", err);
      });
  };

  const handleEditProfileSubmit = ({ name, avatar }) => {
    updateUserProfile({ name, avatar }, token)
      .then((updatedUser) => {
        setCurrentUser(updatedUser); // Update user in context
        handleCloseClick(); // Close the modal
      })
      .catch((err) => {
        console.error("Failed to update profile:", err);
      });
  };

  const handleCardLike = ({ id, isLiked }) => {
    const request = !isLiked
      ? addCardLike(id, token)
      : removeCardLike(id, token);

    request
      .then((updatedCard) => {
        setClothingItems((prevItems) =>
          prevItems.map((item) =>
            item._id === updatedCard._id ? updatedCard : item
          )
        );
      })
      .catch((err) => {
        console.error("Error updating like:", err);
      });
  };

  const handleLogin = ({ email, password }) => {
    authorize({ email, password })
      .then((res) => {
        if (res.token) {
          localStorage.setItem("jwt", res.token); // Save token
          setToken(res.token);
          setIsLoggedIn(true); // Update login state
          handleCloseClick(); // Close login modal
          console.log("Login successful:", res);
        } else {
          return Promise.reject("No token in response");
        }
      })
      .catch((err) => {
        console.error("Login error:", err);
      });
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setToken(null);
    setIsLoggedIn(false);
    setCurrentUser(null);
    navigate("/");
  };

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    if (token) {
      checkToken(token)
        .then((userData) => {
          console.log("Token is valid. User data:", userData);
          setIsLoggedIn(true); // Keep user logged in
          setToken(token);
          setCurrentUser(userData);
        })
        .catch((err) => {
          console.error("Token check failed:", err);
          setIsLoggedIn(false);
          setToken(null);
          localStorage.removeItem("jwt"); // Clean up invalid token
        });
    }
  }, [token]);

  useEffect(() => {
    getWeather(coordinates, APIkey)
      .then((data) => {
        const filteredData = filterWeatherData(data);
        setWeatherData(filteredData);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    getItems()
      .then((data) => {
        setClothingItems(data);
      })
      .catch((err) => console.error("Failed to fetch items:", err));
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <CurrentTemperatureUnitContext.Provider
        value={{ currentTemperatureUnit, handleToggleSwitchChange }}
      >
        <div className="page">
          <div className="page__content">
            <Header
              handleAddClick={handleAddClick}
              handleLoginClick={handleLoginClick}
              handleSignUpClick={handleSignUpClick}
              weatherData={weatherData}
              isLoggedIn={isLoggedIn}
            />
            <Routes>
              <Route
                path="/"
                element={
                  //pass clothingitems as prop here
                  <Main
                    weatherData={weatherData}
                    onCardClick={handleCardClick}
                    clothingItems={clothingItems}
                    onCardLike={handleCardLike}
                  />
                }
              />
              <Route
                path="/profile"
                element={
                  // <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    clothingItems={clothingItems}
                    onCardClick={handleCardClick}
                    handleAddClick={handleAddClick}
                    handleEditClick={handleEditClick}
                    onCardLike={handleCardLike}
                    handleLogout={handleLogout}
                  />
                  // </ProtectedRoute>
                }
                onCardClick={handleCardClick}
              />
            </Routes>
          </div>
          <AddItemModal
            activeModal={activeModal}
            handleCloseClick={handleCloseClick}
            onAddItemModalSubmit={handleAddItemModalSubmit}
          />
          <ItemModal
            activeModal={activeModal}
            card={selectedCard}
            handleCloseClick={handleCloseClick}
            handleDeleteItem={handleDeleteItem}
          />
          <LoginModal
            activeModal={activeModal}
            handleCloseClick={handleCloseClick}
            onLogin={handleLogin}
            handleSignUpClick={handleSignUpClick}
          />
          <RegisterModal
            activeModal={activeModal}
            handleCloseClick={handleCloseClick}
            onRegister={handleRegister}
            handleLoginClick={handleLoginClick}
          />
        </div>

        <EditProfileModal
          activeModal={activeModal}
          handleCloseClick={handleCloseClick}
          onEdit={handleEditProfileSubmit}
        />
      </CurrentTemperatureUnitContext.Provider>
    </CurrentUserContext.Provider>
  );
}
export default App;
