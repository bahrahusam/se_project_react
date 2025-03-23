import avatar from "../../assets/avatar.png";

function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <img src={avatar} alt="Default Avatar" className="sidebar__avatar" />
        <p className="sidebar__username">User Name</p>
      </div>
    </>
  );
}

export default Sidebar;
