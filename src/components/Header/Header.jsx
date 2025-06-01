import "./Header.css";
import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.svg";
import avatar from "../../assets/avatar.png";
import ToggleSwitch from "../ToggleSwitch/ToggleSwitch";
function Header({
  handleAddClick,
  weatherData,
  handleLoginClick,
  handleSignUpClick,
  isLoggedIn,
}) {
  const currentDate = new Date().toLocaleString("default", {
    month: "long",
    day: "numeric",
  });

  const currentUser = useContext(CurrentUserContext);

  const renderAvatar = () => {
    if (currentUser?.avatar) {
      return (
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="header__avatar"
        />
      );
    }

    const firstInitial = currentUser?.name?.[0]?.toUpperCase() || "?";
    return (
      <div className="header__avatar header__avatar--placeholder">
        {firstInitial}
      </div>
    );
  };

  return (
    <header className="header">
      <Link to="/">
        <img className="header__logo" src={logo} alt="Logo" />
      </Link>

      <p className="header__date-location">
        {currentDate}, {weatherData.city}
      </p>
      <ToggleSwitch />

      {isLoggedIn ? (
        <>
          <button
            onClick={handleAddClick}
            type="button"
            className="header__add-clothes-btn"
          >
            + Add clothes
          </button>

          <Link to="/profile" className="header__link">
            <div className="header__user-container">
              <p className="header__username">{currentUser?.name}</p>
              {renderAvatar()}
            </div>
          </Link>
        </>
      ) : (
        <>
          <button
            onClick={handleSignUpClick}
            type="button"
            className="header__signup-btn"
          >
            Sign Up
          </button>

          <button
            onClick={handleLoginClick}
            type="button"
            className="header__login-btn"
          >
            Log in
          </button>
        </>
      )}
    </header>
  );
}

export default Header;
