import React, { Component, useContext, useEffect } from "react";
import "./Login.css";
import ValidateInput from "../../Validators/login";
import API, { SetAuthorizationToken } from "../../Util/api";
import { Button, Input, Form, Icon, message } from "antd";
import { LoggedInContext } from "../../Context/is-logged-in-context";

const FlipLogin = () => {
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);
  // just logout the user and push back to home
  setLoggedIn(!loggedIn);
};

class Login extends Component {
  constructor(props) {
    super(props);

    // redirect to home if already logged in
    // TODO

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
  };

  getPostData = () => {
    return {
      data: {
        user: {
          email: this.state.email,
          password: this.state.password
        }
      }
    };
  };

  handleSubmit = event => {
    event.preventDefault();
    console.log("starting submit");
    console.log(this.getPostData());
    this.setState({ errors: {} });
    API.post("/login", this.getPostData())
      .then(res => {
        console.log("Login Response:");
        console.log(res.data);
        const token = res.data.data.jwt;
        const user = res.data.data.user;
        localStorage.setItem("jwt", token);
        localStorage.setItem("user", JSON.stringify(user));
        // TODO: hash user details before storing?
        message.success("Login successful!");
        FlipLogin();
        this.props.history.push("/");
      })
      .catch(res => {
        message.error("Username or password incorrect." + res);
      });
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          <Input
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
            placeholder="Email"
            id="email"
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
            type="password"
            placeholder="Password"
            id="password"
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
