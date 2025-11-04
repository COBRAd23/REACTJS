import React, { useState } from 'react';
import { mockProducts } from '../data/mockProducts';
import { useCart } from '../context/CartContext';
import Container from '../components/Container';
import ItemListContainer from '../components/ItemListContainer';
import Cards from '../components/Cards';
import Notification from '../components/Notification';

const Home = () => {
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

  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  const welcomeMessage = "Bienvenido a TechNova, tu tienda de tecnología";

  return (
    <main className="min-h-screen pt-12 pb-20">
      <Container>
        <ItemListContainer greeting={welcomeMessage} />
        <Cards
          products={sortedProducts}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          onAddToCart={handleAddToCart}
        />
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
