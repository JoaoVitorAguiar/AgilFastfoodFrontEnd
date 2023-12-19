import React from 'react';
import { useCart, FoodItem } from '../contexts/CartContext';

interface MenuItemProps {
  item: FoodItem; 
}
const MenuItem: React.FC<MenuItemProps> = ({ item}) => {
  const { addToCart } = useCart(); 
  return (
    <div className='menu-item-content'>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Price: ${item.price.toFixed(2)}</p>
      <button onClick={() => addToCart(item)}>Adicionar ao Carrinho</button>
    </div>
  );
};

export default MenuItem;
