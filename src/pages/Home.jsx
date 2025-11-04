import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/mockProducts';
import { useCart } from '../context/CartContext';
import Container from '../components/Container';
import ProductCard from '../components/ProductCard';
import Notification from '../components/Notification';

// Icono de flecha hacia abajo
const ChevronDown = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"></path>
  </svg>
);

const Home = () => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [notification, setNotification] = useState({
    message: '',
    isVisible: false,
  });
  const [sortOrder, setSortOrder] = useState('Relevancia');

  // Todos los productos para mostrar (12 productos totales)
  const allProducts = [...mockProducts];

  // Ordenar productos
  const sortedProducts = [...allProducts].sort((a, b) => {
    switch (sortOrder) {
      case 'Precio: Menor a Mayor':
        return a.price - b.price;
      case 'Precio: Mayor a Menor':
        return b.price - a.price;
      case 'Más Populares':
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      default:
        return 0;
    }
  });

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification({
      message: `¡El producto "${product.title}" ha sido agregado al carrito!`,
      isVisible: true,
    });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, isVisible: false });
  };

  const welcomeMessage = "Bienvenido a TechNova, tu tienda de tecnología";

  return (
    <main className="min-h-screen pt-12 pb-20">
      <Container>
        {/* Sección Hero / Bienvenida */}
        <div className="text-center py-20 lg:py-32">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Descubre el Futuro
          </h1>
          <h2 className="text-3xl md:text-5xl font-extrabold text-cyan-400 mb-6 leading-snug">
            {welcomeMessage}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Explora nuestra selección de productos destacados, ahora con la opción de ordenamiento por preferencia.
          </p>
          <button
            onClick={() => {
              document.getElementById('productos-destacados')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-8 py-3 bg-cyan-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-cyan-500 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
          >
            Ver Catálogo
          </button>
        </div>

        {/* Sección de Productos Destacados */}
        <div id="productos-destacados" className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h3 className="text-3xl font-bold text-white border-b-2 border-cyan-400 pb-1 inline-block mb-4 sm:mb-0">
              Nuestros Productos Destacados
            </h3>
            <div className="flex items-center text-gray-300">
              <span className="text-sm mr-2 hidden sm:block">Ordenar por:</span>
              <div className="relative">
                <select
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                  className="appearance-none bg-gray-800 border border-gray-700 text-white py-2 pl-3 pr-8 rounded-lg cursor-pointer focus:ring-cyan-500 focus:border-cyan-500 text-sm transition-colors"
                >
                  <option>Relevancia</option>
                  <option>Precio: Menor a Mayor</option>
                  <option>Precio: Mayor a Menor</option>
                  <option>Más Populares</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Grid de Productos - Todas las cards con el mismo tamaño */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 py-10 auto-rows-fr">
            {sortedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={() => handleAddToCart(product)}
              />
            ))}
          </div>
        </div>
      </Container>

      <Notification
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={handleCloseNotification}
      />
    </main>
  );
};

export default Home;
