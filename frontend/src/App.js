import React from 'react';
import {Route} from 'react-router-dom';
import MainNavBar from './Components/MainNavBar/MainNavBar';
import Splash from './Components/Splash/Splash';
import Users from './Components/Users/Users';

function App() {
  return (
    <div>
      <MainNavBar />
      <Route exact path='/' component={Splash} />
      <Route exact path='/users/' component={Users} />
    </div>
  );
}

export default App;
