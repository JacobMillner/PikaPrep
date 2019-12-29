import React, { Component } from "react";

class Calendar extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    render() {
        return (
            <div>
                Calendar
            </div>
        )
    };
}

export default Calendar;