import React, {useEffect, useState} from "react";
import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

function ServiceAppointmentForm() {
    const [service, setService] = useState ({
        vin: '',
        vehicle_owner: '',
        starts: '',
        reason: '',
        technician: [],
    });

    const [technician, setTechnician] = useState([]);
    const loadTechnician = async () => {
        const url = 'http://localhost:8080/api/technicians/';
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            setTechnician(data.technician);
        } else {
            console.error(response);
        }
    }

    useEffect(() => {
        loadTechnician();
    }, []);

    const handleChange = (event) => {
        setService({...service, [event.target.name]: event.target.value});
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...service};
        data['starts'] = data.date+"T"+data.time;
        delete data.time;
        delete data.date;
        delete data.technician;
        console.log(data);

        const serviceUrl = "http://localhost:8080/api/service/"
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          };
        const response = await fetch(serviceUrl, fetchConfig);
        if (response.ok) {
            const newService = await response.json();
            console.log(newService);

            setService({
                vin: '',
                vehicle_owner: '',
                starts: '',
                reason: '',
                technician: '',

            });
            setDate('')
        };
    };
    return (
        <div className="container">
          <div className="row">
            <div className="offset-3 col-6">
              <div className="shadow p-4 mt-4">
                <h1>Create a Service Appointment</h1>
                <form onSubmit={handleSubmit} id="create-service-form">
                  <div className="form-floating mb-3">
                    <input
                      onChange={handleChange}
                      value={service.vin}
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
                      onChange={handleChange}
                      value={service.vehicle_owner}
                      placeholder="vehicle_owner"
                      required type="text"
                      name="vehicle_owner"
                      id="vehicle_owner"
                      className="form-control"
                    />
                    <label htmlFor="vehicle_owner">Vehicle Owner</label>
                  </div>
                  <div className="mb-3">
                    <select
                      onChange={handleChange}
                      value={service.technician}
                      id="technician"
                      name="technician"
                      className="form-select"
                    >
                      <option value="">Choose A Technician..</option>
                      {technician.map(technician => {
                        return (
                          <option
                            key={technician.id}
                            value={technician.id}
                          >
                            {technician.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                  <div className="form=floating mb-3">
                    <textarea onChange={handleChange}
                        value={service.reason}
                        placeholder="reason"
                        required type="text"
                        name="reason"
                        id="reason"
                        className="form-control">
                    </textarea>
                    <label htmlFor="reason">Reason</label>
                  </div>
                  <div className="container">
                  <div className="col-md-12 text-center">
                  <button className="btn btn-primary">Create Appointment</button>
                  </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      );
    }






export default ServiceAppointmentForm;
