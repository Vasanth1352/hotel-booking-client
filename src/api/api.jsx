import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000', // Your Node.js backend
});

export default API;
