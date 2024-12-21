import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { checkAuthentication } from "./Auth"; // Adjust the import path as necessary

const Nav = ({ isAuthenticated, name, onLogout }) => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;

  const handleLogout = () => {
    axios
      .get("http://localhost:5000/logout")
      .then((res) => {
        if (res.data.message === "Logged out") {
          navigate("/");
          onLogout(navigate);
        } else {
          alert("Error logging out");
        }
      })
      .catch((err) => {
        console.error(err);
        alert("Error logging out");
      });
  };

  const handleSignUp = () => {
    navigate("/sign-up");
  };

  const handleLogIn = () => {
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-title">
        <h2 onClick={handleLogIn} style={{ cursor: "pointer" }}>
          Student School Lunch
        </h2>
      </div>
      <div className="navbar-links">
        <div>
          {isAuthenticated ? (
            <div>
              <h3>Welcome, {name}</h3>
              <button
                onClick={handleLogout}
                className="nav-btn"
                style={{ cursor: "pointer" }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div>
              <button
                onClick={handleSignUp}
                className="nav-btn"
                style={{ cursor: "pointer" }}
              >
                Sign Up
              </button>
              <button
                onClick={handleLogIn}
                className="nav-btn"
                style={{ cursor: "pointer" }}
              >
                Login
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Nav;
