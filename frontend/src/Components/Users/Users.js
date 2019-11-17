import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../Util/api';
import { Card } from 'antd';

const { Meta } = Card;

class Users extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: null,
        };
    }

    async componentDidMount() {
        const users = (await API.get('/users')).data;
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
                        <Link to={`/user/${user.id}`}>
                            <Card
                                hoverable
                                style={{ width: 240 }}
                                cover={<img src={"https://www.gravatar.com/avatar/" + user.gravatar + "?d=robohash"} alt="profile pic"  />}>
                                <Meta title={user.username} />
                            </Card>
                        </Link>
                    ))
                }
            </div>
        )
    }
}

export default Users;