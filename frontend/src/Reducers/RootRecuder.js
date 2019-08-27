import {combineReducers} from 'redux';
import flashMessages from './FlashMessages'
import auth from './auth'

const rootReducer = combineReducers({
  flashMessages,
  auth
});

export default rootReducer;