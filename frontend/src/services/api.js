import axios from 'axios';

const api = axios.create({
    baseURL: 'https://omnistack8-di.herokuapp.com/'
});

export default api;
