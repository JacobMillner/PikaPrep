import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Layout } from 'antd';
import './MainNavBar.css';
import { authService } from '../../Services/AuthService'


function MainNavBar() {

  const [collapsed, setcollapsed] = useState(false);

  const { SubMenu } = Menu;

  const { Sider } = Layout;

  const loggedIn = authService.isLoggedIn();

  const toggleCollapsed = () => {
    setcollapsed(!collapsed);
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Menu.Item key="1">
          <Link to="/">
            <Icon type="home" />
            <span>Home</span>
          </Link>
        </Menu.Item>
        {!loggedIn &&
          <Menu.Item key="2">
            <Link to="/signup">
              <Icon type="user-add" />
              <span>Signup</span>
            </Link>
          </Menu.Item>
        }
        {!loggedIn &&
          <Menu.Item key="3">
            <Link to="/login">
              <Icon type="login" />
              <span>Signin</span>
            </Link>
          </Menu.Item>
        }
        <Menu.Item key="4">
          <Link to="/meals">
            <Icon type="fire" />
            <span>Meals</span>
          </Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/users">
            <Icon type="user" />
            <span>Users</span>
          </Link>
        </Menu.Item>
        {loggedIn &&
          <Menu.Item key="6">
            <Link to="/logout">
              <Icon type="logout" />
              <span>logout</span>
            </Link>
          </Menu.Item>
        }
      </Menu>
    </Sider>
  );
}

export default MainNavBar;