  
import API, { SetAuthorizationToken } from '../Util/api'
import jwtDecode from 'jwt-decode';
import { SET_CURRENT_USER } from './types';

export function setCurrentUser(user) {
  return {
    type: SET_CURRENT_USER,
    user
  };
}

export function logout() {
  return dispatch => {
    localStorage.removeItem('jwtToken');
    SetAuthorizationToken(false);
    dispatch(setCurrentUser({}));
  }
}

export function login(data) {
  return dispatch => {
    return API.post('/login', data).then(res => {
      const token = res.data.token;
      localStorage.setItem('jwtToken', token);
      SetAuthorizationToken(token);
      dispatch(setCurrentUser(jwtDecode(token)));
    });
  }
}