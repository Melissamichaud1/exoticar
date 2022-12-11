import React from "react"

class ServiceHistoryList extends React.Component {
    state = {
        search: "",
        services: []
    };

    async componentDidMount(){
        await this.serviceHistory();
    }

    async serviceHistory() {
        const url = 'http://localhost:8080/api/service/'
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({services: data.services})
        }
    }

    handleSearchChange = (event) => {
        const value = event.target.value;
        this.setState({ search: value })
    }


    render(){
        return (
                <div>
                &nbsp;&nbsp;&nbsp;
                    <div className="input-group">
                    <input onChange={this.handleSearchChange} type="search" className="form-control" placeholder="Search VIN"/>
                </div>
                <div className="col-md-12 text-center">
                    <h2 className="display-5 fw-bold">Service History</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>VIN</th>
                                <th>Owner</th>
                                <th>Date and Time of Appt</th>
                                <th>Technician</th>
                                <th>Reason</th>
                                <th>Finished</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.services.filter((service) => service.vin.includes(this.state.search)).map((service) => {

                                let date = Date.parse(service.starts)
                                const newDate = Date(date)

                                return(
                                <tr key={service.id}>
                                    <td>{service.vin}</td>
                                    <td>{service.vehicle_owner}</td>
                                    <td>{ newDate.toLocaleString()}</td>
                                    <td>{ service.technician.name }</td>
                                    <td>{ service.reason }</td>
                                    {service.finished && <td>Yes</td>}
                                    {!service.finished && <td>No</td>}
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                    </div>
                </div>
        )
    }
}

export default ServiceHistoryList
