import React from 'react';
import { NavLink } from "react-router-dom"

class ServiceAppointmentList extends React.Component {
    state = {
        services: [],
        autos: [],
    }

    async getServices() {
        const url = 'http://localhost:8080/api/service/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const services = data.services;
            this.setState({services: services});
        } else {
            console.error(response);
        }
    }

    async getAutomobiles() {
        const url = 'http://localhost:8100/api/automobiles/';
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            console.log(data);
            const autos = data.autos;
            this.setState({autos: autos});
        } else {
            console.error(response);
        }
    }

   async componentDidMount() {
    this.getServices();
    this.getAutomobiles();
   }


    async cancelService(event) {
        const cancelUrl = `http://localhost:8080/api/service/${event}/`
        await fetch(cancelUrl, {method: 'DELETE'});
        this.getServices()
    }

    async finishService(event) {
        const finishUrl = `http://localhost:8080/api/service/${event}/`
        const fetchConfig = {
            method: "PUT",
            body: JSON.stringify(event),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(finishUrl, fetchConfig);
    }

    render () {
    let is_vip = "d-none"
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
                {this.state.services.map(service => {
                    let date = Date.parse(service.starts)
                        const newDate = Date(date)
                    return (
                        <tr key={service.id}>
                            {this.state.autos?.map(auto => {
                                if (service.vin == auto.vin){
                                    return(
                                        <td key={service.id}><img src="https://image.emojipng.com/675/36675.jpg" width="70" height="50"/></td>
                                    )
                               } else {
                                    return(
                                        <td key={service.id}><img className={is_vip}/></td>
                                    )

                            }})}
                            <td>{ service.vin }</td>
                            <td>{ service.vehicle_owner }</td>
                            <td>{ newDate.toLocaleString()}</td>
                            <td>{ service.technician.name }</td>
                            <td>{ service.reason }</td>
                            <td><button onClick={ () => this.cancelService(service.id)} className="btn btn-danger">Cancel</button></td>
                            <td><button onClick={ () => this.finishService(service.id)} className="btn btn-success">Finished</button></td>
                        </tr>
                    );
                })}
            </tbody>
        </table>
    </div>
    )



}
}


export default ServiceAppointmentList;
