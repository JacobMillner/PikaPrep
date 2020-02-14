import React, { Component } from 'react';
import { message } from 'antd';
import { authService } from '../../Services/AuthService';

class Logout extends Component {
    constructor(props) {
        super(props);
        // just logout the user and push back to home
        authService.logout();
        message.success("Logout Successful!");
        this.props.history.push('/');
        // TODO: fix this hack
        window.location.reload(false);
    }

    render() {
        return (
            <p>goodbye!</p>
        )
    };
}

export default Logout;