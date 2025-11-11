// React import not required with new JSX transform
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useCart } from '../context/CartContext';
import Container from '../components/Container';

// Iconos
const PlusIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const MinusIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const TrashIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6"></polyline>
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
  </svg>
);

const Cart = ({ onConfirmPurchase, onCancelPurchase }) => {
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart, getTotalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const totalPrice = getTotalPrice();

  const handleConfirm = () => {
    if (onConfirmPurchase) {
      onConfirmPurchase();
    }
    clearCart();
  };

  const handleCancel = () => {
    if (onCancelPurchase) {
      onCancelPurchase();
    }
    clearCart();
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-950 pt-24 pb-20">
        <Container>
          <div className="text-center py-20">
            <h1 className="text-4xl font-bold text-white mb-4">Tu Carrito está Vacío</h1>
            <p className="text-gray-400 mb-8">Agrega algunos productos para comenzar</p>
            <button
              onClick={() => navigate('/')}
              className="px-8 py-3 bg-cyan-600 text-white font-bold text-lg rounded-xl shadow-lg hover:bg-cyan-500 transition duration-300 transform hover:scale-105"
            >
              Volver al Catálogo
            </button>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 pt-24 pb-20">
      <Container>
        <h1 className="text-4xl font-bold text-white mb-8">Mi Carrito de Compras</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Lista de Productos */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-gray-900 rounded-xl p-6 shadow-2xl flex flex-col md:flex-row gap-4"
              >
                {/* Imagen */}
                <div className="w-full md:w-32 h-32 bg-gray-800 rounded-lg flex items-center justify-center flex-shrink-0">
                  {(() => {
                    const fallback = 'https://placehold.co/600x400/161b22/8b949e?text=TechNova';
                    const mainImg = (item && item.images && item.images.length && item.images[0]) || item.imageUrl || fallback;
                    return (
                      <img
                        src={mainImg}
                        alt={item.title}
                        className="w-full h-full object-cover rounded-lg"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src = fallback;
                        }}
                      />
                    );
                  })()}
                </div>

                {/* Información del Producto */}
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold text-cyan-400 mb-1 uppercase tracking-wider">
                      {item.category}
                    </p>
                    <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                    <p className="text-sm text-gray-400 mb-4">{item.description}</p>
                  </div>

                  {/* Controles de Cantidad y Precio */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-lg font-bold text-white">${item.price}</span>
                      
                      {/* Controles de Cantidad */}
                      <div className="flex items-center gap-2 bg-gray-800 rounded-lg p-1">
                        <button
                          onClick={() => decreaseQuantity(item.id)}
                          className="p-1 text-cyan-400 hover:text-cyan-300 hover:bg-gray-700 rounded transition-colors"
                          aria-label="Disminuir cantidad"
                        >
                          <MinusIcon />
                        </button>
                        <span className="text-white font-semibold min-w-[2rem] text-center">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => increaseQuantity(item.id)}
                          className="p-1 text-cyan-400 hover:text-cyan-300 hover:bg-gray-700 rounded transition-colors"
                          aria-label="Aumentar cantidad"
                        >
                          <PlusIcon />
                        </button>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-xl font-bold text-white">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-gray-700 rounded transition-colors"
                        aria-label="Eliminar producto"
                      >
                        <TrashIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Resumen de Compra */}
          <div className="lg:col-span-1">
            <div className="bg-gray-900 rounded-xl p-6 shadow-2xl sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">Resumen de Compra</h2>
              
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-gray-300">
                  <span>Productos ({cartItems.reduce((sum, item) => sum + item.quantity, 0)})</span>
                  <span className="font-semibold">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-700 pt-4">
                  <div className="flex justify-between text-white text-xl font-bold">
                    <span>Total</span>
                    <span className="text-cyan-400">${totalPrice.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <button
                  onClick={handleConfirm}
                  className="w-full px-6 py-3 bg-cyan-600 text-white font-bold rounded-xl shadow-lg hover:bg-cyan-500 transition duration-300 transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-cyan-500/50"
                >
                  Confirmar Compra
                </button>
                <button
                  onClick={handleCancel}
                  className="w-full px-6 py-3 bg-gray-700 text-white font-bold rounded-xl shadow-lg hover:bg-gray-600 transition duration-300 focus:outline-none focus:ring-4 focus:ring-gray-500/50"
                >
                  Cancelar Compra
                </button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Cart;

Cart.propTypes = {
  onConfirmPurchase: PropTypes.func,
  onCancelPurchase: PropTypes.func,
};

Cart.defaultProps = {
  onConfirmPurchase: undefined,
  onCancelPurchase: undefined,
};
