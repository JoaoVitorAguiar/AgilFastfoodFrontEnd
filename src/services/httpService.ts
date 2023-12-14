// src/services/httpService.ts
import axios from 'axios';
import { getToken } from './authService';

const API_URL = 'http://localhost:3333'; // Substitua pela URL da sua API

const http = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

http.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default http;
