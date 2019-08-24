import axios from 'axios';

const API = axios.create({
    // TODO change this for deployment
    // baseUrl for our Api
    baseURL: 'http://localhost:8888',
    responseType: 'json'
  });

export default API;

export function SetAuthorizationToken(token) {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
}