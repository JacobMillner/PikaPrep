import React, { Component } from "react";
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import API from '../../Util/api';
import { addFlashMessage } from '../../Actions/FlashMessages';

class NewMeal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            description: "",
            photo_url: "",
            recipe_url: "",
            calories: "",
            carbs: "",
            fat: "",
            protein: "",
            servings: "",
            cooking_time: "",
        };
    }


    handleChange = event => {
        this.setState({
            [event.target.id]: event.target.value
        });
    }

    getPostData = () => {
        return {
            data:
            {
                meal: this.state
            }
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        API.post('/meals', this.getPostData())
            .then((res) => {
                console.log(res);
                this.props.addFlashMessage({
                    type: 'success',
                    text: 'Great job!'
                });
                this.props.history.push('/meals');
            });
    }

    validateForm() {
        return this.state.name.length > 0
            && this.state.recipe_url.length > 0
            && this.state.photo_url.length > 0;
    }


    render() {
        return (
            <div className="NewMeal">
                <form onSubmit={this.handleSubmit}>
                    <div id="name">
                        <label>Name</label>
                        <input
                            autoFocus
                            id="name"
                            type="text"
                            value={this.state.name}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div id="description">
                        <label>Description</label>
                        <input
                            id="description"
                            type="text"
                            value={this.state.description}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div id="recipe_url">
                        <label>Recipe URL</label>
                        <input
                            id="recipe_url"
                            value={this.state.recipe_url}
                            onChange={this.handleChange}
                            type="text"
                        />
                    </div>
                    <div id="photo_url">
                        <label>Photo URL</label>
                        <input
                            id="photo_url"
                            value={this.state.photo_url}
                            onChange={this.handleChange}
                            type="text"
                        />
                    </div>
                    <div id="calories">
                        <label>Calories</label>
                        <input
                            id="calories"
                            value={this.state.calories}
                            onChange={this.handleChange}
                            type="number"
                        />
                    </div>
                    <div id="carbs">
                        <label>Carbs</label>
                        <input
                            id="carbs"
                            value={this.state.carbs}
                            onChange={this.handleChange}
                            type="number"
                        />
                    </div>
                    <div id="fat">
                        <label>Fat</label>
                        <input
                            id="fat"
                            value={this.state.fat}
                            onChange={this.handleChange}
                            type="number"
                        />
                    </div>
                    <div id="protein">
                        <label>Protein</label>
                        <input
                            id="protein"
                            value={this.state.protein}
                            onChange={this.handleChange}
                            type="number"
                        />
                    </div>
                    <div id="servings">
                        <label>Servings</label>
                        <input
                            id="servings"
                            value={this.state.servings}
                            onChange={this.handleChange}
                            type="number"
                        />
                    </div>
                    <div id="cooking_time">
                        <label>Cooking Time (min)</label>
                        <input
                            id="cooking_time"
                            value={this.state.cooking_time}
                            onChange={this.handleChange}
                            type="number"
                        />
                    </div>
                    <button disabled={!this.validateForm()} type="submit">
                        Create Meal
                    </button>
                </form>
            </div>
        )
    };
}

NewMeal.propTypes = {
    addFlashMessage: PropTypes.func.isRequired
}

export default connect(null, { addFlashMessage })(NewMeal);