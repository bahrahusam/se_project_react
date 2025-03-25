import avatar from "../../assets/avatar.png";
import "./SideBar.css"

function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <img src={avatar} alt="Default Avatar" className="sidebar__avatar" />
        <p className="sidebar__username">Terrence Tegegne</p>
      </div>
    </>
  );
}

export default Sidebar;
