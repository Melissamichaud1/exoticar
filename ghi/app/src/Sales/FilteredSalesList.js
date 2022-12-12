import React, { useState, useEffect } from 'react';

function SalesBySalesmen() {

  const [sales, setSales] = useState([{
    id: "",
    price: "",
    customer: "",
    salesman: "",
    auto: "",
  }]);

  const [salesmen, setSalesmen] = useState([{
    id: "",
    name: "",
    employee_id: "",
  }]);

  const [salesman, setSalesman] = useState("");

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
      const loadSalesmen  = async () => {
          const salesmenUrl = 'http://localhost:8090/api/salesmen/'
          const response = await fetch(salesmenUrl);
          if (response.ok) {
              const data = await response.json();
              setSalesmen(data.salesman);
          } else {
              console.error(response);
          }
      };
    loadSales();
    loadSalesmen();
  }, []);

  const handleSalesmanSelect = (event) => {
    setSalesman(event.target.value);
    }

    return (
        <>
    <div>
        <h1>Salesman sale history</h1>
        <div className="mb-3">
            <select
            onChange={handleSalesmanSelect}
            value={salesman}
            id="salesman"
            name="salesman"
            className="form-select"
            >
            <option value=''>Choose a salesman</option>
            {salesmen?.map(salesman => {
                return (
                <option
                    key={salesman.employee_id}
                    value={salesman.name}
                >
                    {salesman.name}
                </option>
                );
            })}
            </select>
        </div>
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
        {sales.filter((sale) => sale.salesman.name === salesman).map((sale) => {
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
      </>
    );
  }


export default SalesBySalesmen;
