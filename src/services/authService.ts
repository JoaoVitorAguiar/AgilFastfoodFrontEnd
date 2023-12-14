// src/services/authService.ts
import axios from 'axios';
import http from './httpService'; 

const API_URL = 'http://localhost:3333'; // Substitua pela URL da sua API

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  fullName: string;
  email: string;
  password: string;
  password_confirmation: string;
}

export const login = async (data: LoginData) => {
  const response = await axios.post(`${API_URL}/sessions/create`, data);
  if (response.data.token) {
    localStorage.setItem('token', response.data.token);
  }
  return response.data;
};

export const register = async (data: RegisterData) => {
    try {
      // Validar campos obrigatórios
      if (!data.fullName || !data.email || !data.password || !data.password_confirmation) {
        throw new Error('Todos os campos são obrigatórios.');
      }
      console.log(data)
      const response = await http.post('/users/create', data); // Usar o serviço http aqui
      
      return response.data;
    } catch (error) {
      // Se houver um erro, rejeitar a promessa para que a chamada de registro possa lidar com isso
      if (axios.isAxiosError(error) && error.response) {
        console.log(error)
        return Promise.reject(error.response.data);
      } else {
        return Promise.reject('Erro desconhecido');
      }
    }
};
  
  

export const getToken = () => {
  return localStorage.getItem('token');
};
