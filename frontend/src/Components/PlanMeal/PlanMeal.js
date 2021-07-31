import React, { Component } from 'react';
import API from '../../Util/api';
import { authService } from '../../Services/AuthService';
import { DatePicker, Button } from 'antd';

class PlanMeal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meal: null,
      date: null,
    };
  }

  async componentDidMount() {
    const {
      match: { params },
    } = this.props;
    const meal = (await API.get(`/meals/${params.id}`)).data;
    this.setState({
      meal: meal.data,
    });
  }

  getPostData = () => {
    return {
      data: {
        meal: this.state.meal.id,
        date: this.state.date,
        user: authService.getCurrentUser(),
      },
    };
  };

  handleSubmit = (event) => {
    event.preventDefault();
    let tokenStr = authService.getJwt();
    API.post('/mealEntry', this.getPostData(), {
      headers: {
        Authorization: `Bearer ${tokenStr}`,
      },
    }).then((res) => {
      console.log('Meal Entry Created: ', res);
      let user = authService.getCurrentUser();
      console.log('User: ', user);
      this.props.history.push(`/calendar/${user.id}`);
    });
  };

  changeDate = (date) => {
    this.setState({
      date: date.format('YYYY-MM-DD HH:mm:ss'),
    });
  };

  render() {
    return (
      <div>
        <h1>Plan Meal</h1>
        <div>
          Date of meal:
          <DatePicker id="date" onChange={this.changeDate} />
          <div>
            <Button onClick={this.handleSubmit}>Plane Meal</Button>
          </div>
        </div>
      </div>
    );
  }
}

export default PlanMeal;
