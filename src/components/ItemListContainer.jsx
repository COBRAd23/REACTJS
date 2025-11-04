import React from 'react';

const ItemListContainer = ({ greeting }) => {
  const welcomeMessage = greeting || "Bienvenido a TechNova, tu tienda de tecnología";

  return (
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
  );
};

export default ItemListContainer;
