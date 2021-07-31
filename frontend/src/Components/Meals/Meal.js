import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../Util/api';

class Meal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      meal: null,
    };
  }

  async componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const meal = (await API.get(`/meals/${params.id}`)).data;
    this.setState({
      meal: meal.data,
    });
  }

  render() {
    const { meal } = this.state;
    if (meal === null) return <p>Loading ...</p>;
    return (
      <div className="container">
        <div className="row">
          <div className="jumbotron col-12">
            <h1 className="display-3">{meal.name}</h1>
            <img src={meal.photo_url} className="page-image" alt="yum!" />
            <p className="lead">{meal.description}</p>
            <p>
              <a href={meal.recipe_url}>Recipe</a>
            </p>
            <p>Calories: {meal.calories}</p>
            <p>Carbs: {meal.carbs}</p>
            <p>Fat: {meal.fat}</p>
            <p>Protein: {meal.protein}</p>
            <p>Servings: {meal.servings}</p>
            <p>Cooking Time: {meal.cooking_time}</p>
          </div>
        </div>
        <Link to={`/planmeal/${meal.id}`}>
          <button>Plan Meal</button>
        </Link>
      </div>
    );
  }
}

export default Meal;
