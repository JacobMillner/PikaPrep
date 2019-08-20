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
            <div className="flex-container">
                {this.state.users === null && <p>Loading users...</p>}
                {
                    this.state.users && this.state.users.map(user => (
                        <div key={user.username} className="eggplant">
                            <Link to={`/users/${user.username}`} className="eggplant">
                                <div className="flex-card">
                                    <div className="card-body">
                                        <img src={"https://www.gravatar.com/avatar/" + user.gravatar + "?d=robohash"} alt="profile pic" />
                                        <h4 className="card-title">{user.username}</h4>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))
                }
            </div>
        )
    }
}

export default Users;