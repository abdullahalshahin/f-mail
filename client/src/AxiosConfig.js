import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000';

const AxiosConfig = axios.create({
    baseURL: BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

AxiosConfig.interceptors.request.use((config) => {
    const auth_customer_token = localStorage.getItem('auth_customer_token');

    if (auth_customer_token) {
        config.headers.Authorization = `Bearer ${auth_customer_token}`;
    }
    
    return config;
},
(error) => {
    return Promise.reject(error);
});

export default AxiosConfig;
