import { useState } from 'react';
import { mockProducts } from '../data/mockProducts';
import { useCart } from '../context/useCart';
import { useNotification } from '../context/useNotification';
import Container from '../components/Container';
import Hero from '../components/Hero';
import ItemList from '../components/ItemList';

const Home = () => {
  const { addToCart } = useCart();
  const { showNotification } = useNotification();
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
    showNotification(`¡El producto "${product.title}" ha sido agregado al carrito!`);
  };


  const handleSortChange = (newSortOrder) => {
    setSortOrder(newSortOrder);
  };

  const welcomeMessage = "Bienvenido a TechNova, tu tienda de tecnología";

  return (
    <main className="min-h-screen pt-12 pb-20">
      <Container>
        <Hero greeting={welcomeMessage} />
        <ItemList
          products={sortedProducts}
          sortOrder={sortOrder}
          onSortChange={handleSortChange}
          onAddToCart={handleAddToCart}
        />
      </Container>

      {/* Notifications now handled globally by App */}
    </main>
  );
};

export default Home;
