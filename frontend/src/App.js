import React from 'react';
import { Route } from 'react-router-dom';
import MainNavBar from './Components/MainNavBar/MainNavBar';
import Splash from './Components/Splash/Splash';
import Users from './Components/Users/Users';
import User from './Components/User/User';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';

function App() {
  return (
      <div>
        <MainNavBar />
        <Route exact path='/' component={Splash} />
        <Route exact path='/login/' component={Login} />
        <Route exact path='/signup/' component={Signup} />
        <Route exact path='/users/' component={Users} />
        <Route exact path='/user/:id' component={User} />
      </div>
  );
}

export default App;
