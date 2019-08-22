import React, { Component } from "react";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { sendFlashMessage } from '../Action/Action';
import API from '../../Util/api';

class Signup extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: "",
            password: "",
            username: ""
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
                user: this.state
            }
        }
    }

    handleSubmit = event => {
        event.preventDefault();

        API.post('/user', this.getPostData())
            .then((res) => {
                console.log(res);
                this.props.sendFlashMessage('You win!', 'alert-success');
                this.props.history.push('/');
            });
    }

    validateForm() {
        return this.state.email.length > 0
            && this.state.password.length > 0
            && this.state.username.length > 0;
    }


    render() {
        return (

            <div className="Signup">
                <form onSubmit={this.handleSubmit}>
                    <div id="email">
                        <label>Email</label>
                        <input
                            autoFocus
                            id="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div id="username">
                        <label>Username</label>
                        <input
                            id="username"
                            type="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div id="password">
                        <label>Password</label>
                        <input
                            id="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </div>
                    <button disabled={!this.validateForm()} type="submit">
                        Signup
                    </button>
                </form>
            </div>
        )
    };
}

const mapPropsToDispatch = (dispatch) => {
    return bindActionCreators({ sendFlashMessage }, dispatch);
};

export default connect(null, mapPropsToDispatch)(Signup);  