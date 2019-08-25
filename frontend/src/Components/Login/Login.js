import React, { Component } from "react";
import "./Login.css";
import ValidateInput from "../../Validators/login"
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loginAction } from '../../Actions/authActions'

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

  handleSubmit = event => {
    event.preventDefault();
    if (this.isValid()) {

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
          <input
            autoFocus
            id="email"
            type="email"
            value={this.state.email}
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
          Login
      </button>
      </form>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired
}

Login.contextTypes = {
  router: PropTypes.object.isRequired
}

export default connect(null, { loginAction })(Login);
