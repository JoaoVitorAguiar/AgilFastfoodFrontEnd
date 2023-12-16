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

interface UserData {
  fullName: string;
  // Adicione outros campos do usuário conforme necessário
}

export const login = async (data: LoginData) => {
  try {
    const response = await http.post(`/sessions`, data);
    const { token, user } = response.data;

    // Salve o token JWT no armazenamento local
    localStorage.setItem('token', token);

    // Salve as informações do usuário no armazenamento local
    localStorage.setItem('user', JSON.stringify(user));
    // Recarregar a página após o login

    return response.data;
  } catch (error: any) {
    // Agora, estamos usando a sintaxe de TypeScript para especificar que 'error' é do tipo 'any'
    throw error.response ? error.response.data : 'Erro desconhecido';
  }
};

export const logout = () => {
  // Limpe as informações de autenticação e do usuário (por exemplo, remova o token e o usuário do armazenamento local)
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  // Recarregar a página após o logout
  window.location.reload(); 
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
  

export const getUser = (): string | null => {
  const userString = localStorage.getItem('user');
  // alert(userString)
  // Verifique se o userString não é null ou undefined antes de chamar JSON.parse
  if (userString) {
    try {
      return JSON.parse(userString);
    } catch (error) {
      console.error('Erro ao analisar JSON de usuário:', error);
      return null;
    }
  }

  return null;
};

export const isAuthenticated = (): boolean => {
  // Verifique se há um token no armazenamento local
  const token = localStorage.getItem('token');
  return !!token;
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const logoutBeforeRegister = async () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};
