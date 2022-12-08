import React, { useState } from 'react';

function SalesmanForm({ addSalesman}) {
    const [name, setName] = useState();
    const [employee_id, setEmployeeId] = useState();
    const handleSubmit = (event) => {
        addSalesman([name, employee_id])
        event.preventDefault();
    }

    return (
        <div className="container">
        <div className="row"></div>
            <div className="offset-3 col-6">
                <div className="shadow p-4 mt-4">
                    <h1>Enter a new customer</h1>
                    <form onSubmit={()=> {handleSubmit(event)}}>
                    <div className="form-floating mb-3">
                        <input />
                        <label htmlFor=""></label>
                    </div>
                    <div className="form-floating mb-3">
                        <input />
                        <label htmlFor=""></label>
                    </div>
                    <div className="form-floating mb-3">
                        <input />
                        <label htmlFor=""></label>
                    </div>
                    <button className="btn btn-primary">Add Salesman</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SalesmanForm;
