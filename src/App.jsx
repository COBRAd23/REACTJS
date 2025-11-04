import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Notification from './components/Notification';

const App = () => {
  const [notification, setNotification] = useState({
    message: '',
    isVisible: false,
    type: 'success',
  });

  const handleConfirmPurchase = () => {
    setNotification({
      message: '¡Tu compra ha sido confirmada exitosamente! Recibirás un email de confirmación pronto.',
      isVisible: true,
      type: 'success',
    });
    setTimeout(() => {
      window.location.href = '#/';
    }, 3000);
  };

  const handleCancelPurchase = () => {
    setNotification({
      message: 'La compra ha sido cancelada. Tus productos han sido eliminados del carrito.',
      isVisible: true,
      type: 'cancel',
    });
  };

  const handleCloseNotification = () => {
    setNotification({ ...notification, isVisible: false });
  };

  return (
    <Router>
      <CartProvider>
        <div className="min-h-screen bg-gray-950 flex flex-col">
          <NavBar />
          <div className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route
                path="/cart"
                element={
                  <Cart
                    onConfirmPurchase={handleConfirmPurchase}
                    onCancelPurchase={handleCancelPurchase}
                  />
                }
              />
            </Routes>
          </div>
          <Footer />
          <Notification
            message={notification.message}
            isVisible={notification.isVisible}
            onClose={handleCloseNotification}
            type={notification.type}
          />
        </div>
      </CartProvider>
    </Router>
  );
};

export default App;
