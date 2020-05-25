import React, { useContext, useState } from "react";
import "./Login.css";
import API from "../../Util/api";
import { Button, Input, Form, Icon, message } from "antd";
import { LoggedInContext } from "../../Context/is-logged-in-context";

const FlipLogin = () => {};

const Login = props => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loggedIn, setLoggedIn] = useContext(LoggedInContext);

  const updateEmail = event => {
    console.log(event.target.value);
    setEmail(event.target.value);
  };

  const updatePassword = event => {
    setPassword(event.target.value);
  };

  const getPostData = () => {
    return {
      data: {
        user: {
          email: email,
          password: password
        }
      }
    };
  };

  const handleSubmit = async event => {
    event.preventDefault();
    console.log("starting submit");
    console.log(getPostData());
    API.post("/login", getPostData())
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
        // TODO: find a way to navigate from functional component
        //this.props.history.push("/");

        // just logout the user and push back to home
        setLoggedIn(!loggedIn);
      })
      .catch(res => {
        message.error("Username or password incorrect." + res);
      });
  };
  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item>
        <Input
          prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="Email"
          id="email"
          onChange={updateEmail}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="Password"
          id="password"
          onChange={updatePassword}
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Log in
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;
