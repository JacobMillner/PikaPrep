import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Users extends Component {
    constructor(props) {
        super(props);

        this.state = {
            users: null,
        };
    }

    async componentDidMount() {
        const users = (await axios.get('http://localhost:8888/users')).data;
        console.log(users)
        this.setState({
            users: users.data
        });
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    {this.state.users === null && <p>Loading users...</p>}
                    {
                        this.state.users && this.state.users.map(user => (
                            <div key={user.username} className="col-sm-12 col-md-4 col-lg-3">
                                <Link to={`/users/${user.username}`}>
                                    <div className="card text-white bg-success mb-3">
                                        <div className="card-header">UserName: {user.username}</div>
                                        <div className="card-body">
                                            <h4 className="card-title">{user.email}</h4>
                                        </div>
                                    </div>
                                </Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}

export default Users;