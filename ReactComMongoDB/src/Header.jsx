import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom'; // Importa useNavigate
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
  const navRef = useRef(null);
  const indicatorRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate(); // Inicializa useNavigate

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
    // Aqui você pode adicionar lógica para limpar dados de autenticação
    localStorage.removeItem('authToken');
    navigate('/'); // Redireciona para a página de login
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
        
        {/* Adiciona o botão de Logout */}
        <button className="bt-sair-header" onClick={handleLogout}>Sair</button>
          </div>
    </nav>
  );
};

export default Header;
