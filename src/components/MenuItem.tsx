// MenuItem.tsx
import React from 'react';
import { useCart, FoodItem } from '../contexts/CartContext';

interface MenuItemProps {
  item: FoodItem; // Altere as props para receber um item inteiro em vez de propriedades individuais
}
const MenuItem: React.FC<MenuItemProps> = ({ item}) => {
  const { addToCart } = useCart(); // Use o hook useCart para obter a função addToCart
  return (
    <div>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Price: ${item.price.toFixed(2)}</p>
      <button onClick={() => addToCart(item)}>Adicionar ao Carrinho</button>
    </div>
  );
};

export default MenuItem;
