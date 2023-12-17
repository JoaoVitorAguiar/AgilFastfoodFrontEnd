// src/components/NavBar.tsx
import React, { useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logout, getUser, isAuthenticated } from '../services/authService';
import logo from '../img/logo.png'
import cartIcon from '../img/cart-icon.png'
import './NavBar.css'
import { useCart } from '../contexts/CartContext';


const NavBar: React.FC = () => {
  const history = useHistory();
  const [user, setUser] = useState(getUser());
  const [userData, setUserData] = useState(null);
  const { cartItems } = useCart();
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
        {cartItems.length > 0 && ( // Adicione esta condição para mostrar o indicador do carrinho apenas quando houver itens no carrinho
          <>
            {/* Adicione um indicador para o carrinho de compras */}
            <Link to="/cart" className='cart'>
              <button> <img src={cartIcon} alt="carrinho" /> <p>({cartItems.length})</p></button> {/* Exiba o número de itens no carrinho */}
              
            </Link>
          </>
        )}
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
