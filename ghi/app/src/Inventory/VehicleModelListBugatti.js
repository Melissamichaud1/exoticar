import React, { useState, useEffect } from "react";
import { NavLink, useSearchParams } from "react-router-dom";

function ModelListBugatti() {
  const [models, setModels] = useState([]);
  const loadModels = async () => {
    const url = "http://localhost:8100/api/models/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setModels(data.models);
    } else {
      console.error("Error in fetching vehicle models, try again.");
    }
  };

  const [search, setSearch] = useState("");

  useEffect(() => {
    loadModels();
  }, []);

  return (
    <div className="bugatti-container">
      <video
        src="/videos/black-smoke.mp4"
        type="video/mp4"
        autoPlay
        loop
        muted
      />
      <div className="col-md-12 text-center">
        <h2 className="display-5 fw-bold" style={{ color: "white" }}>
          Bugatti
        </h2>
      </div>
      <div className="col-md-12 text-center">
        <button type="button" className="btn btn-dark">
          <NavLink
            style={{ color: "white" }}
            className="nav-link"
            aria-current="page"
            to="/models/new"
          >
            Create a model
          </NavLink>
        </button>
        &nbsp;&nbsp;&nbsp;
        <button type="button" className="btn btn-dark">
          <NavLink
            style={{ color: "white" }}
            className="nav-link"
            aria-current="page"
            to="/models"
          >
            Back to Models List
          </NavLink>
        </button>
        <div>
          &nbsp;&nbsp;&nbsp;
          <input
            type="search"
            placeholder="Search by Model"
            className="form-control"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
      <div className="container">
        <div className="col-md-12 text-center">
          <table className="table table-striped">
            <thead>
              <tr style={{ color: "white" }}>
                <th>Name</th>
                <th>Manufacturer</th>
                <th>Picture</th>
              </tr>
            </thead>
            <tbody style={{ color: "white" }}>
              {models
                ?.filter(
                  (model) =>
                    model.name.includes(search) &&
                    model.manufacturer.name.includes("Bugatti")
                )
                .map((model) => (
                  <tr style={{ color: "white" }} key={model.id}>
                    <td style={{ color: "white" }}>{model.name}</td>
                    <td style={{ color: "white" }}>
                      {model.manufacturer.name}
                    </td>
                    <td>
                      <img
                        src={model.picture_url}
                        height="400"
                        width="600"
                      ></img>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default ModelListBugatti;
