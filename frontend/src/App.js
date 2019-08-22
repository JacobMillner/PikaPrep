import React from 'react';
import axios from "axios";
import {Route} from 'react-router-dom';
import MainNavBar from './Components/MainNavBar/MainNavBar';
import Splash from './Components/Splash/Splash';
import Users from './Components/Users/Users';
import User from './Components/User/User';
import Login from './Components/Login/Login';

function App() {

  // TODO change this for deployment
  // baseUrl for our Api
  axios.defaults.baseUrl = 'http://localhost:8888';

  return (
    <div>
      <MainNavBar />
      <Route exact path='/' component={Splash} />
      <Route exact path='/login/' component={Login} />
      <Route exact path='/users/' component={Users} />
      <Route exact path='/user/:id' component={User} />
    </div>
  );
}

export default App;
