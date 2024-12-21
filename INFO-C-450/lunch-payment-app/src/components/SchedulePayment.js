import React, { useState, useEffect } from "react";
import axios from "axios";
import "./SchedulePayment.css";
import { useNavigate } from "react-router-dom";

const SchedulePayment = ({ parent_id }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [description, setDescription] = useState("");
  const [scheduleDate, setScheduleDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/getStudents?parentId=` + parent_id
        );
        if (response.data.error) {
          throw new Error(response.data.error);
        } else {
          setStudents(response.data);
        }
      } catch (error) {
        console.error("Error fetching students:", error);
      }
    };

    fetchStudents();
  }, [parent_id]);

  const handleScheduleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/schedulePayment",
        {
          studentId: selectedStudent,
          amount: paymentAmount,
          paymentType: paymentType,
          description: description,
          scheduleDate: scheduleDate,
          parentId: parent_id,
        }
      );
      if (response.data.status === "success") {
        alert("Payment scheduled successfully");
        setPaymentAmount("");
        setSelectedStudent("");
        setPaymentType("");
        setDescription("");
        setScheduleDate("");
      } else {
        alert("Failed to schedule payment");
      }
    } catch (error) {
      console.error("Error scheduling payment:", error);
      alert("Failed to schedule payment");
    }
  };

  const handleBackClick = () => {
    navigate("/home");
  };

  return (
    <div className="schedule-payment">
      <h2>Schedule Payment</h2>
      <div className="form-container">
        <form onSubmit={handleScheduleSubmit}>
          <div>
            <label>Student:</label>
            <select
              value={selectedStudent}
              onChange={(e) => setSelectedStudent(e.target.value)}
              required
            >
              <option value="">Select a student</option>
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Amount:</label>
            <select
              value={paymentAmount}
              onChange={(e) => setPaymentAmount(e.target.value)}
              required
            >
              <option value="">Select an amount</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
              <option value="200">200</option>
            </select>
          </div>
          <div>
            <label>Payment Type:</label>
            <select
              value={paymentType}
              onChange={(e) => setPaymentType(e.target.value)}
              required
            >
              <option value="">Select a payment type</option>
              <option value="credit_card">Credit Card</option>
              <option value="bank_transfer">Bank Transfer</option>
              <option value="paypal">PayPal</option>
            </select>
          </div>
          <div>
            <label>Description:</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </div>
          <div>
            <label>Schedule Date:</label>
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              required
            />
          </div>
          <div className="button-group">
            <button type="submit">Schedule Payment</button>
            <button type="button" onClick={handleBackClick}>
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SchedulePayment;
