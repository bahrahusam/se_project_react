// import avatar from "../../assets/avatar.png";
// import "./SideBar.css";

// function Sidebar({ handleEditClick, handleLogout }) {
//   return (
//     <div className="sidebar">
//       <div className="sidebar__profile-info">
//         <img src={avatar} alt="Default Avatar" className="sidebar__avatar" />
//         <p className="sidebar__username">Terrence Tegegne</p>
//       </div>

//       <button
//         type="button"
//         className="sidebar__profile-btn"
//         onClick={handleEditClick}
//       >
//         Change Profile Data
//       </button>

//       <button
//         type="button"
//         className="sidebar__logout-btn"
//         onClick={handleLogout}
//       >
//         Logout
//       </button>
//     </div>
//   );
// }

// export default Sidebar;

import { useContext } from "react";
import CurrentUserContext from "../../contexts/CurrentUserContext"; // ✅ Import context
import "./SideBar.css";

function Sidebar({ handleEditClick, handleLogout }) {
  const currentUser = useContext(CurrentUserContext); // ✅ Use context

  return (
    <div className="sidebar">
      <div className="sidebar__profile-info">
        <img
          src={currentUser?.avatar || "../../assets/avatar.png"} // ✅ Use dynamic avatar
          alt="User Avatar"
          className="sidebar__avatar"
        />
        <p className="sidebar__username">
          {currentUser?.name || "Username"} {/* ✅ Dynamic username */}
        </p>
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
