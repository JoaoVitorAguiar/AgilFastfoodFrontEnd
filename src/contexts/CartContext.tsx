import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CartContextProps {
  cartItems: CartItem[];
  addToCart: (item: FoodItem) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  incrementQuantity: (itemId: string) => void;
  decrementQuantity: (itemId: string) => void;
}

interface CartProviderProps {
  children: ReactNode;
}

export interface FoodItem {
  id: string;
  name: string;
  description: string;
  price: number;
  imgUrl: string;
}

interface CartItem extends FoodItem {
  quantity: number;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (item: FoodItem) => {
    const existingItem = cartItems.find((cartItem) => cartItem.id === item.id);

    if (existingItem) {
      setCartItems((prevItems) =>
        prevItems.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems((prevItems) => [...prevItems, { ...item, quantity: 1 }]);
    }
  };

  const removeFromCart = (itemId: string) => {
    setCartItems((prevItems) =>
      prevItems.filter((cartItem) => cartItem.id !== itemId)
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };
  const incrementQuantity = (itemId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      )
    );
  };

  const decrementQuantity = (itemId: string) => {
    setCartItems((prevItems) =>
      prevItems.map((cartItem) =>
        cartItem.id === itemId
          ? { ...cartItem, quantity: cartItem.quantity - 1 }
          : cartItem
      ).filter((cartItem) => cartItem.quantity > 0) // Remover o item se a quantidade for zero ou menos
    );
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart, decrementQuantity, incrementQuantity }}>
      {children}
    </CartContext.Provider>
  );
  
};


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
