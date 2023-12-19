import React, { useEffect, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { logoutBeforeRegister, register } from '../services/authService';
import InputMask from 'react-input-mask';
import '../styles/RegisterPage.css';
import axios from 'axios';

const RegisterPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [cpf, setCpf] = useState('');
  const [phone, setPhone] = useState('');
  const [zipCode, setZipCode] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [neighborhood, setNeighborhood] = useState('');
  const [address, setAddress] = useState('');
  const [number, setNumber] = useState('');
  const [complement, setComplement] = useState('');
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
        cpf: cpf,
        phone: phone,
        zipCode: zipCode,
        state: state,
        city: city,
        neighborhood: neighborhood,
        address: address,
        number: number,
        complement: complement,
      });
  
      setError(null);
      setSuccess(true);
      history.push('/login')
    } catch (error: any) {
      console.error('Erro de registro', error);
  
      if (error.response) {
        if (error.response.status === 409) {
          if(error.message === 'User already registered'){
            setError('Email já cadastrado.');
          }
          if(error.message === 'CPF already registered'){
            setError('CPF já cadastrado.');
            alert('CPF já cadastrado.');
          }
          //alert('CPF já cadastrado.');
        } else {
          setError(`Erro ao registrar. Código de status: ${error.response.status}`);
        }
      } else {
        console.log(error.response);
        setError('Erro ao registrar. Por favor, verifique suas credenciais.');
      }
    }
    
  };

  const handleCepChange = async (e: any) => {
    setZipCode(e.target.value);
  
    if (e.target.value.length === 9) { // Verifica se o CEP tem 9 caracteres (incluindo o '-')
      try {
        const response = await axios.get(`https://viacep.com.br/ws/${e.target.value}/json/`);
        const { logradouro, bairro, localidade, uf } = response.data;
  
        setAddress(logradouro);
        setNeighborhood(bairro);
        setCity(localidade);
        setState(uf);
      } catch (error) {
        console.error('Erro ao buscar CEP', error);
      }
    }
  };

  return (
    <div className="register-container">
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
          <InputMask
            mask="999.999.999-99"
            value={cpf}
            onChange={(e) => setCpf(e.target.value)}
            placeholder="CPF"
          />
          <div className='phone-zipCode'>
            <InputMask
              mask="(99) 99999-9999"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Telefone"
            />
           <InputMask
            mask="99999-999"
            value={zipCode}
            onChange={handleCepChange}
            placeholder="CEP"
          />
          </div>
          
          <select
          value={state}
          onChange={(e) => setState(e.target.value)}
        >
          <option value="">Selecione um estado</option>
          <option value="AC">Acre</option>
          <option value="AL">Alagoas</option>
          <option value="AP">Amapá</option>
          <option value="AM">Amazonas</option>
          <option value="BA">Bahia</option>
          <option value="CE">Ceará</option>
          <option value="DF">Distrito Federal</option>
          <option value="ES">Espírito Santo</option>
          <option value="GO">Goiás</option>
          <option value="MA">Maranhão</option>
          <option value="MT">Mato Grosso</option>
          <option value="MS">Mato Grosso do Sul</option>
          <option value="MG">Minas Gerais</option>
          <option value="PA">Pará</option>
          <option value="PB">Paraíba</option>
          <option value="PR">Paraná</option>
          <option value="PE">Pernambuco</option>
          <option value="PI">Piauí</option>
          <option value="RJ">Rio de Janeiro</option>
          <option value="RN">Rio Grande do Norte</option>
          <option value="RS">Rio Grande do Sul</option>
          <option value="RO">Rondônia</option>
          <option value="RR">Roraima</option>
          <option value="SC">Santa Catarina</option>
          <option value="SP">São Paulo</option>
          <option value="SE">Sergipe</option>
          <option value="TO">Tocantins</option>
        </select>
        <div className='city-neighborhood'>
        <input 
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Cidade"
          />
          <input
            type="text"
            value={neighborhood}
            onChange={(e) => setNeighborhood(e.target.value)}
            placeholder="Bairro"
          />
        </div>
          
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Endereço"
          />
          <input
            type="text"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
            placeholder="Número"
          />
          <input
            type="text"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
            placeholder="Complemento"
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