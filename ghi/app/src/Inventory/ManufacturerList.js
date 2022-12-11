import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom"

function ManufacturersList() {

  const [manufacturers, setManufacturers] = useState([]);
  const loadManufacturers = async () => {
    const url = 'http://localhost:8100/api/manufacturers/'
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        setManufacturers(data.manufacturers);
    } else {
        console.error("Error in fetching manufacturers, try again.");
    }
}

  useEffect(() => {
    loadManufacturers();
  }, []);

    return (
    <div className="container">
        <div className="col-md-12 text-center">
        <h2 className="display-5 fw-bold">List of Manufacturers</h2>
        </div>
        <div className="col-md-12 text-center">
        <button type="button" className="btn btn-success"><NavLink style={{color:"white"}} className="nav-link" aria-current="page" to="/manufacturers/new">Create a manufacturer</NavLink></button>
        </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {manufacturers?.map(manufacturer => {
            return (
              <tr key={manufacturer.id}>
                <td>{manufacturer.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    );
  }


export default ManufacturersList;
