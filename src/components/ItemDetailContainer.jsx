import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useNotification } from '../context/useNotification';
import { mockProducts } from '../data/mockProducts';
import ItemDetail from './ItemDetail';
import { useCart } from '../context/useCart';

const fetchProductById = (id) =>
  new Promise((resolve) => {
    setTimeout(() => {
      const product = mockProducts.find((p) => String(p.id) === String(id));
      resolve(product || null);
    }, 500);
  });

const ItemDetailContainer = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { showNotification } = useNotification();

  useEffect(() => {
    setLoading(true);
    fetchProductById(id).then((p) => {
      setProduct(p);
      setLoading(false);
    });
  }, [id]);

  const handleAdd = (quantity) => {
    if (!product) return;
    // Use the refactored addToCart that accepts quantity
    addToCart(product, quantity);
    if (typeof showNotification === 'function') {
      showNotification(`¡${quantity} x ${product.title} agregado(s) al carrito!`);
    }
    navigate('/cart');
  };

  if (loading) return <div className="py-20 text-center text-white">Cargando producto...</div>;
  if (!product) return <div className="py-20 text-center text-white">Producto no encontrado.</div>;

  return <ItemDetail product={product} onAdd={handleAdd} />;
};

export default ItemDetailContainer;
