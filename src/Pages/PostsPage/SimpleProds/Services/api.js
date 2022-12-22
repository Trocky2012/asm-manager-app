import axios from 'axios';

//https://sujeitoprogramador.com/r-api/?api=filmes

const api = axios.create({
  // baseURL: 'http://localhost:8080/'
  // baseURL: 'http://192.168.0.111:8080/'

  // baseURL: 'http://192.168.0.14:8080/'

  // baseURL: 'https://asm-manager.herokuapp.com/'
  baseURL: 'https://timing-control.herokuapp.com/'

});

export default api;