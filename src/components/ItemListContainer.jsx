import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Cards from './Cards';
import { mockProducts } from '../data/mockProducts';
import { useCart } from '../context/useCart';

// Helper to create a slug from category strings
const slugify = (str) =>
  String(str)
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/[^a-z0-9-]/g, '');

const fetchProducts = (categorySlug) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!categorySlug) return resolve([...mockProducts]);
      const filtered = mockProducts.filter((p) => slugify(p.category) === categorySlug);
      resolve(filtered);
    }, 500);
  });
};

const ItemListContainer = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    setLoading(true);
    fetchProducts(category).then((res) => {
      setProducts(res);
      setLoading(false);
    });
  }, [category]);

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  if (loading) return <div className="py-20 text-center text-white">Cargando productos...</div>;

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Cards products={products} onAddToCart={handleAddToCart} sortOrder={'Relevancia'} onSortChange={() => {}} />
      </div>
    </section>
  );
};

export default ItemListContainer;
