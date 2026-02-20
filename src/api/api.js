import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

export const api = axios.create({
    baseURL: API_BASE_URL,
});

// Add request interceptor for logging in development
if (import.meta.env.DEV) {
    api.interceptors.request.use(
        (config) => {
            console.log('API Request:', config.method?.toUpperCase(), config.url);
            return config;
        },
        (error) => Promise.reject(error)
    );

    api.interceptors.response.use(
        (response) => {
            console.log('API Response:', response.status, response.config.url);
            return response;
        },
        (error) => {
            console.error('API Error:', error.response?.status, error.config?.url);
            return Promise.reject(error);
        }
    );
}