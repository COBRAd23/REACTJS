// React import not required with new JSX transform
import ProductCard from './ProductCard';
import PropTypes from 'prop-types';

// Icono de flecha hacia abajo
const ChevronDown = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m6 9 6 6 6-6"></path>
  </svg>
);

const Cards = ({ products, sortOrder, onSortChange, onAddToCart }) => {
  return (
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
              onChange={(e) => onSortChange(e.target.value)}
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
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={() => onAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
};

export default Cards;

Cards.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      title: PropTypes.string,
      category: PropTypes.string,
      stock: PropTypes.number,
      price: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      imageUrl: PropTypes.string,
      images: PropTypes.arrayOf(PropTypes.string),
      description: PropTypes.string,
    })
  ).isRequired,
  sortOrder: PropTypes.string,
  onSortChange: PropTypes.func,
  onAddToCart: PropTypes.func,
};

Cards.defaultProps = {
  sortOrder: 'Relevancia',
  onSortChange: () => {},
  onAddToCart: () => {},
};
