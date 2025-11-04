import React, { useState, useEffect } from 'react';
import { mockProducts } from './data/mockProducts'; // Importamos los datos mockeados

// --- Iconos y Componentes Funcionales (Consolidados para asegurar la carga) ---

// Icono del rayito (Zap) para el logo
const ZapIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
  </svg>
);

// Icono de carrito de compras
const ShoppingCartIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="9" cy="21" r="1"></circle>
    <circle cx="20" cy="21" r="1"></circle>
    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
  </svg>
);

// Icono de flecha hacia abajo
const ChevronDown = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"></path>
  </svg>
);

// Icono para el botón "Agregar al Carrito"
const ShoppingBagIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
    <line x1="3" y1="6" x2="21" y2="6"></line>
    <path d="M16 10a4 4 0 0 1-8 0"></path>
  </svg>
);

// Icono de chequeo para la Notificación
const CheckCircleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

// Componente: CartWidget (src/components/CartsWidget.jsx)
const CartWidget = () => {
  const itemCount = 0; // Inicia en 0 como se solicitó.
  return (
    <div className="relative p-2 cursor-pointer transition duration-300 hover:scale-105">
      <ShoppingCartIcon className="w-6 h-6 text-cyan-400" />
      <span 
        className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-gray-900 transform translate-x-1/2 -translate-y-1/2 bg-cyan-400 rounded-full"
      >
        {itemCount}
      </span>
    </div>
  );
};

// Componente: NavBar (src/components/NavBar.jsx)
const NavBar = () => {
  const navLinks = ['PCS & LAPTOPS', 'TABLETS', 'ACCESORIOS', 'OFERTAS FLASH'];
  const linkClass = "text-gray-300 hover:text-cyan-400 transition-colors duration-200 cursor-pointer text-sm font-medium uppercase tracking-wider";

  return (
    <header className="sticky top-0 z-50 bg-gray-950/90 backdrop-blur-sm shadow-lg border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2 cursor-pointer">
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
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
          </button>
        </div>
      </div>
    </header>
  );
};

// Componente: Notification (src/components/Notification.jsx)
const Notification = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); 
      return () => clearTimeout(timer); 
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div 
      className="fixed top-4 right-4 z-[100] p-4 bg-gray-800 border-l-4 border-cyan-400 rounded-lg shadow-2xl transition-opacity duration-500"
      style={{ opacity: isVisible ? 1 : 0 }} 
      role="alert"
    >
      <div className="flex items-start">
        <CheckCircleIcon className="w-6 h-6 text-cyan-400 mr-3 mt-1 flex-shrink-0" />
        <div>
          <p className="text-lg font-semibold text-white">¡Éxito!</p>
          <p className="text-sm text-gray-300">{message}</p>
        </div>
        <button 
          onClick={onClose}
          className="ml-4 -mr-1 -mt-1 p-1 rounded-full text-gray-500 hover:text-white hover:bg-gray-700 transition-colors"
          aria-label="Cerrar notificación"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        </button>
      </div>
    </div>
  );
};

// Componente: Container (src/components/Container.jsx)
const Container = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

// Componente: ProductCard (src/components/ProductCard.jsx)
const ProductCard = ({ product, onAddToCart }) => {
  const { title, category, stock, price, imageUrl, description } = product;

  const handleAddToCart = () => {
    onAddToCart(title); // Llama a la función que activará la notificación
  };

  return (
    <div className="bg-gray-900 rounded-xl overflow-hidden shadow-2xl transition duration-500 ease-in-out transform hover:scale-[1.02] hover:shadow-cyan-500/30 w-full">
      <div className="relative h-48 bg-gray-800 flex items-center justify-center p-6">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover opacity-30" 
          onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/161b22/8b949e?text=TechNova"; }} 
        />
        <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-3xl font-extrabold text-white opacity-90">TechNova</span>
        </div>
      </div>
      <div className="p-5">
        <p className="text-xs font-semibold text-cyan-400 mb-1 uppercase tracking-wider">{category}</p>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-sm text-gray-400 mb-4 h-12 overflow-hidden">{description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-extrabold text-white">${price}</span>
          <span className={`text-sm font-medium ${stock > 0 ? 'text-green-400' : 'text-red-400'}`}>
            Stock: {stock} unidades
          </span>
        </div>
        <button
          onClick={handleAddToCart}
          disabled={stock === 0}
          className="w-full flex items-center justify-center px-4 py-2 bg-cyan-600 text-white font-semibold rounded-lg shadow-md hover:bg-cyan-500 transition-all duration-300 ease-in-out disabled:bg-gray-600 disabled:cursor-not-allowed transform hover:translate-y-[-2px] focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
        >
          <ShoppingBagIcon className="mr-2" />
          {stock > 0 ? 'Agregar al Carrito' : 'Sin Stock'}
        </button>
      </div>
    </div>
  );
};

// Componente: Cards (src/components/Cards.jsx)
const Cards = ({ products, onAddToCart }) => {
  if (!products || products.length === 0) {
    return <p className="text-gray-400 text-center py-10">No hay productos destacados para mostrar.</p>;
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-10">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          onAddToCart={onAddToCart}
        />
      ))}
    </div>
  );
};

// Componente: ItemListContainer (src/components/ItemListContainer.jsx)
const ItemListContainer = ({ greeting, onAddToCart }) => {
  // Filtramos solo los productos destacados para esta sección
  const featuredProducts = mockProducts.filter(p => p.isFeatured).slice(0, 3);

  return (
    <main className="min-h-screen pt-12 pb-20">
      <Container>
        {/* Sección Hero / Bienvenida */}
        <div className="text-center py-20 lg:py-32">
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Descubre el Futuro
          </h1>
          {/* Uso de props para el mensaje de bienvenida */}
          <h2 className="text-3xl md:text-5xl font-extrabold text-cyan-400 mb-6 leading-snug">
            {greeting}
          </h2>
          <p className="text-lg md:text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
            Explora nuestra selección de productos destacados, ahora con la opción de ordenamiento.
          </p>
          <button className="px-8 py-3 bg-cyan-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-cyan-500 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50">
            Ver Catálogo
          </button>
        </div>

        {/* Sección de Productos Destacados */}
        <div className="mt-16 pt-8 border-t border-gray-800">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
            <h3 className="text-3xl font-bold text-white border-b-2 border-cyan-400 pb-1 inline-block mb-4 sm:mb-0">
              Nuestros Productos Destacados
            </h3>
            <div className="flex items-center text-gray-300">
              <span className="text-sm mr-2 hidden sm:block">Ordenar por:</span>
              <div className="relative">
                <select className="appearance-none bg-gray-800 border border-gray-700 text-white py-2 pl-3 pr-8 rounded-lg cursor-pointer focus:ring-cyan-500 focus:border-cyan-500 text-sm transition-colors">
                  <option>Relevancia</option>
                  <option>Precio: Menor a Mayor</option>
                  <option>Precio: Mayor a Menor</option>
                  <option>Más Populares</option>
                </select>
                <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none"/>
              </div>
            </div>
          </div>
          <Cards products={featuredProducts} onAddToCart={onAddToCart} />
        </div>
      </Container>
    </main>
  );
};

// --- Componente Raíz de la Aplicación (src/App.jsx) ---
const App = () => {
  const [notification, setNotification] = useState({
    message: '',
    isVisible: false,
  });

  // Función pasada como prop a ItemListContainer y ProductCard
  const handleAddToCart = (productName) => {
    setNotification({
      message: `¡El producto "${productName}" ha sido agregado al carrito!`,
      isVisible: true,
    });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, isVisible: false });
  };
  
  // String pasado como prop a ItemListContainer
  const welcomeMessage = "Bienvenido a TechNova, tu tienda de tecnología";

  return (
    <div className="min-h-screen bg-gray-950">
      <NavBar />
      <ItemListContainer 
        greeting={welcomeMessage} 
        onAddToCart={handleAddToCart}
      />
      <Notification
        message={notification.message}
        isVisible={notification.isVisible}
        onClose={handleCloseNotification}
      />
    </div>
  );
};

export default App;
