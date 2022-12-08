import React, { useState } from 'react';

function CustomerForm() {
    const [customer, setCustomer] = useState({
        name: "",
        address: "",
        phone_number: "",
    });

    const handleChange = (event) => {
        setCustomer({...customer, [event.target.name]: event.target.value});
    };

    async function handleSubmit(event) {
        event.preventDefault();
        const data = setCustomer
        const customerUrl = "http://localhost:8090/api/customers/";
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        };
        const response = await fetch(customerUrl, fetchConfig);
        if (response.ok) {
            const newCustomer = await response.json();
            console.log(newCustomer);
            setCustomer({ name: "", address: "", phone_number: ""});
        } else {
            console.error("Error in creating customer")
        }
    };

    return (
        <div className="container">
        <div className="row"></div>
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Enter a new customer</h1>
                    <form onSubmit={handleSubmit} id="create_customer_form">
                    <div className="form-floating mb-3">
                        <input
                        onChange={handleChange}
                        value={customer.name}
                        placeholder="Name"
                        name="name"
                        id="name"
                        required type="text"
                        className="form-control"
                        />
                        <label htmlFor="name"></label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                        onChange={handleChange}
                        value={customer.address}
                        placeholder="Address"
                        name="address"
                        id="address"
                        required type="text"
                        className="form-control"
                        />
                        <label htmlFor="address"></label>
                    </div>
                    <div className="form-floating mb-3">
                        <input
                        onChange={handleChange}
                        value={customer.phone_number}
                        placeholder="Phone Number"
                        name="phone_number"
                        id="phone_number"
                        required type="number"
                        className="form-control"
                        />
                        <label htmlFor="phone_number"></label>
                    </div>
                    <button className="btn btn-primary">Add Customer</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CustomerForm;
