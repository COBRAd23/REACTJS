import PropTypes from 'prop-types';

const Container = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {children}
    </div>
  );
};

export default Container;

Container.propTypes = {
  children: PropTypes.node,
};

Container.defaultProps = {
  children: null,
};
