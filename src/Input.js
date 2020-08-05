import React, { Component } from "react";
import axios from "axios";
axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';

export default class Input extends Component {

    constructor() {
        super();
        this.state = {
            inputData: "",      // Data to be sorted
            dataType: "str",    // Type of data to be sorted, string by default
            sortedData: "",     // Sorted data, received from back end
            steps: []           // Steps required to perform merge sort, received from back end.
        };
    }

    // Handler for form button click. Send data to back end for processing.
    handleButtonClick = (e) => {
        e.preventDefault();     // Prevent refresh before sorting process complete
        var params = new URLSearchParams();
        params.append('dataType', this.state.dataType);
        params.append('data', this.state.inputData);
        const self = this;  //Needed this to avoid issues with asynchronous nature of this.setState.

        // Post request to server
        axios.post("http://localhost:4000/mergeSort", params)
        .then(function(res) {
            if(res.data) {
                self.setState({sortedData: `${res.data.sorted.join(', ')}.`});
                self.setState({steps: res.data.steps});
            }
        });
    };

    // Function to set sorted data
    setSorted = (data) => {
        console.log(data);
        this.setState({sortedData: data});
    };

    // Handler for text input
    handleInputText = (e) => {
        this.setState({inputData: e.target.value});
    };

    // Handler for select
    handleSelect = (e) => {
        this.setState({dataType: e.target.value});
    };

    render() {
        return (
            <div>
                <form>
                    <label>
                    Data type:
                    <select onChange={this.handleSelect}>
                        <option value="str">String</option>
                        <option value="int">Integer</option>
                    </select>
                    </label><br/>
                    <input onChange={this.handleInputText} type="text" name="input" placeholder="Input data" />
                    <button onClick={this.handleButtonClick}>Submit</button>
                </form>
                <h3>Sorted input: {this.state.sortedData}</h3>
                <h3>Sorting steps:</h3>
                <ol>
                    {this.state.steps.map((d,i) => <li key={i}>{d}</li>)}
                </ol>
            </div>
        );
    }
}