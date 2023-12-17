import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { logoutBeforeRegister, register } from '../services/authService';
import '../styles/RegisterPage.css';

const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const history = useHistory();
  
  useEffect(() => {
    logoutBeforeRegister();
  }, []);

  const handleRegister = async (event: React.MouseEvent) => {
    event.preventDefault(); // Previne o envio do formulário
    try {
      if (password !== passwordConfirmation) {
        setError('As senhas não coincidem.');
        return;
      }
  
      await register({
        fullName: fullName,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      });
  
      setError(null);
      setSuccess(true);
      history.push('/login')
    } catch (error) {
      console.error('Erro de registro', error);
      setError('Erro ao registrar. Por favor, verifique suas credenciais.');
    }
  };

  return (
    <div className="login-container">
      <h2>Cadastro</h2>
        <form>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Nome Completo"
          />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
          />
          <input
            type="password"
            value={passwordConfirmation}
            onChange={(e) => setPasswordConfirmation(e.target.value)}
            placeholder="Confirmar Senha"
          />
          <p className="register">
            Já tem uma conta? <Link to="/login">Entrar</Link>
          </p>
          <button onClick={handleRegister}>Cadastrar</button>

          {error && <p className="error-message">{error}</p>}
        </form>
    </div>
  );
};

export default RegisterPage;
