import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css';
import logo from './images/logo.png';

// Componente NavItem
const NavItem = ({ label, isActive, onClick, to }) => (
  <Link
    to={to}
    className={`nav-item ${isActive ? 'is-active' : ''}`}
    onClick={onClick}
  >
    {label}
  </Link>
);

// Componente Header
const Header = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [avatar, setAvatar] = useState(localStorage.getItem('userAvatar') || "https://via.placeholder.com/40"); // Carrega o avatar do localStorage ou usa o padrão
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate(); 

  const navItems = [
    { label: 'Cadastrar Aluno', to: '/cadastrar' },
    { label: 'Alunos Matriculados', to: '/alunos' },
    { label: 'Cadastrar Promoção', to: '/cadastrar-promocao' },
    { label: 'Promoções', to: '/promocoes' }
  ];

  useEffect(() => {
    const currentIndex = navItems.findIndex(item => item.to === location.pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }

    const navItemsElements = navRef.current.querySelectorAll('.nav-item');
    const activeItem = navItemsElements[activeIndex];

    if (activeItem && indicatorRef.current) {
      const { offsetLeft, offsetWidth } = activeItem;
      indicatorRef.current.style.transform = `translateX(${offsetLeft}px)`;
      indicatorRef.current.style.width = `${offsetWidth}px`;
    }
  }, [location.pathname, activeIndex, navItems]);

  const handleLogout = () => {
    // Limpa os dados de autenticação e do avatar no localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('userAvatar'); // Remove a imagem de avatar
    navigate('/'); // Redireciona para a página de login
  };

  const userEmail = localStorage.getItem('userEmail'); // Recupera o email do localStorage

  // Função para trocar o avatar
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        setAvatar(base64Image); // Atualiza o avatar no estado
        localStorage.setItem('userAvatar', base64Image); // Armazena o avatar no localStorage
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <nav className="nav" ref={navRef}>
      {/* Logo no canto esquerdo */}
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>

      <div className="nav-items">
        {navItems.map((item, index) => (
          <NavItem
            key={index}
            label={item.label}
            to={item.to}
            isActive={index === activeIndex}
            onClick={() => setActiveIndex(index)}
          />
        ))}
        <span className="nav-indicator" ref={indicatorRef} />

        {/* Exibe o email ao lado do avatar */}
        <div className="user-info">
          {/* Input para selecionar a imagem */}
          <input
            type="file"
            accept="image/*"
            id="avatarInput"
            style={{ display: 'none' }}
            onChange={handleAvatarChange}
          />
          {/* Avatar clicável */}
          <img
            src={avatar} // Exibe o avatar atual
            alt="Avatar"
            className="avatar"
            onClick={() => document.getElementById('avatarInput').click()} // Ao clicar no avatar, abre o input de arquivo
          />
          <span className="user-email">{userEmail}</span> {/* Exibe o email */}
        </div>

        {/* Adiciona o botão de Logout */}
        <button className="bt-sair-header" onClick={handleLogout}>Sair</button>
      </div>
    </nav>
  );
};

export default Header;
