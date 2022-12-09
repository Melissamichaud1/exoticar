import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom"

function ServiceAppointmentList() {

    const [services, setServices] = useState([]);
    const fetchServices  = async () => {
        const url = 'http://localhost:8080/api/service/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setServices(data.services);
        } else {
            console.error(response);
        }
    }

    const [autos, setAutos] = useState([]);
    const fetchAutomobiles  = async () => {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            setAutos(data.autos);
        } else {
            console.error(response);
        }
    }

    useEffect(() => {
        fetchServices();
        fetchAutomobiles();
    }, []);

    const cancelService = async (id) => {
        const cancelUrl = `http://localhost:8080/api/service/${id}/`
        await fetch(cancelUrl, {method: 'DELETE'});
        setServices(services.filter(function(service){return service.id !== id}))
        // fetchServices()
    }

    const finishService = async (id) => {
        const finishUrl = `http://localhost:8080/api/service/${id}/`
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(id),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(finishUrl, fetchConfig);
    }



    let vip = "d-none"
    return (
    <div className="container">
        <div className="col-md-12 text-center">
        <h2 className="display-5 fw-bold">Service Appointments</h2>
        </div>
        <div className="col-md-12 text-center">
        <button type="button" className="btn btn-success"><NavLink style={{color:"white"}} className="nav-link" aria-current="page" to="/service/new">Create an Appointment</NavLink></button> &nbsp;&nbsp;&nbsp;
        <button type="button" className="btn btn-success"><NavLink style={{color:"white"}} className="nav-link" aria-current="page" to="/service/history">Service History</NavLink></button> &nbsp;&nbsp;&nbsp;
        <button type="button" className="btn btn-success"><NavLink style={{color:"white"}} className="nav-link" aria-current="page" to="/technicians/new">Create a Technician</NavLink></button> &nbsp;&nbsp;&nbsp;
        </div>
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>VIP</th>
                    <th>VIN</th>
                    <th>Owner</th>
                    <th>Date and Time of Appt</th>
                    <th>Technician</th>
                    <th>Reason</th>
                </tr>
            </thead>
            <tbody>
                {services?.map(service => {
                    let date = Date.parse(service.starts)
                        const newDate = Date(date)
                    return (
                        <tr key={service.id}>
                            {autos?.map(auto => {
                                if (service.vin == auto.vin){
                                    return(
                                        <td key={service.id}><img src="https://image.emojipng.com/675/36675.jpg" width="30" height="30"/></td>
                                    )
                                } else {
                                    return(<td key={service.id}><img src="https://uxwing.com/wp-content/themes/uxwing/download/checkmark-cross/red-x-icon.png" width="30" height="30"/></td>
                                    )
                                }
                            })}
                            <td>{ service.vin }</td>
                            <td>{ service.vehicle_owner }</td>
                            <td>{ newDate.toLocaleString()}</td>
                            <td>{ service.technician.name }</td>
                            <td>{ service.reason }</td>
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
