import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

export default function LoginModal({
  activeModal,
  handleCloseClick,
  onAddItemModalSubmit,
}) {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [image, setImage] = useState("");
  const handleImageChange = (e) => {
    setImage(e.target.value);
  };

  const [weather, setWeather] = useState("");
  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
  };

  // define `isOpen`
  const isOpen = activeModal === "login";

  useEffect(() => {
    setName("");
    setImage("");
    setWeather("");
  }, [isOpen]); // watch isOpen

  // the submit handler doesn't clear the inputs or close the modal
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ name, image, weather });
  };


  console.log(image);

  const addClothesButton = (
      <button
        
        type="button"
        className="header__add-clothes-btn"
      >
        or 
      </button>
  );

  return (
    <ModalWithForm
      title="Log in"
      buttonText="Log in"
      isOpen={activeModal === "login"}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
      loginButton={addClothesButton}
    >
      <label htmlFor="email" className="modal__label">
        Email {""}
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="Password" className="modal__label">
        Password {""}
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          onChange={handleImageChange}
          value={image}
        />
      </label>

        
      
    </ModalWithForm>
  );
}
