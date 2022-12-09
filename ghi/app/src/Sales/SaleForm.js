import React, { useState, useEffect } from 'react';

function SaleForm() {

    const [sale, setSale] = useState({
        auto: "",
        salesman: "",
        customer: "",
        price: "",
    });

    const [automobiles, setAutomobiles] = useState([]);
    const loadAutos  = async () => {
        const autosUrl = 'http://localhost:8100/api/automobiles/'
        const response = await fetch(autosUrl);
        if (response.ok) {
            const data = await response.json();
            setAutomobiles(data.autos);
        } else {
            console.error(response);
        }
    }

    const [salesmen, setSalesmen] = useState([]);
    const loadSalesmen  = async () => {
        const salesmenUrl = 'http://localhost:8090/api/salesmen/'
        const response = await fetch(salesmenUrl);
        if (response.ok) {
            const data = await response.json();
            setSalesmen(data.salesman);
        } else {
            console.error(response);
        }
    }

    const [customers, setCustomers] = useState([]);
    const loadCustomers = async () => {
        const customerUrl = 'http://localhost:8090/api/customers/'
        const response = await fetch(customerUrl);
        if (response.ok) {
            const data = await response.json();
            setCustomers(data.customers);
        } else {
            console.error(response);
        }
    }

    useEffect(() => {
        loadAutos();
        loadSalesmen();
        loadCustomers();
      }, []);


    const handleChange = (event) => {
        setSale({...sale, [event.target.name]: event.target.value});
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = {...sale}
        console.log(data)
        const saleUrl = "http://localhost:8090/api/sales/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(saleUrl, fetchConfig);
        if (response.ok) {
            const newsale = await response.json();
            console.log(newsale);
            setSale({auto: "", salesman: "", customer: "", price: "",});
        } else {
            console.error("Error in creating sale")
        }
    };


    return (
        <div className="container">
        <div className="row"></div>
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Record a new sale</h1>
                    <form onSubmit={handleSubmit} id="create_vehicle_sale_form">
                    <div className="mb-3">
                    <select
                      onChange={handleChange}
                      value={sale.auto}
                      id="auto"
                      name="auto"
                      className="form-select"
                    >
                      <option value="">Choose an automobile</option>
                      {automobiles?.map(automobile => {
                        return (
                          <option
                            key={automobile.href}
                            value={automobile.vin}
                          >
                            {automobile.model.name}
                          </option>
                        );
                      })}
                    </select>
                    </div>
                    <div className="mb-3">
                    <select
                      onChange={handleChange}
                      value={sale.salesman}
                      id="salesman"
                      name="salesman"
                      className="form-select"
                    >
                      <option value="">Choose a salesman</option>
                      {salesmen?.map(salesman => {
                        return (
                          <option
                            key={salesman.employee_id}
                            value={salesman.employee_id}
                          >
                            {salesman.name}
                          </option>
                        );
                      })}
                    </select>
                    </div>
                    <div className="mb-3">
                    <select
                      onChange={handleChange}
                      value={sale.customer}
                      id="customer"
                      name="customer"
                      className="form-select"
                    >
                      <option value="">Choose a customer</option>
                      {customers?.map(customer => {
                        return (
                          <option
                            key={customer.id}
                            value={customer.id}
                          >
                            {customer.name}
                          </option>
                        );
                      })}
                    </select>
                    </div>
                    <div className="form-floating mb-3">
                    <input
                        onChange={handleChange}
                        value={sale.price}
                        placeholder="Price"
                        name="price"
                        id="price"
                        required type="number"
                        className="form-control"
                        />
                    <label htmlFor='price'>Price</label>
                    </div>
                    <button className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SaleForm;
