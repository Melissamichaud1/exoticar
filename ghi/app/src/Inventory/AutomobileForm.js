import React from 'react';

class AutomobileForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            color: "",
            year:"",
            vin: "",
            model_id: "",
            models: []
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async componentDidMount(){
        const url = 'http://localhost:8100/api/models/'
        const response = await fetch(url);

        if(response.ok) {
            const data = await response.json();
            this.setState({models: data.models})
        }
    }

    async handleSubmit(event) {
        event.preventDefault();
        const data = {...this.state};
        delete data.models

        const url = 'http://localhost:8100/api/automobiles/';
        const fetchConfig = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        };
        const response = await fetch(url, fetchConfig);
        if(response.ok) {
            const newModel = await response.json();
            this.setState({
                color: "",
                year: "",
                vin:"",
                model:"",
            });
        }
    }

    handleChange(event) {
        const value = event.target.value;
        const key = event.target.name;
        const changeDict = {};
        changeDict[key] = value;
        this.setState(changeDict);
    }


    render() {
        return (
            <div className="row">
                <div className="offset-3 col-6">
                    <div className="shadow p-4 mt-4">
                        <h1>Add an automobile to inventory</h1>
                        <form onSubmit={this.handleSubmit} id="create-automobile-form">
                        <div className="form-floating mb-3" id="create-automobile-form">
                            <input
                            onChange={this.handleChange}
                            value={this.state.color}
                            placeholder="Color"
                            required type="text"
                            name="color"
                            id="color"
                            className="form-control"
                            />
                            <label htmlFor="color">Color</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                            onChange={this.handleChange}
                            value={this.state.year}
                            placeholder="Year"
                            required type="text"
                            name="year"
                            id="year"
                            className="form-control" />
                            <label htmlFor="year">Year</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input
                            onChange={this.handleChange}
                            value={this.state.vin}
                            placeholder="VIN"
                            required type="text"
                            name="vin"
                            id="vin"
                            className="form-control" />
                            <label htmlFor="vin">VIN</label>
                        </div>
                        <div className="mb-3">
                            <select
                            onChange={this.handleChange}
                            value={this.state.model}
                            required name="model_id"
                            id="model_id"
                            className="form-select"
                            >
                            <option value="">Choose a model</option>
                            {this.state.models.map(model => {
                                return (
                                <option key={model.id} value={model.id}>{model.name}</option>
                                )
                            })}
                            </select>
                        </div>
                        <button className="btn btn-primary">Create</button>
                        </form>
                    </div>
                </div>
            </div>

        )
    }
}

export default AutomobileForm
