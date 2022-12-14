import React, { useState } from "react";

function CustomerForm() {
  const [customer, setCustomer] = useState({
    name: "",
    address: "",
    phone_number: "",
  });

  const handleChange = (event) => {
    setCustomer({ ...customer, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...customer };
    const customerUrl = "http://localhost:8090/api/customers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(customerUrl, fetchConfig);
    if (response.ok) {
      const newCustomer = await response.json();
      setCustomer({ name: "", address: "", phone_number: "" });
    } else {
      console.error("Error in creating customer");
    }
  };

  return (
    <div className="container">
      <div className="row"></div>
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <div className="col-md-12 text-center">
            <h1>Enter a new customer</h1>
          </div>
          <form onSubmit={handleSubmit} id="create_customer_form">
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={customer.name}
                placeholder="Name"
                name="name"
                id="name"
                required
                type="text"
                className="form-control"
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={customer.address}
                placeholder="Address"
                name="address"
                id="address"
                required
                type="text"
                className="form-control"
              />
              <label htmlFor="address">Address</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={customer.phone_number}
                placeholder="Phone Number"
                name="phone_number"
                id="phone_number"
                required
                type="number"
                className="form-control"
              />
              <label htmlFor="phone_number">Phone Number</label>
            </div>
            <div className="col-md-12 text-center">
              <button className="btn btn-dark btn-lg btn-block">
                Add Customer
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CustomerForm;
