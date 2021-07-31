import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import API from '../../Util/api';
import { authService } from '../../Services/AuthService';
import { Card, Row, Button } from 'antd';

const { Meta } = Card;

class Meals extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meals: null,
    };
  }

  async componentDidMount() {
    const meals = (await API.get('/meals')).data;
    this.setState({
      meals: meals.data,
    });
  }

  render() {
    const loggedIn = authService.isLoggedIn();

    return (
      <div>
        {loggedIn && (
          <Link to={'/meals/new'}>
            <Button type="primary">New Meal</Button>
          </Link>
        )}
        <Row type="flex" justify="space-between">
          {this.state.meals === null && <p>Loading meals...</p>}
          {this.state.meals &&
            this.state.meals.map((meal) => (
              <div key={meal.id}>
                <Link to={`/meals/${meal.id}`}>
                  <Card
                    size="small"
                    hoverable
                    style={{ width: 480 }}
                    cover={<img src={meal.photo_url} alt="meal" />}
                  >
                    <Meta title={meal.name} />
                  </Card>
                </Link>
              </div>
            ))}
        </Row>
      </div>
    );
  }
}

export default Meals;
