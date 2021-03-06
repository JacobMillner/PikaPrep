import React, { Component } from "react";
import API from '../../Util/api';
import { Button, Input, Form, Icon, message } from 'antd';

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
                message.success("User created!");
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
            <Form onSubmit={this.handleSubmit}>
                <Form.Item>
                    <Input
                        prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Email"
                        id="email"
                        onChange={this.handleChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        placeholder="Username"
                        id="username"
                        onChange={this.handleChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Input
                        prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                        type="password"
                        placeholder="Password"
                        id="password"
                        onChange={this.handleChange}
                    />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Signup
                    </Button>
                </Form.Item>
            </Form>
        )
    };
}

export default Signup;
