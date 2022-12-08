import React from "react"

class ServiceHistoryList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: "",
            services: []
        };
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }

    async componentDidMount(){
        const url = 'http://localhost:8080/api/service/'
        const response = await fetch(url);

        if (response.ok) {
            const data = await response.json();
            this.setState({services: data.services})
        }
    }

    handleSearchChange(event) {
        const value = event.target.value;
        this.setState({ search: value })
    }

    render(){
        return (
                <div>
                    <div>&nbsp;</div>
                    <input onChange={this.handleSearchChange} value={this.state.search} type="text" className="form-control" placeholder="Search VIN"/>

                    <h2 className="display-5 fw-bold">Service History</h2>
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Vin</th>
                                <th>Owner</th>
                                <th>Date and Time of Appt</th>
                                <th>Technician</th>
                                <th>Reason</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.services.map(service => {

                                let date = Date.parse(service.starts)
                                const newDate = Date(date)

                                let finished = 'd-none'
                                if (service.finished == true) {
                                    finished = ''
                                }
                                let search_bar = 'd-none'
                                if(this.state.search == ''){
                                    search_bar = ''
                                } else if (service.vin.includes(this.state.search)){
                                    search_bar = ''
                                }

                                return(
                                <tr className={[search_bar, finished].join(" ")} key={service.id}>
                                    <td>{service.vin}</td>
                                    <td>{service.vehicle_owner}</td>
                                    <td>{ newDate.toLocaleString()}</td>
                                    <td>{ service.technician.name }</td>
                                    <td>{ service.reason }</td>
                                </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
        )
    }
}

export default ServiceHistoryList
