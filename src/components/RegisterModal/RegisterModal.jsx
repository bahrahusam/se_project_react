import { useState, useEffect } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import "./RegisterModal.css";

export default function RegisterModal({
  activeModal,
  handleCloseClick,
  onRegister,
  handleLoginClick,
}) {
  const [name, setName] = useState("");
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const [email, setEmail] = useState("");
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const [avatarUrl, setAvatarUrl] = useState("");
  const handleAvatarUrlChange = (e) => {
    setAvatarUrl(e.target.value);
  };

  // define `isOpen`
  const isOpen = activeModal === "signUp";

  useEffect(() => {
    setName("");
    setPassword("");
    setEmail("");
    setAvatarUrl("");
  }, [isOpen]); // watch isOpen

  // the submit handler doesn't clear the inputs or close the modal
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister({ name, avatarUrl, email, password });
  };

  const orLoginButton = (
    <button
      type="button"
      className="orlogin__button"
      onClick={handleLoginClick}
    >
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
      customSubmitButton={
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
          onChange={handleEmailChange}
          value={email}
        />
      </label>
      <label htmlFor="Password" className="modal__label">
        Password {""}
        <input
          type="password"
          className="modal__input"
          id="signuppassword"
          placeholder="Password"
          onChange={handlePasswordChange}
          value={password}
        />
      </label>
      <label htmlFor="Name" className="modal__label">
        Name {""}
        <input
          type="text"
          className="modal__input"
          id="signupname"
          placeholder="Name"
          onChange={handleNameChange}
          value={name}
        />
      </label>
      <label htmlFor="Avatar URL" className="modal__label">
        Avatar URL {""}
        <input
          type="url"
          className="modal__input"
          id="url"
          placeholder="Avatar URL"
          onChange={handleAvatarUrlChange}
          value={avatarUrl}
        />
      </label>
    </ModalWithForm>
  );
}
