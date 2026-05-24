import { Link } from "react-router-dom";
import "./Navbar.css";


function Navbar() {
 const user = JSON.parse(localStorage.getItem("user"));
const ADMIN_EMAIL = "kumarimansi712@gmail.com";

{user?.email === ADMIN_EMAIL && (
  <Link to="/admin">Admin</Link>
)}
const handleLogout = () => {
  localStorage.removeItem("user");
  window.location.href = "/";
};
  return (
    <nav className="navbar">
      <div className="navbar-logo">
 <h2 className="navbar-logo">Scholarship Portal</h2>
      </div>
     

<div className="nav-links">
  <Link to="/">Home</Link>

  {!user && (
    <>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </>
  )}

  {user && (
    <>
      <Link to="/home">Dashboard</Link>
    </>
  )}

  <Link to="/admin">Admin</Link>

  {user && (
    <button className="logout-btn" onClick={handleLogout}>
      Logout
    </button>
  )}
</div>
    </nav>
  );
}

export default Navbar;