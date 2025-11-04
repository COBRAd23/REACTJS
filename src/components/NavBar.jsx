import React from 'react';
import { useNavigate } from 'react-router-dom';
import CartWidget from './CartsWidget';

// Icono del rayito (Zap) para el logo
const ZapIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

const NavBar = () => {
  const navigate = useNavigate();
  const navLinks = ['PCS & LAPTOPS', 'TABLETS', 'ACCESORIOS', 'OFERTAS FLASH'];
  const linkClass = 'text-gray-300 hover:text-cyan-400 transition-colors duration-200 cursor-pointer text-sm font-medium uppercase tracking-wider';

  return (
    <header className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-sm shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div
          onClick={() => navigate('/')}
          className="flex items-center space-x-2 cursor-pointer"
        >
          <ZapIcon className="w-6 h-6 text-cyan-400" />
          <span className="text-xl font-bold text-white tracking-widest">TechNova Store</span>
        </div>
        <nav className="hidden md:flex space-x-6 lg:space-x-8">
          {navLinks.map((link) => (
            <a key={link} href="#" className={linkClass}>
              {link}
            </a>
          ))}
        </nav>
        <div className="flex items-center space-x-4">
          <CartWidget />
          <button className="md:hidden text-white">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default NavBar;
