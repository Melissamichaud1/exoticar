import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom"

function AutomobileList() {
const [automobiles, setAutomobiles] = useState(null);

const fetchData = async () => {
    const url = 'http://localhost:8100/api/automobiles/';
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        setAutomobiles(data.autos)
    }
}

useEffect(() => {
    fetchData()
}, []);

    return (
        <div className="container">
            <div className="col-md-12 text-center">
            <h2 className="display-5 fw-bold">List of Available Automobiles</h2>
            </div>
            <div className="col-md-12 text-center">
            <button type="button" className="btn btn-outline-dark"><NavLink className="nav-link" aria-current="page" to="/automobiles/new">Create an automobile</NavLink></button>
            </div>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>Vin</th>
                        <th>Year</th>
                        <th>Color</th>
                        <th>Manufacturer</th>
                        <th>Model</th>
                    </tr>
                </thead>
                <tbody>
                    {automobiles?.map(auto => {
                        return(
                            <tr key={ auto.id} value={auto.id} >
                                <td>{ auto.vin }</td>
                                <td>{ auto.year }</td>
                                <td>{ auto.color }</td>
                                <td>{ auto.model.manufacturer.name }</td>
                                <td>{ auto.model.name }</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
        )



    }
export default AutomobileList
