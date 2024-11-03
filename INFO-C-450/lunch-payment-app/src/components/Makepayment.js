import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Makepayment.css";
import { useNavigate } from "react-router-dom";

const Makepayment = ({ parent_id }) => {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState("");
  const [paymentAmount, setPaymentAmount] = useState("");
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

  const handlePaymentSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/makePayment", {
        studentId: selectedStudent,
        amount: paymentAmount,
      });
      if (response.data.status === "success") {
        alert("Payment successful");
        setPaymentAmount("");
        setSelectedStudent("");
      } else {
        alert("Payment failed");
      }
    } catch (error) {
      console.error("Error making payment:", error);
      alert("Payment failed");
    }
  };
  const handleBackClick = () => {
    navigate("/home");
  };

  return (
    <div className="make-payment">
      <h2>Make Payment</h2>
      <form onSubmit={handlePaymentSubmit}>
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
          <input
            type="number"
            value={paymentAmount}
            onChange={(e) => setPaymentAmount(e.target.value)}
            required
          />
        </div>
        <div className="button-group">
          <button type="button" onClick={handleBackClick}>
            Back
          </button>
          <button type="submit">Submit Payment</button>
        </div>
      </form>
    </div>
  );
};

export default Makepayment;
