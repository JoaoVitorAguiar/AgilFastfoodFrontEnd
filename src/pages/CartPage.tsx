// src/pages/CartPage.tsx
import React from 'react';
import { useCart } from '../contexts/CartContext';
import '../styles/CartPage.css'
import { isAuthenticated } from '../services/authService';
import { Link } from 'react-router-dom';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = useCart();
  const handleCheckout = () => {
    // Lógica para finalizar o pedido (pode ser redirecionamento para uma página de checkout)
    console.log('Pedido finalizado!');
  };
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="CartContainer">
      <h2 className="Title">Seu carrinho</h2>
      {cartItems.length === 0 ? (
        <p className="EmptyCartMessage">Seu carrinho está vazio</p>
      ) : (
        <>
          <ul className="CartList">
            {cartItems.map((item) => (
              <li className="CartItem" key={item.id}>
                <span>{item.name}</span>
                <span>{`$${item.price.toFixed(2)}`}</span>
                <div className="QuantityContainer">
                  <span>{`Quantity: ${item.quantity}`}</span>
                  <div className='QuantityButtonContainer'>
                    <button className="QuantityButton decrement" onClick={() => decrementQuantity(item.id)}>-</button>
                    <button className="QuantityButton increment" onClick={() => incrementQuantity(item.id)}>+</button>
                  </div>
                </div>
                <button className="RemoveButton" onClick={() => removeFromCart(item.id)}>Remove</button>
              </li>
            ))}
          </ul>
          <p className="TotalPrice">{`Preço total: $${totalPrice.toFixed(2)}`}</p>
          {isAuthenticated() ? (
            <button className="CheckoutButton" onClick={handleCheckout}>Finalizar Pedido</button>
          ) : (
            <Link to="/login">
              <button className="LoginButton">Entrar</button>
            </Link>
          )}
          <button className="ClearCartButton" onClick={clearCart}>Clear Cart</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
