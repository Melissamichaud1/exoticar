import React, { useState, useEffect } from 'react';

function ManufacturersList() {

  const [manufacturers, setManufacturers] = useState([]);
  const loadManufacturers = async () => {
    const url = 'http://localhost:8100/api/manufacturers/'
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        setManufacturers(data.manufacturers);
    } else {
        console.error(response);
    }
}

  useEffect(() => {
    loadManufacturers();
  }, []);

    return (
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
    );
  }


export default ManufacturersList;
