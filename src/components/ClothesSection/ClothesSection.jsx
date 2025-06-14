import { useContext } from "react";

import CurrentUserContext from "../../contexts/CurrentUserContext";

import ItemCard from "../ItemCard/ItemCard";

import "./ClothesSection.css";

function ClothesSection({
  handleAddClick,
  clothingItems,
  onCardClick,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  const userItems = clothingItems.filter(
    (item) => item.owner === currentUser?._id
  );

  return (
    <div className="clothes-section">
      <div className="clothes-section__toolbar">
        <p className="clothes-section__title">Your items</p>

        <button
          type="button"
          onClick={handleAddClick}
          className="clothes-section__add-button"
        >
          + Add New
        </button>
      </div>

      <ul className="clothes-section__list">
        {userItems.map((item) => (
          <ItemCard
            key={item._id}
            item={item}
            onCardClick={onCardClick}
            onCardLike={onCardLike}
          />
        ))}
      </ul>
    </div>
  );
}

export default ClothesSection;
