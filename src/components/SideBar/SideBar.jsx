import avatar from "../../assets/avatar.png";
import "./SideBar.css";

function Sidebar({ handleEditClick, handleLogout }) {
  return (
    <div className="sidebar">
      <div className="sidebar__profile-info">
        <img src={avatar} alt="Default Avatar" className="sidebar__avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>

      <button
        type="button"
        className="sidebar__profile-btn"
        onClick={handleEditClick}
      >
        Change Profile Data
      </button>

      <button
        type="button"
        className="sidebar__logout-btn"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
}

export default Sidebar;
