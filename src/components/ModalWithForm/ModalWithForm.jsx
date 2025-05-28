import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpen,
  handleCloseClick,
  onSubmit,
  orSignUpButton,
  customSubmitButton,
  orLoginButton,
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
            {customSubmitButton ? (
              customSubmitButton
            ) : (
              <button type="submit" className="modal__submit">
                {buttonText}
              </button>
            )}
            {orSignUpButton && (
              <div className="modal__orsignup-button">{orSignUpButton}</div>
            )}
            {orLoginButton && (
              <div className="modal__orlogin-button">{orLoginButton}</div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
