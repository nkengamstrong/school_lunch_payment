import React, { Component } from "react";
import axios from "axios";
import "./AddStudent.css";
import { checkAuthentication } from "./Auth";
import withNavigation from "./withNavigation";

class AddStudent extends Component {
  constructor(props) {
    super(props);
    console.log("ParentId ", props.parent_id);
    this.state = {
      firstName: "",
      lastName: "",
      dob: "",
      grade: "",
      parentId: props.parent_id,
    };
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    axios
      .post("http://localhost:5000/addStudent", this.state)
      .then((res) => {
        if (res.data.status === "success") {
          this.props.navigate("/home");
        } else {
          alert("Error creating student");
        }
      })
      .catch((err) => console.log(err));
  };
  handleCancel = () => {
    this.props.navigate("/home");
  };

  render() {
    return (
      <div className="add-student">
        <h2>Add Student</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Date of Birth:</label>
            <input
              type="date"
              name="dob"
              value={this.state.dob}
              onChange={this.handleChange}
              required
            />
          </div>
          <div>
            <label>Grade:</label>
            <input
              type="text"
              name="grade"
              value={this.state.grade}
              onChange={this.handleChange}
              required
            />
          </div>
          <div className="button-group">
            <button type="button" onClick={this.handleCancel}>
              Back To Home
            </button>
            <button type="submit">Add Student</button>
          </div>
        </form>
      </div>
    );
  }
}

export default withNavigation(AddStudent);
