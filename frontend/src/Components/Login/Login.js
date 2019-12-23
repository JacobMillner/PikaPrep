import React, { Component } from "react";
import "./Login.css";
import ValidateInput from "../../Validators/login"
import API, { SetAuthorizationToken } from '../../Util/api'
import { Button, Input, Form, Icon } from 'antd';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  validateForm() {
    return this.state.email.length > 0 && this.state.password.length > 0;
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
        user: {
          email: this.state.email,
          password: this.state.password
        }
      }
    }
  }

  handleSubmit = event => {
    event.preventDefault();
    console.log("starting submit");
    console.log(this.getPostData());
    this.setState({ errors: {} });
    API.post('/login', this.getPostData()).then(res => {
      console.log(res);
      const token = res.data.token;
      const userId = res.data.userId;
      const userName = res.data.userName;
      const email = res.data.email;
      localStorage.setItem('jwtToken', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('userName', userName);
      localStorage.setItem('email', email);
      // TODO: hash user details before storing
      SetAuthorizationToken(token);
      //dispatch(setCurrentUser(jwtDecode(token)));
    });
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Username"
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
            type="password"
            placeholder="Password"
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Log in
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default Login;
