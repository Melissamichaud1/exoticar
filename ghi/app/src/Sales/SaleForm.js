import React, { useState, useEffect } from 'react';

function SaleForm() {

    const [sale, setSale] = useState({
        price: "",
        picture_url: "",
        manufacturer: [],
    });

    const [manufacturers, setManufacturers] = useState([]);
    const loadManufacturers = async () => {
        const url = 'http://localhost:8100/api/manufacturers/';
        const response = await fetch(url);
        const data = await response.json();
        if (response.ok) {
            setManufacturers(data.manufacturers);
        } else {
            console.error(response);
        }
    }

    useEffect(() => {
        loadManufacturers();
    }, []);

    const handleChange = (event) => {
        setSale({...sale, [event.target.name]: event.target.value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...sale}
        const saleUrl = "http://localhost:8100/api/sales/";
        const fetchConfig = {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(saleUrl, fetchConfig);
        if (response.ok) {
            const newsale = await response.json();
            console.log(newsale);
            setSale({ name: "", picture_url: "", manufacturer: ""});
        } else {
            console.error("Error in creating sale")
        }
    };

    return (
        <div className="container">
        <div className="row"></div>
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Create a vehicle sale</h1>
                    <form onSubmit={handleSubmit} id="create_vehicle_sale_form">
                    <div className="form-floating mb-3">
                        <input
                        onChange={handleChange}
                        value={sale.name}
                        placeholder="Name"
                        name="name"
                        id="name"
                        required type="text"
                        className="form-control"
                        />
                        <label htmlFor="name">Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                        onChange={handleChange}
                        value={sale.picture_url}
                        placeholder="Picture URL"
                        name="picture_url"
                        id="picture_url"
                        required type="url"
                        className="form-control"
                        />
                        <label htmlFor="name">Picture URL</label>
                    </div>
                    <div className="mb-3">
                    <select
                      onChange={handleChange}
                      value={sale.manufacturer}
                      id="manufacturer"
                      name="manufacturer"
                      className="form-select"
                    >
                      <option value="">Choose a manufacturer</option>
                      {manufacturers.map(manufacturer => {
                        return (
                          <option
                            key={manufacturer.id}
                            value={manufacturer.id}
                          >
                            {manufacturer.name}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                    <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SaleForm;
