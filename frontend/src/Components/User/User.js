import React, { Component } from 'react';
import axios from 'axios';

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,
        };
    }

    async componentDidMount() {
        const { match: { params } } = this.props;
        const user = (await axios.get(`http://localhost:8888/user/${params.id}`)).data;
        this.setState({
            user: user.data
        });
    }

    render() {
        const { user } = this.state;
        if (user === null) return <p>Loading ...</p>;
        return (
            <div className="container">
                <div className="row">
                    <div className="jumbotron col-12">
                        <h1 className="display-3">{user.username}</h1>
                        <p className="lead">{user.description}</p>
                        <hr className="my-4" />
                        <img src={"https://www.gravatar.com/avatar/" + user.gravatar + "?d=robohash"} alt="profile pic" />
                    </div>
                </div>
                <button>Follow</button>
                <button>Unfollow</button>
            </div>
        )
    }
}

export default User;