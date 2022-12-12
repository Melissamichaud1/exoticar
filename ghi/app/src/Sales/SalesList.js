import React, { useState, useEffect } from 'react';
import { NavLink } from "react-router-dom";

function SalesList() {

  const [sales, setSales] = useState([])

  useEffect(() => {
    const loadSales  = async () => {
      const url = 'http://localhost:8090/api/sales/'
      const response = await fetch(url);
      if (response.ok) {
          const data = await response.json();
          setSales(data.sales);
      } else {
          console.error(response);
      }
  };
    loadSales();
  }, []);

    return (
      <div className="container">
      <div className="col-md-12 text-center">
        <h2 className="display-5 fw-bold">List of All Sales</h2>
      </div>
      <div className="col-md-12 text-center">
        <button type="button" className="btn btn-success">
          <NavLink
            style={{ color: "white" }}
            className="nav-link"
            aria-current="page"
            to="/sales/new"
          >
            Record an new sale
          </NavLink>
        </button>
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Salesman</th>
            <th>Employee ID</th>
            <th>Customer</th>
            <th>VIN</th>
            <th>Sale price</th>
          </tr>
        </thead>
        <tbody>
          {sales?.map((sale) => {
            return (
              <tr key={sale.id}>
                <td>{sale.salesman.name}</td>
                <td>{sale.salesman.employee_id}</td>
                <td>{sale.customer.name}</td>
                <td>{sale.auto.vin}</td>
                <td>${sale.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      </div>
    );
  }


export default SalesList;
