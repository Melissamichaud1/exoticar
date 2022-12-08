import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom"

function ServiceAppointmentList() {

    const [services, setServices] = useState(null);

    const fetchServices  = async () => {
        const url = 'http://localhost:8080/api/service/'
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setServices(data.services);
        } else {
            console.error(response);
        }
    }
    const cancelService = async (id) => {
        const cancelUrl = `http://localhost:8080/api/service/${id}/`
        const response = await fetch(cancelUrl, {method: 'DELETE'});
        fetchServices()
    }

    const finishService = async (id) => {
        const finishUrl = `http://localhost:8080/api/service/${id}/`
        const status = {"status": "COMPLETE"}
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(status),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(finishUrl, fetchConfig);
        // fetchServices()
    }

    useEffect(() => {
        fetchServices()
    }, []);


    return (
    <div className="container">
        <div className="col-md-12 text-center">
        <h2 className="display-5 fw-bold">Service Appointments</h2>
        </div>
        <div className="col-md-12 text-center">
        <button type="button" className="btn btn-outline-dark"><NavLink className="nav-link" aria-current="page" to="/service/new">Create an Appointment</NavLink></button>
        <button type="button" className="btn btn-outline-dark"><NavLink className="nav-link" aria-current="page" to="/service/history">Service History</NavLink></button>
        <button type="button" className="btn btn-outline-dark"><NavLink className="nav-link" aria-current="page" to="/technicians/new">Create a Technician</NavLink></button>
        </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Owner</th>
                    <th>Date and Time of Appt</th>
                    <th>Technician</th>
                    <th>Reason</th>
                    <th>VIP</th>
                </tr>
            </thead>
            <tbody>
                {services?.filter((service) => service.status !== "COMPLETE") ?.map(service => {
                        let date = Date.parse(service.starts)
                        const newDate = Date(date)

                        let finished = ''
                        if (service.finished == true) {
                            finished = 'd-none'
                        }

                        let is_vip = ''
                        if (service.vip == true) {
                            is_vip = <i class="bi bi-car-front-fill"></i>
                        }
                    return (
                        <tr className ={finished} key={service.id}>
                            <td>{ service.vin }</td>
                            <td>{ service.vehicle_owner }</td>
                            <td>{ newDate.toLocaleString()}</td>
                            <td>{ service.technician.name }</td>
                            <td>{ service.reason }</td>
                            <td><i className = {is_vip}></i></td>
                            <td><button onClick={ () => cancelService(service.id)}
                                className="btn btn-danger">Cancel</button></td>
                            <td><button onClick={ () => finishService(service.id)}
                            name="status"
                            value={service.status}
                            className="btn btn-success">Finished</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
    )



}


export default ServiceAppointmentList;
