import PropTypes from 'prop-types';
import Cards from './Cards';

const ItemList = ({ products, sortOrder, onSortChange, onAddToCart }) => {
  return (
    <Cards
      products={products}
      sortOrder={sortOrder}
      onSortChange={onSortChange}
      onAddToCart={onAddToCart}
    />
  );
};

ItemList.propTypes = {
  products: PropTypes.array.isRequired,
  sortOrder: PropTypes.string,
  onSortChange: PropTypes.func,
  onAddToCart: PropTypes.func,
};

ItemList.defaultProps = {
  sortOrder: 'Relevancia',
  onSortChange: () => {},
  onAddToCart: () => {},
};

export default ItemList;
