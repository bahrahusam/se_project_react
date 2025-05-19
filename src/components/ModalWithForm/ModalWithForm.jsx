import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  handleCloseClick,
  onSubmit,
  loginButton,
}) {
  return (
    <div className={`modal ${isOpen ? "modal__opened" : ""}`}>
      <div className="modal__content">
        <h2 className="modal__title">{title}</h2>
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close"
        ></button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}

          <div className="modal__buttons">
          <button type="submit" className="modal__submit">
            {buttonText}
          </button>
          {loginButton && <div className="modal__login-button">{loginButton}</div>}
          </div>
          
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
