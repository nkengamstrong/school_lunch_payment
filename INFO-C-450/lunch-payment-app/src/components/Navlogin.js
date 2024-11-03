import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Nav = () => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    axios.get("http://localhost:5000/logout").then((res) => {
      if (res.data.message === "Logged out") {
        navigate("/");
      } else {
        alert("Error logging out");
      }
    });
  };
  return (
    <nav className="navbar">
      <div className="navbar-title">
        <h2>Student School Lunch</h2>
      </div>
      <div className="navbar-links">
        <div>
          <button onClick={handleLogOut} className="create-account-btn">
            Logout
          </button>
        </div>
        {/* <a href="/admin-login" className="nav-link">Log In</a> */}
      </div>
    </nav>
  );
};
export default Nav;
