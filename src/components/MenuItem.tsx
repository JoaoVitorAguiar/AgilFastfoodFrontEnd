// MenuItem.tsx
import React from 'react';

interface MenuItemProps {
  name: string;
  description: string;
  price: number;
}

const MenuItem: React.FC<MenuItemProps> = ({ name, description, price }) => {
  return (
    <div>
      <h3>{name}</h3>
      <p>{description}</p>
      <p>Price: ${price.toFixed(2)}</p>
      {/* Adicione mais detalhes ou botões de ação, se necessário */}
    </div>
  );
};

export default MenuItem;
