import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../Util/api';
import { Card, Row } from 'antd';

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
      users: users.data,
    });
  }

  render() {
    return (
      <div>
        <Row type="flex" justify="space-between">
          {this.state.users === null && <p>Loading users...</p>}
          {this.state.users &&
            this.state.users.map((user) => (
              <Link to={`/user/${user.id}`}>
                <Card
                  size="small"
                  hoverable
                  style={{ width: 120 }}
                  cover={
                    <img
                      src={
                        'https://www.gravatar.com/avatar/' +
                        user.gravatar +
                        '?d=robohash'
                      }
                      alt="profile"
                    />
                  }
                >
                  <Meta title={user.username} />
                </Card>
              </Link>
            ))}
        </Row>
      </div>
    );
  }
}

export default Users;
