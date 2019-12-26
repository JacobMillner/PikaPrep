import React, { Component } from "react";
import API from '../../Util/api';
import { Button, Input } from 'antd';

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
                        <Input
                            autoFocus
                            id="email"
                            type="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div id="username">
                        <label>Username</label>
                        <Input
                            id="username"
                            type="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                    </div>
                    <div id="password">
                        <label>Password</label>
                        <Input
                            id="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                            type="password"
                        />
                    </div>
                    <Button disabled={!this.validateForm()} type="submit">
                        Signup
                    </Button>
                </form>
            </div>
        )
    };
}

export default Signup;
