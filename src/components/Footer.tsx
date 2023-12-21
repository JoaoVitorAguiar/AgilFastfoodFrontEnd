import React from 'react';
import './Footer.css'; 

const Footer: React.FC = () => {
  return (
    <footer className="footer">
      <div className='options'>
        <a href="#home">Home</a>
        <a href="#about">Sobre nós</a>
        <a href="#contact">Contato</a>
      </div>
      <div>
        © 2023 UX Software - Todos os direitos reservados
      </div>
</footer>
  );
};

export default Footer;
