import React from "react";

class ServiceAppointmentForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            vin: "",
            vehicle_owner: "",
            starts: "",
            technician: "",
            reason: "",
            technicians: [],
            error: "",
            submitted: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount() {
      const technicianUrl = "http://localhost:8080/api/technicians/";

      const response = await fetch(technicianUrl);

      if (response.ok) {
          const data = await response.json();
          this.setState({ technicians: data.technicians });
      } else {
        this.setState({error: "Error in fetching technicians, try again."})
      }
  }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.technicians;
        delete data.error;
        delete data.submitted;

        const servicesUrl = "http://localhost:8080/api/service/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };

        const response = await fetch(servicesUrl, fetchConfig);
        if (response.ok) {
            await response.json();

            const cleared = {
                vin: "",
                vehicle_owner: "",
                starts: "",
                technician: "",
                reason: "",
            };
            this.setState(cleared);
            this.setState({ submitted: true })
        } else {
          this.setState({error: "Error in submitting the form, try again."})
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
        let submittedClass = "alert alert-success d-none mb-0";

        if (this.state.submitted === true) {
            submittedClass = "alert alert-success mb-0";
        }
        let dropdownClasses = "form-select d-none";
        if (this.state.technicians.length > 0 ) {
            dropdownClasses = "form-select";
        }
    return (
        <div className="container">
          <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a Service Appointment</h1>
                <form onSubmit={this.handleSubmit} id="create-service-form">
                  <div className="form-floating mb-3">
                    <input
                      onChange={this.handleChange}
                      value={this.state.vin}
                      placeholder="vin"
                      required type="text"
                      name="vin"
                      id="vin"
                      className="form-control"
                    />
                    <label htmlFor="vin">VIN</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      onChange={this.handleChange}
                      value={this.state.vehicle_owner}
                      placeholder="Vehicle Owner"
                      required type="text"
                      name="vehicle_owner"
                      id="vehicle_owner"
                      className="form-control"
                    />
                    <label htmlFor="vehicle_owner">Vehicle Owner</label>
                  </div>
                  <div className="form-floating mb-3">
                    <input
                      onChange={this.handleChange}
                      value={this.state.starts}
                      placeholder="Date and Time"
                      required type="datetime-local"
                      name="starts"
                      id="starts"
                      className="form-control"
                    />
                    <label htmlFor="starts">Date and Time</label>
                  </div>
                  <div className="mb-3">
                    <select
                      onChange={this.handleChange}
                      name="technician"
                      id="technician"
                      className={dropdownClasses} required>
                      <option value="">Choose a technician..</option>
                      {this.state.technicians.map((technician) => {
                        return (
                          <option
                            key={technician.employee_number}
                            value={technician.employee_number}
                          >
                            {technician.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form=floating mb-3">
                    <input onChange={this.handleChange}
                        value={this.state.reason}
                        placeholder="Please explain your issue briefly"
                        required type="text"
                        name="reason"
                        id="reason"
                        className="form-control"/>
                    <label htmlFor="reason"></label>
                  </div>
                  <div>
                  <div className="container">
                  <div className="col-md-12 text-center">
                  <button className="btn btn-primary">Create Appointment</button>
                  </div>
                  </div>
                  </div>
                </form>
                <div className={submittedClass} id="success-message">Your appointment is confirmed!
                  </div>
              </div>
            </div>
          </div>
        </div>
      );
    }
}







export default ServiceAppointmentForm;
