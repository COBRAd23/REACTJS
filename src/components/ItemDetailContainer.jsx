import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { mockProducts } from '../data/mockProducts';
import ItemDetail from './ItemDetail';
import { useCart } from '../context/CartContext';

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

  useEffect(() => {
    setLoading(true);
    fetchProductById(id).then((p) => {
      setProduct(p);
      setLoading(false);
    });
  }, [id]);

  const handleAdd = (quantity) => {
    if (!product) return;
    // We add the product `quantity` times (or adapt cart to accept quantity)
    for (let i = 0; i < quantity; i++) addToCart(product);
    navigate('/cart');
  };

  if (loading) return <div className="py-20 text-center text-white">Cargando producto...</div>;
  if (!product) return <div className="py-20 text-center text-white">Producto no encontrado.</div>;

  return <ItemDetail product={product} onAdd={handleAdd} />;
};

export default ItemDetailContainer;
