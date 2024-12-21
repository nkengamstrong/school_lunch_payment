import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import "./StudentBalance.css";

const StudentBalance = () => {
  const location = useLocation();
  const { studentId } = location.state;
  const [balance, setBalance] = useState(null);
  const [name, setName] = useState("");
  const [student_Id, setStudentId] = useState("");
  const [error, setError] = useState("");
  const [parentName, setParentName] = useState("");
  const navigate = useNavigate();

  const handleReturnToHomePage = () => {
    navigate("/");
  };

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/studentBalance?student_id=${studentId}`
        );
        if (response.data.error) {
          throw new Error(response.data.error);
        } else {
          console.log("Student Balance ", response.data.balance);
          setBalance(response.data.balance.balance);
          setName(response.data.balance.name);
          setStudentId(response.data.balance.student_id);
          setParentName(
            response.data.balance.first_name +
              " " +
              response.data.balance.last_name
          );
          setError("");
        }
      } catch (error) {
        console.error("Error fetching student balance:", error);
        setError(
          "Failed to fetch student balance. Please check the student ID and try again."
        );
        setBalance(null);
      }
    };

    fetchBalance();
  }, [studentId]);

  return (
    <div className="student-balance">
      <h2>Welcome! {name}</h2>
      {balance !== null && (
        <div className="balance-info">
          <h3>Account Balance</h3>
          <p>
            Name: <strong>{name}</strong>
          </p>
          <p>
            Student ID: <strong>{student_Id}</strong>
          </p>
          <p>
            Balance:{" "}
            <strong>${balance !== null ? balance.toFixed(2) : "0.00"}</strong>
          </p>
          <p>
            Managed By: <strong>{parentName}</strong>
          </p>
        </div>
      )}
      {error && <p className="error">{error}</p>}
      <button onClick={handleReturnToHomePage}>Return to Home Page</button>
    </div>
  );
};

export default StudentBalance;
