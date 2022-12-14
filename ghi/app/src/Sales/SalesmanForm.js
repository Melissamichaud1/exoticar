import React, { useState } from "react";

function SalesmanForm() {
  const [salesman, setSalesman] = useState({
    name: "",
    employee_id: "",
  });

  const handleChange = (event) => {
    setSalesman({ ...salesman, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...salesman };
    const salesmanUrl = "http://localhost:8090/api/salesmen/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(salesmanUrl, fetchConfig);
    if (response.ok) {
      const newSalesman = await response.json();
      setSalesman({ name: "", employee_id: "" });
    } else {
      console.error("Error in creating salesman");
    }
  };

  return (
    <div className="container">
      <div className="row"></div>
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <div className="col-md-12 text-center">
            <h1>Enter a new salesman</h1>
          </div>
          <form onSubmit={handleSubmit} id="create_salesman_form">
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={salesman.name}
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
                value={salesman.employee_id}
                placeholder="employee_id"
                name="employee_id"
                id="employee_id"
                required
                type="number"
                className="form-control"
              />
              <label htmlFor="employee_id">Employee ID</label>
            </div>
            <div className="col-md-12 text-center">
              <button className="btn btn-dark">Add Salesman</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SalesmanForm;
