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
        };
        this.handleVinChange = this.handleVinChange.bind(this);
        this.handleVehicleOwnerChange = this.handleVehicleOwnerChange.bind(this);
        this.handleStartsChange = this.handleStartsChange.bind(this);
        this.handleTechnicianChange = this.handleTechnicianChange.bind(this);
        this.handleReasonChange = this.handleReasonChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = { ...this.state };
        delete data.technicians;
        console.log(data);

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
            const newService = await response.json();
            console.log(newService);

            const cleared = {
                vin: "",
                vehicle_owner: "",
                starts: "",
                technician: "",
                reason: "",
            };
            this.setState(cleared);
            }
        }


    async componentDidMount() {
        const technicianUrl = "http://localhost:8080/api/technicians/";

        const response = await fetch(technicianUrl);

        if (response.ok) {
            const data = await response.json();
            this.setState({ technicians: data.technicians });
        }
    }


    handleVinChange(event) {
        const value = event.target.value;
        this.setState({ vin: value });
    }

    handleVehicleOwnerChange(event) {
        const value = event.target.value;
        this.setState({ vehicle_owner: value });
    }

    handleStartsChange(event) {
        const value = event.target.value;
        this.setState({ starts: value });
    }

    handleTechnicianChange(event) {
        const value = event.target.value;
        this.setState({ technician: value });
    }

    handleReasonChange(event) {
        const value = event.target.value;
        this.setState({ reason: value });
    }


    render() {
        let notSubmittedClass = "not-submitted";
        let submittedClass = "alert alert-success d-none mb-0";

        if (this.state.success === true) {
            notSubmittedClass = "not-submitted d-none";
            submittedClass = "alert alert-success mb-0";
        }
        let spinnerClasses = "d-flex justify-content-center mb-3";
        let dropdownClasses = "form-select d-none";
        if (this.state.technicians.length > 0 ) {
            spinnerClasses = "d-flex justify-content-center mb-3";
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
                      onChange={this.handleVinChange}
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
                      onChange={this.handleVehicleOwnerChange}
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
                      onChange={this.handleStartsChange}
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
                      onChange={this.handleTechnicianChange}
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
                    <input onChange={this.handleReasonChange}
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
                  <div className={submittedClass} id="success-message">Your appointment is confirmed!
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }
}







export default ServiceAppointmentForm;
