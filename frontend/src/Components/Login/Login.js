import React, { Component } from "react";
import "./Login.css";
import ValidateInput from "../../Validators/login"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginAction } from '../../Actions/authActions'
import { Button, Input } from 'antd';

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
    if (this.isValid()) {
      this.setState({ errors: {} });
      this.props.loginAction(this.getPostData()).then(
        (res) => this.context.router.push('/'),
        (err) => this.setState({ errors: err.response.data.errors })
      );
    }
  }

  isValid() {
    const { errors, isValid } = ValidateInput(this.state);

    if (!isValid) {
      this.setState({ errors })
    }

    return isValid;
  }

  render() {
    const { errors, username, password } = this.state;
    return (
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
        <div id="password">
          <label>Password</label>
          <Input
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
            type="password"
          />
        </div>
        <Button type="primary" disabled={!this.validateForm()}>
          Login
        </Button>
      </form>
    );
  }
}

Login.propTypes = {
  loginAction: PropTypes.func.isRequired
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(null, { loginAction })(Login);
