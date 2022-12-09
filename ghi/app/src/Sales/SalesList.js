import React, { useState, useEffect } from 'react';

function SalesList() {

  const [sales, setSales] = useState([]);

  useEffect(() => {
    async function loadSales() {
      const response = await fetch("http://localhost:8090/api/sales/");
      if (response.ok) {
        const data = await response.json();
        setSales(data.shoes);
      } else {
        console.error(response);
      }
    }
    loadSales();
  },[])

    return (
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
          {sales?.map(sale => {
            return (
              <tr key={sale.id}>
                <td>{sale.salesman.name}</td>
                <td>{sale.salesman.employee_id}</td>
                <td>{sale.customer.name}</td>
                <td>{sale.automobile.vin}</td>
                <td>{sale.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }

  export default SalesList;
