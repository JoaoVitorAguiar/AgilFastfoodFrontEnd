import React, { useEffect, useState } from 'react';
import http from '../services/httpService';
import { isAuthenticated, getToken } from '../services/authService';
import '../styles/OrderHistoryPage.css';
import Price from '../components/Price';

interface Order {
  id: string;
  userId: string;
  created_at: string;
  updated_at: string;
  user: {
    id: string;
    cpf: string | null;
    fullName: string;
    email: string;
    phone: string | null;
    zipCode: string | null;
    state: string | null;
    city: string | null;
    neighborhood: string | null;
    address: string | null;
    number: string | null;
    complement: string | null;
    isAdmin: boolean;
    created_at: string;
    updated_at: string;
  };
  foods: {
    orderId: string;
    foodId: string;
    quantity: number;
    food: {
      id: string;
      name: string;
      price: number;
    };
  }[];
}

const OrderHistoryPage: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = getToken();

        if (!token || !isAuthenticated()) {
          console.error('Usuário não autenticado');
          return;
        }

        const response = await http.get('/orders', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status === 200) {
          // Para cada pedido, buscar detalhes de comida
          const ordersWithFoodDetails = await Promise.all(
            response.data.map(async (order: Order) => {
              const foodDetails = await Promise.all(
                order.foods.map(async (foodItem) => {
                  const foodResponse = await http.get(`/foods/show/${foodItem.foodId}`);
                  return {
                    ...foodItem,
                    food: foodResponse.data,
                  };
                })
              );

              return {
                ...order,
                foods: foodDetails,
              };
            })
          );

          setOrders(ordersWithFoodDetails);
        } else {
          console.error('Erro ao obter histórico de pedidos:', response.statusText);
        }
      } catch (error) {
        console.error('Erro ao obter histórico de pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="OrderHistoryContainer">
      <h2 className="Title">Histórico de Pedidos</h2>
      {loading ? (
        <p>Carregando...</p>
      ) : (
        <ul className="OrderList">
          {orders.map((order) => (
            <li className="OrderItem" key={order.id}>
              <div className="OrderDetails">
                <p><strong>Pedido </strong>{`#${order.id}`}</p>
                <p><strong>Data de Criação</strong>:{` ${new Date(order.created_at).toLocaleString()}`}</p>
                <p><strong>Comidas pedidas</strong>:</p>
                <ul>
                  {order.foods.map((foodItem) => (
                    <li key={foodItem.foodId}>
                        <strong>{`- ${foodItem.food.name}`}</strong>
                      {`, Quantidade: ${foodItem.quantity}, `}
                      <Price value={foodItem.food.price} />
                    </li>
                  ))}
                </ul>
                <p><strong>Total: </strong> <Price value={order.foods.reduce((total, foodItem) => total + foodItem.food.price * foodItem.quantity, 0)} /></p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default OrderHistoryPage;
