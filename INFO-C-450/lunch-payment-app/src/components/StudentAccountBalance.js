import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const StudentAccountBalance = () => {
  const { studentId } = useParams(); // Extract studentId from route parameters
  const navigate = useNavigate();
  const [studentBalance, setStudentBal] = useState([]);
  const [transactionBal, setTransactionBal] = useState([]);

  useEffect(() => {
    // Fetch students and transactions data from API here
    const fetchStudentsAndTransactions = async () => {
      // studentId = props.match.params.studentId;
      try {
        console.log("HomeParentId ", studentId);
        const studentsResponse = await axios.get(
          "http://localhost:5000/getStudentBalance?student_id=" + studentId
        );
        const transactionsResponse = await axios.get(
          "http://localhost:5000/getStudentTransaction?student_id=" + studentId
        );
        console.log("Students ", studentsResponse.data);
        if (studentsResponse.data.error) {
          throw new Error(studentsResponse.data.error);
        } else {
          setStudentBal(studentsResponse.data[0]);
        }
        if (transactionsResponse.data.error) {
          throw new Error(transactionsResponse.data.error);
        } else {
          setTransactionBal(transactionsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchStudentsAndTransactions();
  }, [studentId]);

  const handleAddMoney = () => {
    // Implement Add Money logic here
    navigate("/add-money");
  };

  const handleSchedulePayment = () => {
    // Implement Schedule Payment logic here
    navigate("/schedule-payment");
  };

  const handleReturnToHomePage = () => {
    // Redirect to Home Page
    navigate("/home");
  };

  return (
    <div className="student-account-balance">
      <h2>Student Account Balance</h2>
      <div>
        <p>
          <strong>Student Name:</strong> {studentBalance.name}
        </p>
        <p>
          <strong>Student ID:</strong> {studentBalance.student_id}
        </p>
        <p>
          <strong>Balance:</strong> ${studentBalance.balance}
        </p>
        <button onClick={handleAddMoney}>Add Money</button>
        <button onClick={handleSchedulePayment}>Schedule Payment</button>
        <button onClick={handleReturnToHomePage}>Return To Home Page</button>
      </div>

      <section className="transaction-history">
        <h2>Transaction History</h2>
        {transactionBal.length > 0 ? (
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
              {transactionBal.map((transaction) => (
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

export default StudentAccountBalance;
