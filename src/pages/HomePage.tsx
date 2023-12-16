// src/pages/HomePage.tsx
import React, { useEffect, useState } from 'react';
import MenuItem from '../components/MenuItem';
import '../styles/HomePage.css'
import axios from 'axios';

interface Food {
  name: string;
  description: string;
  price: number;
}

const HomePage: React.FC = () => {
  const [menuItems, setMenuItems] = useState<Food[]>([]);

  useEffect(() => {
    // Faz a requisição à API quando o componente é montado
    axios.get('http://localhost:3333/foods/list')
      .then(response => {
        setMenuItems(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter lista de alimentos:', error);
      });
  }, []); // O array vazio como segundo argumento garante que o efeito é executado apenas uma vez, equivalente ao componentDidMount

  return (
    <div className="container">
      <h2>Welcome to our Fast Food Catalog</h2>
      <div className="menu">
        {menuItems.map((item, index) => (
          <div key={index} className="menu-item">
            <MenuItem {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
