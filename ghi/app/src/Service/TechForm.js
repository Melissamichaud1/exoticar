import React from "react";

class TechForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      employee_number: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  async handleSubmit(event) {
    event.preventDefault();
    const data = { ...this.state };

    const techUrl = "http://localhost:8080/api/technicians/";
    const fetchConfig = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(techUrl, fetchConfig);
    if (response.ok) {
      await response.json();
      this.setState({
        name: "",
        employee_number: "",
      });
    } else {
      console.error("Error in creating a technician, try again.");
    }
  }

  handleChange(event) {
    const value = event.target.value;
    const key = event.target.name;
    const changeDict = {};
    changeDict[key] = value;
    this.setState(changeDict);
  }

  render() {
    return (
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create Technician</h1>
            <form onSubmit={this.handleSubmit} id="create-tech-form">
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  value={this.state.name}
                  placeholder="Name"
                  required
                  type="text"
                  name="name"
                  id="name"
                  className="form-control"
                />
                <label htmlFor="name">Name</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={this.handleChange}
                  value={this.state.employee_number}
                  placeholder="Employee Number"
                  required
                  type="text"
                  name="employee_number"
                  id="employee_number"
                  className="form-control"
                />
                <label htmlFor="employee_number">Employee Number</label>
              </div>
              <button className="btn btn-primary">Create</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default TechForm;
