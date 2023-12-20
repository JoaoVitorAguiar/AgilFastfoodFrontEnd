import React from 'react';
import { useCart, FoodItem } from '../contexts/CartContext';
import Price from './Price'; 

interface MenuItemProps {
  item: FoodItem; 
  imgUrl: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ item, imgUrl }) => {
  const { addToCart } = useCart(); 

  return (
    <div className='menu-item' style={{ backgroundImage: `url(${imgUrl})` }}>
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <Price value={item.price} />
      <button className='addToCard' onClick={() => addToCart(item)}>Adicionar ao Carrinho</button>
    </div>
  );
};

export default MenuItem;
