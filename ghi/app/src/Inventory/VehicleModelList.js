import React, { useState, useEffect } from "react";
import { NavLink, useSearchParams } from "react-router-dom";
import "./VehicleModelList.css";

function ModelList() {
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
    <div className="container">
      <video src="/videos/race.mp4" type="video/mp4" autoPlay loop muted />
      <div className="col-md-12 text-center">
        &nbsp;&nbsp;&nbsp;
        <h2 className="display-5 fw-bold">Available Models</h2>
      </div>
      <div className="col-md-12 text-center">
        <button type="button" className="btn btn-dark">
          <NavLink
            style={{ color: "white" }}
            className="nav-link"
            aria-current="page"
            to="/models/pagani"
          >
            Pagani
          </NavLink>
        </button>
        &nbsp;&nbsp;&nbsp;
        <button type="button" className="btn btn-dark">
          <NavLink
            style={{ color: "white" }}
            className="nav-link"
            aria-current="page"
            to="/models/mclaren"
          >
            Mclaren
          </NavLink>
        </button>
        &nbsp;&nbsp;&nbsp;
        <button type="button" className="btn btn-dark">
          <NavLink
            style={{ color: "white" }}
            className="nav-link"
            aria-current="page"
            to="/models/bugatti"
          >
            Bugatti
          </NavLink>
        </button>
      </div>
    </div>
  );
}

export default ModelList;
