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
        © 2023 Alan Araújo Engenharia de Telecomunicações
      </div>
</footer>
  );
};

export default Footer;
