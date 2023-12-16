import React, { useState} from 'react';
import { useHistory, Link } from 'react-router-dom';
import { login } from '../services/authService';
import '../styles/LoginPage.css';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const history = useHistory();

  const handleLogin = async () => {
    try {
      // Chame a função de login do authService
      const { token } = await login({ email, password });

      // Salve o token JWT no armazenamento local ou em cookies
      localStorage.setItem('token', token);

      // Redirecione para a página inicial ou outra página desejada após o login
      history.push('/');
      window.location.reload(); 
    } catch (error) {
      console.error('Erro de login', error);
      setError('Erro ao realizar o login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form>
        
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <p className='register'>Não tem uma conta? <Link to="/register">Cadastrar-se</Link></p>
        <button type="button" onClick={handleLogin}>
          Entrar
        </button>
      </form>
      {error && <p className="error-message">{error}</p>}
      
    </div>
  );
};

export default LoginPage;