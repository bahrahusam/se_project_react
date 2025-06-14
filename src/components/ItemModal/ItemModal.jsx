import "./ItemModal.css";

import { useContext } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext";

function ItemModal({ activeModal, card, handleCloseClick, handleDeleteItem }) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser?._id;

  return (
    <div
      className={`modal ${activeModal === "preview" ? "modal__opened" : ""}`}
    >
      <div className="modal__content modal__content_type_image">
        <button
          onClick={handleCloseClick}
          type="button"
          className="modal__close image__modal__close"
        ></button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />

        <div className="modal__container">
          <div className="modal__footer">
            <h2 className="modal__caption">{card.name}</h2>

            {isOwn && (
              <button
                type="button"
                className="modal__delete-button"
                onClick={() => handleDeleteItem(card)}
              >
                Delete item
              </button>
            )}
          </div>

          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
