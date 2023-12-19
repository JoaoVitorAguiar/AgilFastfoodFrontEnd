import React from 'react';
import { useCart, FoodItem } from '../contexts/CartContext';
import Price from './Price'; // Certifique-se de que o caminho esteja correto

interface MenuItemProps {
  item: FoodItem; 
}

const MenuItem: React.FC<MenuItemProps> = ({ item }) => {
  const { addToCart } = useCart(); 

  return (
    <div className='menu-item-content'>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <Price value={item.price} />
      <button className='addToCard' onClick={() => addToCart(item)}>Adicionar ao Carrinho</button>
    </div>
  );
};

export default MenuItem;
