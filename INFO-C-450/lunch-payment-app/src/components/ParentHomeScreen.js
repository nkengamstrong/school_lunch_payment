import React, { useState, useEffect } from "react";
import "./ParentHomeScreen.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ParentHomeScreen = ({ parent_id }) => {
  const [students, setStudents] = useState([]);
  const [transactions, setTransactions] = useState([]);

  const navigate = useNavigate();
  //const value = { parentId: parent_id };
  axios.defaults.withCredentials = true;

  useEffect(() => {
    // Fetch students and transactions data from API here
    const fetchStudentsAndTransactions = async () => {
      try {
        console.log("HomeParentId ", parent_id);
        const studentsResponse = await axios.get(
          "http://localhost:5000/getStudents?parentId=" + parent_id
        );
        const transactionsResponse = await axios.get(
          "http://localhost:5000/getTransactions?parentId=" + parent_id
        );
        console.log("Students ", studentsResponse.data);
        if (studentsResponse.data.error) {
          throw new Error(studentsResponse.data.error);
        } else {
          setStudents(studentsResponse.data);
        }
        if (transactionsResponse.data.error) {
          throw new Error(transactionsResponse.data.error);
        } else {
          setTransactions(transactionsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentsAndTransactions();
  }, [parent_id]);

  const handleAddStudent = () => {
    navigate("/add-student");
  };

  const handleMakePaymentClick = () => {
    navigate("/add-money");
  };

  const handleStudentClick = (studentId) => {
    navigate(`/student/${studentId}`);
  };

  const handleSchedulePayment = () => {
    navigate("/schedule-payment");
  };

  return (
    <div className="home-page">
      <section className="students-section">
        <h2>Students</h2>
        <div className="student-actions">
          <button onClick={handleAddStudent}>Add Child</button>
          <button onClick={handleMakePaymentClick}>Make Payment</button>
          <button onClick={handleSchedulePayment}>Schedule Payment</button>
        </div>
        {students.length > 0 ? (
          <table className="students-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Student ID</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  onClick={() => handleStudentClick(student.id)}
                >
                  <td>
                    <a href={`/student/${student.id}`}>{student.name}</a>
                  </td>
                  <td>{student.student_id}</td>
                  <td>${student.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No students found.</p>
        )}
      </section>

      <section className="transaction-history">
        <h2>Transaction History</h2>
        {transactions.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Transaction Date</th>
                <th>Student Name</th>
                <th>Payment Type</th>
                <th>Payment Amount</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.account_id}>
                  <td>{transaction.transaction_date}</td>
                  <td>
                    {transaction.student_first_name}{" "}
                    {transaction.student_last_name}
                  </td>
                  <td>{transaction.transaction_type}</td>
                  <td>${transaction.amount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No transactions found.</p>
        )}
      </section>
    </div>
  );
};

export default ParentHomeScreen;
