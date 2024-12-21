import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
//import "./login.css";

const Login = ({ onLogin }) => {
  const [values, setValues] = useState({
    studentId: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleCheckBalance = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:5000/student", { studentId: values.studentId })
      .then((res) => {
        if (res.data.message === "Student Identify") {
          navigate("/balance", { state: { studentId: values.studentId } });
        } else {
          alert(res.data.error);
        }
      })
      .catch((err) => console.log(err));
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
      .catch((err) => console.log(err));
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="login-page">
      <div className="side-by-side">
        <form className="login-section" onSubmit={handleLogin}>
          <h2>Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={values.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={values.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Login</button>
        </form>
        <form className="balance-section" onSubmit={handleCheckBalance}>
          <h2>Check Balance</h2>
          <input
            type="text"
            name="studentId"
            placeholder="Student ID"
            value={values.studentId}
            onChange={handleChange}
            required
          />
          <button type="submit">Check Balance</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
