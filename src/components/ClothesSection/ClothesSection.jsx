import ItemCard from "../ItemCard/ItemCard";
import { defaultClothingItems } from "../../utils/constants";
import "./ClothesSection.css";

function ClothesSection({ onCardClick }) {
  return (
    <>
      <div className="clothes-section">
        <div className="clothes-section__toolbar">
          <p className="clothes-section__title" >Your items</p>
          <button className="clothes-section__add-button" >+ Add New</button>
        </div>
        <ul className="clothes-section__list">
          {defaultClothingItems.map((item) => {
            return (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default ClothesSection;
