import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom"

function ServiceAppointmentList() {

    const [services, setServices] = useState([]);
    const fetchServices  = async () => {
        const url = 'http://localhost:8080/api/services/'
        const response = await fetch(url);
        const servicesData = await response.json();
        console.log(servicesData);
        setServices(servicesData.services);
    }

    const[automobiles, setAutomobiles] = useState([]);
    const fetchAutomobiles = async () => {
        const url = 'http://localhost:8080/api/automobile/'
        const response = await fetch(url)
        const automobilesData = await response.json()
        setAutomobiles(automobilesData.autos)
    }

    useEffect(() => {
        fetchServices();
        fetchAutomobiles();
    }, []);

    const cancelItem = async (id) => {
        fetch(`http://localhost:8080/api/services/${id}/`,{
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({is_cancelled:true}),
        }).then(() => {
            window.location.reload();
        })
    }


    const finishItem = async (id) => {
        await fetch (`http://localhost:8080/api/services/${id}/`,{
            method: 'PUT',
            headers:{'Content-Type': 'application/json'},
            body: JSON.stringify({is_cancelled:true}),
        }).then(() => {
            window.location.reload();
        })

    }
    return (
    <div className="container">
        <h2 className="display-5 fw-bold">Service Appointments</h2>
        <button type="button" className="btn btn-outline-primary"><NavLink className="nav-link" aria-current="page" to="/service/new">Create an Appointment</NavLink></button>
        <button type="button" className="btn btn-outline-info"><NavLink className="nav-link" aria-current="page" to="/service/history">Service History</NavLink></button>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIN</th>
                    <th>Vehicle Owner</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Technician</th>
                    <th>Reason</th>
                </tr>
            </thead>
            <tbody>
                {services.filter(serviceFilter).map(service => {
                    return (
                        <tr key={service.id} style={ conditionalRowStyle(service.vin) }>
                            <td>{ service.vin }</td>
                            <td>{ service.vehicle_owner }</td>
                            <td>{ service.technician.name }</td>
                            <td><button onClick={ () => handlecancelItem(service.id)}
                                className="btn btn-danger">Cancel</button></td>
                            <td><button onClick={ () => handlefinishItem(service)}
                            className="btn btn-success">Finished</button></td>
                            <td>{ service.reason }</td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
    )



}








export default ServiceAppointmentList;
