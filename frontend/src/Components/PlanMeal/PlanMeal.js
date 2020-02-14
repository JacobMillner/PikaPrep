import React, { Component } from "react";

class PlanMeal extends Component {
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
                Plan Meal
            </div>
        )
    };
}

export default PlanMeal;