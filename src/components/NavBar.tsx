import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { logout, isAuthenticated, getToken } from '../services/authService';
import logo from '../img/logo.png';
import cartIcon from '../img/cart-icon.png'
import './NavBar.css';
import { useCart } from '../contexts/CartContext';
import { useUser } from '../contexts/UserContext';
import http from '../services/httpService';

const NavBar: React.FC = () => {
  const history = useHistory();
  const { user, setUser, isAdmin } = useUser();
  const { cartItems } = useCart();
  const [hasOrders, setHasOrders] = useState(false);

  useEffect(() => {
    const checkUserOrders = async () => {
      try {
        const token = getToken();

        if (token && isAuthenticated()) {
          const response = await http.get('/orders', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (response.status === 200 && response.data.length > 0) {
            setHasOrders(true);
          }
        }
      } catch (error) {
        console.error('Erro ao verificar pedidos do usuário:', error);
      }
    };

    checkUserOrders();
  }, [user]);

  const handleLogout = () => {
    logout();
    setUser(null);
    setHasOrders(false);
    history.push('/login');
  };

  const totalQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="navbar">
      <ul>
        <li className="logo">
          <Link to="/">
            <img src={logo} alt="Logo" />
          </Link>
        </li>
        <li className="functionalities">
          {!isAdmin && hasOrders && <Link to="/order-history">Pedidos</Link>}
          {!isAdmin && cartItems.length > 0 && (
            <Link to="/cart" className="cart">
              <button>
                <img src={cartIcon} alt="carrinho" />
                <p>({totalQuantity})</p>
              </button>
            </Link>
          )}
          {isAuthenticated() ? (
            <>
              <p>Olá, {user?.split(' ', 1)}!</p>
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
