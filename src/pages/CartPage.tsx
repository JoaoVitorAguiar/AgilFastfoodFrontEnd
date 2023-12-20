import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import '../styles/CartPage.css';
import { isAuthenticated, getToken } from '../services/authService';
import http from '../services/httpService';  // Importe o serviço HTTP
import { Link, Redirect } from 'react-router-dom';
import Price from '../components/Price';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = useCart();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false); 

  const handleCheckout = async () => {
    try {
      const token = getToken();

      if (!token) {
        console.error('Usuário não autenticado');
        return;
      }

      // Lista de itens para o pedido
      const orderItems = cartItems.map(item => ({
        foodId: item.id,
        quantity: item.quantity,
      }));

      // Requisição para finalizar o pedido usando o serviço HTTP
      const response = await http.post('/orders', {
        foods: orderItems,
      });

      if (response.status === 200) {
        console.log('Pedido finalizado com sucesso!');
        clearCart();
        setCheckoutSuccess(true);
      } else {
        console.error('Erro ao finalizar o pedido:', response.statusText);
      }
    } catch (error) {
      console.error('Erro ao finalizar o pedido:', error);
    }
  };

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  if (checkoutSuccess) {
    // Exibe a mensagem após o checkout e redireciona para a página inicial
    return (
      <div className="CheckoutSuccessContainer">
        <p>Pedido finalizado com sucesso!</p>
        <Link to="/">
          <button className="OKButton">OK</button>
        </Link>
      </div>
    );
  }

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
                <Price value={item.price} />
                <div className="QuantityContainer">
                  <span>{`Quantidade: ${item.quantity}`}</span>
                  <div className='QuantityButtonContainer'>
                    <button className="QuantityButton decrement" onClick={() => decrementQuantity(item.id)}>-</button>
                    <button className="QuantityButton increment" onClick={() => incrementQuantity(item.id)}>+</button>
                  </div>
                </div>
                <button className="RemoveButton" onClick={() => removeFromCart(item.id)}>Remover</button>
              </li>
            ))}
          </ul>
          <p className="TotalPrice">Preço total: <Price value={totalPrice} /></p>
          {isAuthenticated() ? (
            <button className="CheckoutButton" onClick={handleCheckout}>Finalizar Pedido</button>
          ) : (
            <p className='EnterTofinalize'>
              Entre para finalizar o pedido
              <Link to="/login">
                <button className="LoginButton">Entrar</button>
              </Link>
            </p>
          )}
          <button className="ClearCartButton" onClick={clearCart}>Esvaziar carrinho</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
