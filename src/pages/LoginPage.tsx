// src/pages/LoginPage.tsx
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      const { data } = await axios.post('/api/login', { email, password });
      // Salve o token JWT no armazenamento local ou em cookies
      localStorage.setItem('token', data.token);
      history.push('/');
    } catch (error) {
      console.error('Erro de login', error);
      // Trate o erro de login aqui
    }
  };

  return (
    <div>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button onClick={handleLogin}>Login</button>
    </div>
  );
};

export default LoginPage;
