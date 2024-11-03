import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import './SignUp.css'; // Include your CSS styles here

function Signup() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    password: "",
  });

  const handleSignup = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/parents", values)
      .then((res) => {
        if (res.data.message === "Parent created") {
          navigate("/");
        } else {
          alert("Error creating account");
        }
      })
      .then((err) => console.log(err));
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSignup} className="signup-form">
        <h3>Create Account</h3>
        <label>First Name:</label>
        <input
          type="text"
          name="firstName"
          onChange={(e) => setValues({ ...values, firstName: e.target.value })}
          placeholder="FName"
          required
        />
        <label>Last Name:</label>
        <input
          type="text"
          name="lastName"
          onChange={(e) => setValues({ ...values, lastName: e.target.value })}
          placeholder="LName"
          required
        />
        <label>Email:</label>
        <input
          type="email"
          name="email"
          onChange={(e) => setValues({ ...values, email: e.target.value })}
          placeholder="Email"
          required
        />
        <label>Phone Number:</label>
        <input
          type="tel"
          name="phone"
          onChange={(e) => setValues({ ...values, phone: e.target.value })}
          placeholder="Phone"
          required
        />
        <label>Password:</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setValues({ ...values, password: e.target.value })}
          placeholder="Password"
          required
        />
        <div className="form-buttons">
          <button type="button" className="cancel-btn">
            Login
          </button>
          <button type="submit" className="submit-btn">
            SignUp
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
