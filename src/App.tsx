// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import NavBar from './components/NavBar';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import HomePage from './pages/HomePage';
import CartPage from './pages/CartPage';
import OrderHistoryPage from './pages/OrderHistoryPage';
import Footer from './components/Footer';
import AdminPage from './pages/AdminPage';
import './App.css';
import { useUser } from './contexts/UserContext';



const App: React.FC = () => {
  const { user, isAdmin } = useUser();
  return (
    <Router>
      <NavBar />
      <Switch>
        <Route path="/login" component={LoginPage} />
        <Route path="/register" component={RegisterPage} />
        <Route path="/cart" component={CartPage} /> 
        <Route path="/order-history" component={OrderHistoryPage} />
        <Route path="/admin">
          {isAdmin ? <AdminPage /> : <Redirect to="/login" />}
        </Route>
        {isAdmin && <Redirect from="/" to="/admin" />}
        <Route path="/" component={HomePage} />
        <Route path="/" component={HomePage} />
      </Switch>
      <Footer />
    </Router>
  );
};

export default App;
