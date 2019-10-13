import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, Icon, Layout } from 'antd';
import './MainNavBar.css';


function MainNavBar() {

    const [collapsed, setcollapsed] = useState(false);

    const { SubMenu } = Menu;

    const { Sider } = Layout;
    
    const toggleCollapsed = () => {
        setcollapsed(!collapsed);
    };

    return (
        <Sider collapsible collapsed={collapsed} onCollapse={toggleCollapsed}>
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={
                <span>
                  <Icon type="user" />
                  <span>User</span>
                </span>
              }
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={
                <span>
                  <Icon type="team" />
                  <span>Team</span>
                </span>
              }
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="9">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        // <nav>
        //     <ul className="menu">
        //         <li className="logo"><Link to="/">Pika Prep</Link></li>
        //         <li className="item"><Link to="/meals/">Meals</Link></li>
        //         <li className="item"><Link to="/users/">Users</Link></li>
        //         <li className="item button"><Link to="/login">Log In</Link></li>
        //         <li className="item button secondary"><Link to="/signup">Sign Up</Link></li>
        //     </ul>
        // </nav>
    );
}

export default MainNavBar;