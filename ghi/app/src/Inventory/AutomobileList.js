import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function AutomobileList() {
  const [automobiles, setAutomobiles] = useState(null);

  const fetchData = async () => {
    const url = "http://localhost:8100/api/automobiles/";
    const response = await fetch(url);
    if (response.ok) {
      const data = await response.json();
      setAutomobiles(data.autos);
    } else {
      console.error("Error in fetching automobiles, try again.");
    }
  };

  const sellAutomobile = async (id) => {
    const finishUrl = `http://localhost:8100/api/automobiles/${id}/`;
    const fetchConfig = {
      method: "PUT",
      body: JSON.stringify({ finished: true }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    await fetch(finishUrl, fetchConfig);
    fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="col-md-12 text-center">
        <h2 className="display-5 fw-bold">List of Available Automobiles</h2>
      </div>
      <div className="col-md-12 text-center">
        <button type="button" className="btn btn-dark">
          <NavLink
            style={{ color: "white" }}
            className="nav-link"
            aria-current="page"
            to="/automobiles/new"
          >
            Create an automobile
          </NavLink>
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Vin</th>
            <th>Year</th>
            <th>Color</th>
            <th>Manufacturer</th>
            <th>Model</th>
            <th>Sold</th>
          </tr>
        </thead>
        <tbody>
          {automobiles
            ?.filter((auto) => auto.finished == false)
            ?.map((auto) => {
              return (
                <tr key={auto.id}>
                  <td>{auto.vin}</td>
                  <td>{auto.year}</td>
                  <td>{auto.color}</td>
                  <td>{auto.model.manufacturer.name}</td>
                  <td>{auto.model.name}</td>
                  <td>
                    <button
                      onClick={() => sellAutomobile(auto.id)}
                      value={auto.finished}
                      className="btn btn-dark"
                    >
                      Sold
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
export default AutomobileList;
