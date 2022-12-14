import React, { useState, useEffect } from "react";

function AutomobileForm() {
  const [automobile, setAutomobiles] = useState({
    color: "",
    year: "",
    vin: "",
    model_id: "",
  });

  const [models, setModels] = useState([]);
  const loadModels = async () => {
    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url);
    const data = await response.json();
    if (response.ok) {
      setModels(data.models);
    } else {
      console.error("Error in fetching models, try again.");
    }
  };

  useEffect(() => {
    loadModels();
  }, []);

  const handleChange = (event) => {
    setAutomobiles({ ...automobile, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = { ...automobile };
    const automobileUrl = "http://localhost:8100/api/automobiles/";
    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(automobileUrl, fetchConfig);
    if (response.ok) {
      await response.json();
      setAutomobiles({ color: "", year: "", vin: "", model_id: "" });
    } else {
      console.error("Error in creating automobile, try again.");
    }
  };

  return (
    <div className="container">
      <div className="row"></div>
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <div className="col-md-12 text-center">
            <h1>Add An Automobile To Inventory</h1>
          </div>
          <form onSubmit={handleSubmit} id="create_vautomobileform">
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={automobile.color}
                placeholder="Color"
                name="color"
                id="color"
                required
                type="text"
                className="form-control"
              />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={automobile.year}
                placeholder="Year"
                name="year"
                id="year"
                required
                type="text"
                className="form-control"
              />
              <label htmlFor="year">Year</label>
            </div>
            <div className="form-floating mb-3">
              <input
                onChange={handleChange}
                value={automobile.vin}
                placeholder="VIN"
                name="vin"
                id="vin"
                required
                type="text"
                className="form-control"
              />
              <label htmlFor="vin">VIN</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleChange}
                value={automobile.model_id}
                id="model_id"
                name="model_id"
                className="form-select"
              >
                <option value="">Choose a model..</option>
                {models?.map((model) => {
                  return (
                    <option key={model.id} value={model.id}>
                      {model.name}
                    </option>
                  );
                })}
              </select>
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

export default AutomobileForm;
