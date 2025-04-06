import ItemCard from "../ItemCard/ItemCard";

import "./ClothesSection.css";

function ClothesSection({ handleAddClick, clothingItems, onCardClick }) {
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
        {clothingItems.map((item) => {
          return (
            <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
          );
        })}
      </ul>
    </div>
  );
}

export default ClothesSection;
