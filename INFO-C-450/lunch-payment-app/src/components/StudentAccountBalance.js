import React, { Component } from "react";

class StudentAccountBalance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studentName: "John Doe", // This can be dynamically set based on props
      studentID: "SD-0001", // This can be dynamically set based on props
      balance: 100, // This can be dynamically set based on props
      transactions: [], // Replace with actual transaction data
    };
  }

  handleAddMoney = () => {
    // Implement Add Money logic here
  };

  handleSchedulePayment = () => {
    // Implement Schedule Payment logic here
  };

  handleReturnToHomePage = () => {
    // Redirect to Home Page
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="student-account-balance">
        <h2>Student Account Balance</h2>
        <div>
          <p>
            <strong>Student Name:</strong> {this.state.studentName}
          </p>
          <p>
            <strong>Student ID:</strong> {this.state.studentID}
          </p>
          <p>
            <strong>Balance:</strong> ${this.state.balance}
          </p>
          <button onClick={this.handleAddMoney}>Add Money</button>
          <button onClick={this.handleSchedulePayment}>Schedule Payment</button>
          <button onClick={this.handleReturnToHomePage}>
            Return To Home Page
          </button>
        </div>

        <h3>Transaction History:</h3>
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Amount</th>
            </tr>
          </thead>
          <tbody>
            {this.state.transactions.length > 0 ? (
              this.state.transactions.map((transaction, index) => (
                <tr key={index}>
                  <td>{transaction.date}</td>
                  <td>{transaction.name}</td>
                  <td>{transaction.amount}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3">No transaction history available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  }
}

export default StudentAccountBalance;
