// src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import MenuItem from '../components/MenuItem';
import '../styles/HomePage.css'
import axios from 'axios';
import http from '../services/httpService';

interface Food {
  id: string;
  name: string;
  description: string;
  price: number;
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
      <div className="menu">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            <MenuItem item={item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
