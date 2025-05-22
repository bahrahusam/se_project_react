import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

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
  const isOpen = activeModal === "signUp";

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

  const orLoginButton = (
    <button type="button" className="orlogin__button">
      or Log In
    </button>
  );

  return (
    <ModalWithForm
      title="Sign Up"
      // buttonText="Log in"
      isOpen={activeModal === "signUp"}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
      orLoginButton={orLoginButton}
      signUpButton={
        <button type="submit" className="modal__signup-button">
          Sign Up
        </button>
      }
    >
      <label htmlFor="email" className="modal__label">
        Email {""}
        <input
          type="email"
          className="modal__input"
          id="signupemail"
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
          id="signuppassword"
          placeholder="Password"
          onChange={handleImageChange}
          value={image}
        />
      </label>
      <label htmlFor="Name" className="modal__label">
        Name {""}
        <input
          type="text"
          className="modal__input"
          id="signupname"
          placeholder="Name"
          onChange={handleImageChange}
          value={image}
        />
      </label>
      <label htmlFor="Avatar URL" className="modal__label">
        Avatar URL {""}
        <input
          type="url"
          className="modal__input"
          id="url"
          placeholder="Avatar URL"
          onChange={handleImageChange}
          value={image}
        />
      </label>
    </ModalWithForm>
  );
}
