import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./LoginModal.css";

export default function LoginModal({
  activeModal,
  handleCloseClick,
  onAddItemModalSubmit,
}) {
  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };


  // define `isOpen`
  const isOpen = activeModal === "login";

  useEffect(() => {
    setPassword("");
    setEmail("");
    
  }, [isOpen]); // watch isOpen

  // the submit handler doesn't clear the inputs or close the modal
  const handleSubmit = (e) => {
    e.preventDefault();
    onAddItemModalSubmit({ email, password });
  };

  

  const orSignUpButton = (
    <button type="button" className="orsignup__button">
      or Sign Up
    </button>
  );

  return (
    <ModalWithForm
      title="Log in"
      // buttonText="Log in"
      isOpen={activeModal === "login"}
      handleCloseClick={handleCloseClick}
      onSubmit={handleSubmit}
      orSignUpButton={orSignUpButton}
      loginButton={
        <button type="submit" className="modal__login-button">
          Log In
        </button>
      }
    >
      <label htmlFor="email" className="modal__label">
        Email {""}
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <label htmlFor="Password" className="modal__label">
        Password {""}
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
    </ModalWithForm>
  );
}
