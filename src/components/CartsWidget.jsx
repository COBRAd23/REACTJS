import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

// Icono de carrito de compras
const ShoppingCartIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

const CartWidget = () => {
  const { getTotalItems } = useCart();
  const navigate = useNavigate();
  const itemCount = getTotalItems();

  const handleClick = () => {
    navigate('/cart');
  };

  return (
    <div
      onClick={handleClick}
      className="relative p-2 cursor-pointer transition duration-300 hover:scale-105 bg-gray-100 rounded-lg"
    >
      <ShoppingCartIcon className="w-6 h-6 text-gray-900" />
      {itemCount > 0 && (
        <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-cyan-600 rounded-full min-w-[1.5rem] h-6">
          {itemCount}
        </span>
      )}
    </div>
  );
};

export default CartWidget;
