import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../Util/api';

class Meals extends Component {
    constructor(props) {
        super(props);

        this.state = {
            meals: null,
        };
    }

    async componentDidMount() {
        const meals = (await API.get('/meals')).data;
        this.setState({
            meals: meals.data
        });
    }

    render() {
        return (
            <div className="flex-container">
                {this.state.meals === null && <p>Loading meals...</p>}
                {
                    this.state.meals && this.state.meal.map(meal => (
                        <div key={meal.id} className="eggplant">
                            <Link to={`/meals/${meal.id}`} className="eggplant">
                                <div className="flex-card">
                                    <div className="card-body">
                                        <img src={meal.photo_url} alt="yum!" />
                                        <h4 className="card-title">{meal.name}</h4>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default Meals;