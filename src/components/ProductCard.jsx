import React from 'react';

// Icono para el botón "Agregar al Carrito"
const ShoppingBagIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

const ProductCard = ({ product, onAddToCart }) => {
  const { title, category, stock, price, imageUrl, description } = product;

  const handleAddToCart = () => {
    onAddToCart();
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl transition duration-500 ease-in-out transform hover:scale-[1.02] hover:shadow-cyan-500/30 w-full flex flex-col h-full">
      <div className="relative h-48 bg-gray-800 flex items-center justify-center overflow-hidden">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=400&fit=crop';
          }}
        />
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <p className="text-xs font-semibold text-cyan-400 mb-1 uppercase tracking-wider">
          {category}
        </p>
        <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 min-h-[3.5rem]">
          {title}
        </h3>
        <p className="text-sm text-gray-400 mb-4 h-12 overflow-hidden line-clamp-2 flex-grow">
          {description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-extrabold text-white">${price}</span>
          <span className={`text-sm font-medium ${stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
            Stock: {stock} unidades
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={stock === 0}
          className="w-full flex items-center justify-center px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-500 transition-all duration-300 ease-in-out disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:translate-y-[-2px] focus:outline-none focus:ring-4 focus:ring-cyan-500/50 mt-auto"
        >
          <ShoppingBagIcon className="mr-2" />
          {stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
