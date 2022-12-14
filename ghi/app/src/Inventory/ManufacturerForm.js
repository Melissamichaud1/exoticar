import React, { useState } from "react";

function ManufacturerForm() {
  const [manufacturer, setManufacturer] = useState({
    name: "",
  });

  const handleChange = (event) => {
    setManufacturer({
      ...manufacturer,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...manufacturer };
    const manufacturerUrl = "http://localhost:8100/api/manufacturers/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(manufacturerUrl, fetchConfig);
    if (response.ok) {
      await response.json();
      setManufacturer({ name: "" });
    } else {
      console.error("Error in creating manufacturer, try again.");
    }
  };

  return (
    <div className="container">
      <div className="row"></div>
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <div className="col-md-12 text-center">
            <h1>Create a Manufacturer</h1>
          </div>
          <form onSubmit={handleSubmit} id="create_manufacturer_form">
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={manufacturer.name}
                placeholder="Name"
                name="name"
                id="name"
                required
                type="text"
                className="form-control"
              />
              <label htmlFor="name">Name</label>
            </div>
            <div className="col-md-12 text-center">
              <button className="btn btn-dark btn-lg btn-block">Create</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ManufacturerForm;
