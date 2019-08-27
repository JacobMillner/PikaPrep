import React from 'react';
import { Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { createStore, compose, applyMiddleware } from 'redux';
import MainNavBar from './Components/MainNavBar/MainNavBar';
import FlashMessagesList from './Components/Flash/FlashMessagesList';
import Splash from './Components/Splash/Splash';
import Users from './Components/Users/Users';
import User from './Components/Users/User';
import Login from './Components/Login/Login';
import Signup from './Components/Signup/Signup';
import NewMeal from './Components/Meals/NewMeal';
import Meal from './Components/Meals/Meal';
import Meals from './Components/Meals/Meals';
import rootReducer from './Reducers/RootRecuder';

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk),
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
        <Route exact path='/meals/' component={Meals} />
        <Route exact path='/meals/:id(\d+)' component={Meal} />
        <Route exact path='/meals/new' component={NewMeal} />
      </div>
    </Provider >
  );
}

export default App;
