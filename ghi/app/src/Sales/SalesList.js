import React, { useState, useEffect } from 'react';

function SalesList() {

  const [sales, setSales] = useState([]);
  const loadSales  = async () => {
    const url = 'http://localhost:8090/api/sales/'
    const response = await fetch(url);
    if (response.ok) {
        const data = await response.json();
        console.log(data);
        setSales(data.sales);
    } else {
        console.error(response);
    }
}

  useEffect(() => {
    loadSales();
  }, []);

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
                <td>{sale.auto.vin}</td>
                <td>${sale.price}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }


export default SalesList;
