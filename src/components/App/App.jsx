import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";

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

import RegisterModal from "../RegisterModal/RegisterModal";

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

  const handleCloseClick = () => {
    setActiveModal("");
  };

  const handleAddItemModalSubmit = ({ name, image, weather }) => {
    postItem({ name, imageUrl: image, weather }) // Call API to add item
      .then((newItem) => {
        setClothingItems((prevItems) => [newItem, ...prevItems]); // Update state with new item

        handleCloseClick(); // Close modal after successful addition
      })
      .catch((err) => console.error("Error adding item:", err));
  };

  const handleDeleteItem = (card) => {
    deleteItem(card._id) // Call the API to delete the item
      .then(() => {
        setClothingItems((prevItems) =>
          prevItems.filter((item) => item._id !== card._id)
        ); // Remove item from state
        handleCloseClick(); // Close the modal
      })
      .catch((err) => console.error("Error deleting item:", err));
  };

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
        //set clothingitems
      })
      .catch(console.error);
  }, []);

  return (
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
                />
              }
            />
            <Route
              path="/profile"
              element={
                <Profile
                  clothingItems={clothingItems}
                  onCardClick={handleCardClick}
                  handleAddClick={handleAddClick}
                />
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
        />
        <RegisterModal
          activeModal={activeModal}
          handleCloseClick={handleCloseClick}
        />
      </div>
    </CurrentTemperatureUnitContext.Provider>
  );
}
export default App;
