import React, { Component } from 'react';
import API from '../../Util/api';
import { authService } from '../../Services/AuthService';
import { Button, Input, Form, Icon } from 'antd';

class NewMeal extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      description: '',
      photo_url: '',
      recipe_url: '',
      calories: '',
      carbs: '',
      fat: '',
      protein: '',
      servings: '',
      cooking_time: '',
    };
  }

  handleChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  getPostData = () => {
    return {
      data: {
        meal: this.state,
        user: authService.getCurrentUser(),
      },
    };
  };

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('Jwt: ', authService.getJwt());
    let tokenStr = authService.getJwt();
    API.post('/meals', this.getPostData(), {
      headers: {
        Authorization: `Bearer ${tokenStr}`,
      },
    }).then((res) => {
      console.log(res);
      this.props.history.push('/meals');
    });
  };

  validateForm() {
    return (
      this.state.name.length > 0 &&
      this.state.recipe_url.length > 0 &&
      this.state.photo_url.length > 0
    );
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <Form.Item>
          <Input
            prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
            placeholder="Name"
            id="name"
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="read" style={{ color: 'rgba(0,0,0,.25)' }} />}
            id="description"
            placeholder="Description"
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="link" style={{ color: 'rgba(0,0,0,.25)' }} />}
            id="recipe_url"
            placeholder="Recipe Url"
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={
              <Icon type="picture" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            id="photo_url"
            placeholder="Picture Url"
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="gold" style={{ color: 'rgba(0,0,0,.25)' }} />}
            id="calories"
            placeholder="Calories"
            type="number"
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="coffee" style={{ color: 'rgba(0,0,0,.25)' }} />}
            id="carbs"
            placeholder="Carbs"
            type="number"
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="smile" style={{ color: 'rgba(0,0,0,.25)' }} />}
            id="fat"
            placeholder="Fat"
            type="number"
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="rocket" style={{ color: 'rgba(0,0,0,.25)' }} />}
            id="protein"
            placeholder="Protein"
            type="number"
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={<Icon type="number" style={{ color: 'rgba(0,0,0,.25)' }} />}
            id="servings"
            placeholder="Servings"
            type="number"
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={
              <Icon type="clock-circle" style={{ color: 'rgba(0,0,0,.25)' }} />
            }
            id="cooking_time"
            placeholder="Cooking Time"
            type="number"
            onChange={this.handleChange}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            New Meal
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default NewMeal;
