import axios from 'axios';

const API = axios.create({
    // TODO change this for deployment
    // baseUrl for our Api
    baseURL: 'http://localhost:8888',
    responseType: 'json'
  });

export default API;