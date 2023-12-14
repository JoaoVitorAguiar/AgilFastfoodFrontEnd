import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { register } from '../services/authService';

const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState<string | null>(null);
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
      alert("oi")

      // Atualize o estado de erro e exiba na interface do usuário
      setError(null);
      setFullName('');


      // Se o registro for bem-sucedido, redirecione para a página de login ou outra página desejada
      history.push('/login');
    } catch (error) {
      console.error('Erro de registro', error);
      // Atualize o estado de erro e exiba na interface do usuário
      setError('Erro ao registrar. Por favor, verifique suas credenciais.');
    }
  };

  return (
    <div>
      <h2>Registro</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <label>Nome Completo:</label>
      <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} />
      <label>Email:</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <label>Senha:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <label>Confirme a Senha:</label>
      <input
        type="password"
        value={passwordConfirmation}
        onChange={(e) => setPasswordConfirmation(e.target.value)}
      />
      <button onClick={handleRegister}>Registrar</button>
    </div>
  );
};

export default RegisterPage;
