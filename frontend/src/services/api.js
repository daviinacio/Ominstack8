import axios from 'axios';

const api = axios.create({
    baseURL: 'https://api-daviapps.herokuapp.com/'
});

export default api;