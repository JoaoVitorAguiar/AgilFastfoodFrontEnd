import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { logoutBeforeRegister, register } from '../services/authService';
import '../styles/RegisterPage.css'


const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Chama a função de deslogar antes do registro quando o componente é montado
    logoutBeforeRegister();
  }, []); // O array vazio indica que este efeito só será executado uma vez, quando o componente é montado

  
  const history = useHistory();

  const handleRegister = async () => {
    try {
      if (password !== passwordConfirmation) {
        setError('As senhas não coincidem.');
        return;
      }
      //alert(`${fullName} ${email} ${password} ${passwordConfirmation}`);
      await register({
        fullName: fullName,
        email: email,
        password: password,
        password_confirmation: passwordConfirmation,
      });

      // Atualize o estado de erro e exiba na interface do usuário
      setError(null);
      setFullName('');

      // Se o registro for bem-sucedido, redirecione para a página de login ou outra página desejada
      history.push('/login');
      window.location.reload();   
    } catch (error) {
      console.error('Erro de registro', error);
      // Atualize o estado de erro e exiba na interface do usuário
      setError('Erro ao registrar. Por favor, verifique suas credenciais.');
    }
  };

  return (
    <div className="login-container">
      <h2>Cadastro</h2>
      <form>
       
        <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder='Nome Completo' />
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder='Email'  />
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Senha' />
        <input
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
          placeholder='Confirmar Senha' 
        />
        {/* Adicione um link para a página de login */}
      <p className="register">Já tem uma conta? <Link to="/login">Entrar</Link></p>
        <button onClick={handleRegister}>Cadastrar</button>

        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default RegisterPage;
