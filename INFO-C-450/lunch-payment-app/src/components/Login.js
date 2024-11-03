import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  axios.defaults.withCredentials = true;

  const [value, setId] = useState({
    studentId: "",
  });

  const handleCheckBalance = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/student", value)
      .then((res) => {
        if (res.data.message === "Student Identify") {
          navigate("/balance");
        } else {
          alert(res.data.error);
        }
      })
      .then((err) => console.log(err));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/login", values)
      .then((res) => {
        if (res.data.message === "Parent logged in") {
          navigate("/");
          onLogin(navigate);
        } else {
          alert(res.data.error);
        }
      })
      .then((err) => console.log(err));
  };
  return (
    <div className="login-page">
      <div className="side-by-side">
        <form className="login-section" onSubmit={handleLogin}>
          <h3>Parent Login</h3>
          <label>UserName:</label>
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setValues({ ...values, email: e.target.value })}
            required
          />
          <label>Password:</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setValues({ ...values, password: e.target.value })}
            required
          />
          <button type="submit">Submit</button>
        </form>

        <form className="balance-section" onSubmit={handleCheckBalance}>
          <h3>Check Student Balance</h3>
          <label>Student ID:</label>
          <input
            type="text"
            placeholder="StudentId"
            onChange={(e) => setId({ ...value, studentId: e.target.value })}
            required
          />
          <button type="submit">Check Balance</button>
        </form>
      </div>
    </div>
  );
}

export default Login;
