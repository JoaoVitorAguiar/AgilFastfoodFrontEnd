import React, { useState } from 'react';
import http from '../services/httpService';
import '../styles/AdminPage.css'

const AdminPage: React.FC = () => {
  const [foodName, setFoodName] = useState('');
  const [foodDescription, setFoodDescription] = useState('');
  const [foodPrice, setFoodPrice] = useState('');
  const [imgUrl, setImgUrl] = useState(''); 

  const handleAddFood = async () => {
    // Verifica se todos os campos estão preenchidos
    if (!foodName || !foodDescription || !foodPrice || !imgUrl) { 
      alert("Por favor, preencha todos os campos.");
      return;
    }
  
    // Verifica se o preço é um número válido
    const price = parseFloat(foodPrice);
    if (isNaN(price)) {
      alert("Por favor, insira um preço válido.");
      return;
    }
  
    try {
      const response = await http.post('/foods/create', {
        name: foodName,
        description: foodDescription,
        price: price,
        imgUrl: imgUrl 
      });
  
      if (response.status === 200) {
        console.log('Lanche adicionada com sucesso!');
        alert("Lanche adicionado com sucesso!");
      } else {
        console.log('Erro ao adicionar Lanche.');
        alert("Erro ao adicionar lanche. Por favor, tente novamente.");
      }
    } catch (error) {
      console.error('Erro ao fazer a requisição:', error);
    }
  
    setFoodName('');
    setFoodDescription('');
    setFoodPrice('');
    setImgUrl(''); 
  };
  return (
    <div className="admin-page">
      <h2>Página de Administração</h2>
      <h3>Adicione Lanches</h3>
      <div className="add-food-form">
      
        <input required type="text" value={foodName} onChange={(e) => setFoodName(e.target.value)} placeholder='Nome da lanche' />
       
        <input required type="text" value={foodDescription} onChange={(e) => setFoodDescription(e.target.value)} placeholder='Descrição da lanche' />
       
        <input required type="number" value={foodPrice} onChange={(e) => setFoodPrice(e.target.value)} placeholder='Preço' />

        <input required type="text" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} placeholder='URL da Imagem' /> 

        <button onClick={handleAddFood}>Adicionar lanche</button>
      </div>
    </div>
  );
};

export default AdminPage;
