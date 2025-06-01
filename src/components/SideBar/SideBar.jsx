import avatar from "../../assets/avatar.png";
import "./SideBar.css";

function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar__profile-info">
        <img src={avatar} alt="Default Avatar" className="sidebar__avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>

          <button
            // onClick={handleSignUpClick}
            type="button"
            className="sidebar__profile-btn"
          >
            Change Profile Data
          </button>

          <button
            // onClick={handleSignUpClick}
            type="button"
            className="sidebar__logout-btn"
          >
            Logout
          </button>
      
    </div>
  );
}

export default Sidebar;
