import React, { useEffect, useState } from 'react';
import MenuItem from '../components/MenuItem';
import '../styles/HomePage.css'
import http from '../services/httpService';

interface Food {
  id: string;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
}

const HomePage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<Food[]>([]);
  useEffect(() => {
    http.get('/foods/list')
      .then(response => {
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter lista de alimentos:', error);
      });
  }, []);

  return (
    <div className="container-home">
      <h2>Cardápio</h2>
      <div className="menu">
        {menuItems.map((item) => (
          <MenuItem key={item.id} item={item} imgUrl={item.imgUrl} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;