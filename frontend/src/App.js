import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import MainNavBar from './Components/MainNavBar/MainNavBar';
import FlashMessagesList from './Components/Flash/FlashMessagesList';
import Splash from './Components/Splash/Splash';
import Users from './Components/Users/Users';
import User from './Components/Users/User';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import rootReducer from './Reducers/RootRecuder';

const store = createStore(
  rootReducer,
  compose(
    window.devToolsExtension ? window.devToolsExtensions() : f => f
  )
);

function App() {
  return (
    <Provider store={store}>
      <div>
        <MainNavBar />
        <FlashMessagesList />
        <Route exact path='/' component={Splash} />
        <Route exact path='/login/' component={Login} />
        <Route exact path='/signup/' component={Signup} />
        <Route exact path='/users/' component={Users} />
        <Route exact path='/user/:id' component={User} />
      </div>
    </Provider >
  );
}

export default App;
