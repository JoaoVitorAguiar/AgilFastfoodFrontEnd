// src/pages/CartPage.tsx
import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import '../styles/CartPage.css';
import { isAuthenticated, getToken } from '../services/authService';
import http from '../services/httpService';  // Importe o serviço HTTP
import { Link, Redirect } from 'react-router-dom';
import Price from '../components/Price';

const CartPage: React.FC = () => {
  const { cartItems, removeFromCart, clearCart, incrementQuantity, decrementQuantity } = useCart();
  const [checkoutSuccess, setCheckoutSuccess] = useState(false); // Novo estado para controlar a exibição da mensagem
  const [sliderValue, setSliderValue] = useState(50); // Novo estado para o valor do controle deslizante

  const handleCheckout = async () => {
    try {
      const token = getToken();

      if (!token) {
        // Trate o caso em que o token não está presente (usuário não autenticado)
        console.error('Usuário não autenticado');
        return;
      }

      // Construa a lista de itens para o pedido
      const orderItems = cartItems.map(item => ({
        foodId: item.id,
        quantity: item.quantity,
      }));

      // Crie a solicitação para finalizar o pedido usando o serviço HTTP
      const response = await http.post('/orders', {
        foods: orderItems,
        // Outros campos do pedido, se necessário
      });

      if (response.status === 200) {
        console.log('Pedido finalizado com sucesso!');
        // Atualize o estado para exibir a mensagem
        clearCart();
        setCheckoutSuccess(true);
        // Pode adicionar lógica adicional aqui, se necessário
      } else {
        console.error('Erro ao finalizar o pedido:', response.statusText);
        // Trate o erro de acordo (pode ser exibindo uma mensagem para o usuário, etc.)
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
