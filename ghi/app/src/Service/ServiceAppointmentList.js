import React from "react";
import { NavLink } from "react-router-dom";

class ServiceAppointmentList extends React.Component {
  state = {
    services: [],
    autos: [],
    service: "",
    error: "",
  };

  async componentDidMount() {
    await this.getServices();
    await this.getAutomobiles();
  }

  async getServices() {
    const url = "http://localhost:8080/api/service/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const services = data.services;
      this.setState({ services: services });
    } else {
      this.setState({
        error: "Error in fetching list of services, try again.",
      });
    }
  }

  async getAutomobiles() {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      const autos = data.autos;
      this.setState({ autos: autos });
    } else {
      this.setState({
        error: "Error in fetching list of automobiles, try again.",
      });
    }
  }

  async cancelService(event) {
    const cancelUrl = `http://localhost:8080/api/service/${event}/`;
    await fetch(cancelUrl, { method: "DELETE" });
    this.getServices();
  }

  async finishService(event) {
    const finishUrl = `http://localhost:8080/api/service/${event}/`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify({ finished: true }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(finishUrl, fetchConfig);
    this.getServices();
  }

  VIP = (serviceVIN) => {
    let vipStatus = this.state.autos.find(
      (autoVIN) => autoVIN.vin === serviceVIN
    );
    if (vipStatus) {
      return (
        <td>
          <img
            src="https://w7.pngwing.com/pngs/22/247/png-transparent-computer-icons-computer-servers-vip-miscellaneous-text-rectangle.png"
            width="70"
            height="50"
          />
        </td>
      );
    } else {
      return (
        <td>
          <img
            src="https://cdn.pixabay.com/photo/2014/09/26/10/45/delete-462216_1280.png"
            width="70"
            height="50"
          />
        </td>
      );
    }
  };

  render() {
    return (
      <div className="container">
        <div className="col-md-12 text-center">
          <h2 className="display-5 fw-bold">Service Appointments</h2>
        </div>
        <div className="col-md-12 text-center">
          <button type="button" className="btn btn-success">
            <NavLink
              style={{ color: "white" }}
              className="nav-link"
              aria-current="page"
              to="/service/new"
            >
              Create an Appointment
            </NavLink>
          </button>{" "}
          &nbsp;&nbsp;&nbsp;
          <button type="button" className="btn btn-success">
            <NavLink
              style={{ color: "white" }}
              className="nav-link"
              aria-current="page"
              to="/service/history"
            >
              Service History
            </NavLink>
          </button>{" "}
          &nbsp;&nbsp;&nbsp;
          <button type="button" className="btn btn-success">
            <NavLink
              style={{ color: "white" }}
              className="nav-link"
              aria-current="page"
              to="/technicians/new"
            >
              Create a Technician
            </NavLink>
          </button>{" "}
          &nbsp;&nbsp;&nbsp;
        </div>
        &nbsp;&nbsp;&nbsp;
        <div className="col-md-12 text-center">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Customer is a VIP</th>
                <th>Customer is not a VIP</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>
                  <img
                    src="https://w7.pngwing.com/pngs/22/247/png-transparent-computer-icons-computer-servers-vip-miscellaneous-text-rectangle.png"
                    width="100"
                    height="80"
                  />
                </th>
                <th>
                  <img
                    src="https://cdn.pixabay.com/photo/2014/09/26/10/45/delete-462216_1280.png"
                    width="100"
                    height="80"
                  />
                </th>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="col-md-12 text-center">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>VIP</th>
                <th>VIN</th>
                <th>Owner</th>
                <th>Date of Appt</th>
                <th>Time of Appt</th>
                <th>Technician</th>
                <th>Reason</th>
                <th>Cancel Appt</th>
                <th>Completed Appt</th>
              </tr>
            </thead>
            <tbody>
              {this.state.services
                .filter((service) => service.finished == false)
                .map((service) => (
                  <tr key={service.id}>
                    {this.VIP(service.vin)}
                    <td>{service.vin}</td>
                    <td>{service.vehicle_owner}</td>
                    <td>{service.date}</td>
                    <td>{service.time}</td>
                    <td>{service.technician.name}</td>
                    <td>{service.reason}</td>
                    <td>
                      <button
                        onClick={() => this.cancelService(service.id)}
                        className="btn btn-danger"
                      >
                        Cancel
                      </button>
                    </td>
                    <td>
                      <button
                        onClick={() => this.finishService(service.id)}
                        className="btn btn-success"
                      >
                        Finished
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

export default ServiceAppointmentList;
