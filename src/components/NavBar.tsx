// src/components/NavBar.tsx
import React, { useEffect, useState} from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logout, getUser, isAuthenticated } from '../services/authService';
import logo from '../img/logo.png'
import cartIcon from '../img/cart-icon.png'
import './NavBar.css'
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';


const NavBar: React.FC = () => {
  const history = useHistory();
  const { user, setUser } = useUser();
  const { cartItems } = useCart();
  // Calcula a quantidade total de itens no carrinho
  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleLogout = () => {
    logout();
    setUser(null);
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
          {cartItems.length > 0 && (
            <Link to="/cart" className='cart'>
              <button>
                <img src={cartIcon} alt="carrinho" />
                <p>({totalQuantity})</p>
              </button>
            </Link>
          )}
          {isAuthenticated() ? (
            <>
              <p>Olá, {user}!</p>
              <button onClick={handleLogout}>Sair</button>
            </>
          ) : (
            <Link to="/login">
              <button>Entrar</button>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
