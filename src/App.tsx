// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import OrderHistoryPage from './pages/OrderHistoryPage';



const App: React.FC = () => {
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/cart" component={CartPage} /> 
        <Route path="/order-history" component={OrderHistoryPage} />
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
};

export default App;
