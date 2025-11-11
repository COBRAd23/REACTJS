import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import ItemCount from './ItemCount';

const ItemDetail = ({ product, onAdd }) => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (!product) return;
    const gallery = product.images && product.images.length ? product.images : [product.imageUrl];
    setSelectedImage(gallery[0] || null);
  }, [product]);

  if (!product) return <div className="py-20 text-center text-white">Producto no encontrado.</div>;

  const { title, description, longDescription, price, stock, imageUrl, images, category, colors } = product;
  const slugify = (str) =>
    String(str)
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '');
  const categorySlug = category ? slugify(category) : '';
  const gallery = images && images.length ? images : [imageUrl];

  return (
    <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl p-6 mt-8">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="md:w-1/2 bg-gray-800 rounded-lg overflow-hidden flex flex-col items-center justify-center">
          <div className="w-full h-72 bg-gray-800 flex items-center justify-center overflow-hidden rounded-lg">
            <img src={selectedImage} alt={title} className="w-full h-full object-cover" onError={(e)=>{e.target.onerror=null;e.target.src='https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop&q=80'}} />
          </div>
          <div className="mt-3 flex gap-3">
            {gallery.slice(0,4).map((src, idx) => (
              <button key={idx} onClick={() => setSelectedImage(src)} className={`w-16 h-12 overflow-hidden rounded-md border ${selectedImage===src? 'border-cyan-400':'border-gray-700'}`}>
                <img src={src} alt={`thumb-${idx}`} className="w-full h-full object-cover" onError={(e)=>{e.target.onerror=null;e.target.src='https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&h=400&fit=crop&q=80'}} />
              </button>
            ))}
          </div>
        </div>
        <div className="md:w-1/2 text-white flex flex-col">
          <p className="text-sm text-cyan-400 uppercase font-semibold mb-2">{category}</p>
          <h2 className="text-2xl font-bold mb-3">{title}</h2>
          <p className="text-gray-300 mb-4">{description}</p>
          {longDescription && <p className="text-gray-400 mb-4">{longDescription}</p>}
          {colors && colors.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-gray-300 mb-1">Colores disponibles:</p>
              <div className="flex gap-2">
                {colors.map((c) => (
                  <span key={c} className="px-2 py-1 bg-gray-800 border border-gray-700 rounded text-sm text-white">{c}</span>
                ))}
              </div>
            </div>
          )}
          <div className="flex items-center justify-between mb-4">
            <span className="text-2xl font-extrabold">${price}</span>
            <span className={`text-sm font-medium ${stock > 0 ? 'text-green-400' : 'text-red-400'}`}>Stock: {stock}</span>
          </div>
          <div className="mt-auto flex items-center gap-4">
            <ItemCount stock={stock} initial={1} onAdd={onAdd} />
            <button onClick={() => navigate(categorySlug ? `/category/${categorySlug}` : '/')} className="px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg">Volver al catálogo</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetail;

ItemDetail.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    description: PropTypes.string,
    longDescription: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
    stock: PropTypes.number,
    imageUrl: PropTypes.string,
    images: PropTypes.arrayOf(PropTypes.string),
    category: PropTypes.string,
    colors: PropTypes.arrayOf(PropTypes.string),
  }),
  onAdd: PropTypes.func,
};

ItemDetail.defaultProps = {
  product: null,
  onAdd: undefined,
};
