// src/components/NavBar.tsx
import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logout, getUser, isAuthenticated } from '../services/authService';
import logo from '../img/logo.png'
import './NavBar.css'


const NavBar: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState(getUser());
  const [userData, setUserData] = useState(null);
  const handleLogout = () => {
    // Chame a função de logout do authService
    logout();
    // Redirecione para a página de login ou outra página desejada após o logout
    history.push('/login');
  };

  return (
    <nav className='navbar'>
      <ul>
        <li className='logo'>
        <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </li>
        <li>
          {/* Exibe "Entrar" se não estiver autenticado, ou "Sair" se estiver autenticado */}
          {isAuthenticated() ? (
            <>
              
                {/* Exiba o nome do usuário */}
                <p>Olá, {user}!</p>
              
                <button onClick={handleLogout}>Sair</button>
              
            </>
          ) : (
            <>
              <Link to="/login"> <button>Entrar</button></Link>
            </>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
