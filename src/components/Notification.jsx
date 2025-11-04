import React, { useEffect } from 'react';

// Icono de chequeo para la Notificación
const CheckCircleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

// Icono de cancelación
const XCircleIcon = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10"></circle>
    <line x1="15" y1="9" x2="9" y2="15"></line>
    <line x1="9" y1="9" x2="15" y2="15"></line>
  </svg>
);

const Notification = ({ message, isVisible, onClose, type = 'success' }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  const isSuccess = type === 'success';
  const borderColor = isSuccess ? 'border-cyan-400' : 'border-red-400';
  const iconColor = isSuccess ? 'text-cyan-400' : 'text-red-400';
  const title = isSuccess ? '¡Éxito!' : type === 'cancel' ? 'Compra Cancelada' : 'Aviso';

  return (
    <div
      className={`fixed top-4 right-4 z-[100] p-4 bg-gray-800 border-l-4 ${borderColor} rounded-lg shadow-2xl transition-opacity duration-500`}
      style={{ opacity: isVisible ? 1 : 0 }}
      role="alert"
    >
      <div className="flex items-start">
        {isSuccess ? (
          <CheckCircleIcon className={`w-6 h-6 ${iconColor} mr-3 mt-1 flex-shrink-0`} />
        ) : (
          <XCircleIcon className={`w-6 h-6 ${iconColor} mr-3 mt-1 flex-shrink-0`} />
        )}
        <div className="flex-1">
          <p className="text-lg font-semibold text-white">{title}</p>
          <p className="text-sm text-gray-300">{message}</p>
        </div>
        <button
          onClick={onClose}
          className="ml-4 -mr-1 -mt-1 p-1 rounded-full text-gray-500 hover:text-white hover:bg-gray-700 transition-colors"
          aria-label="Cerrar notificación"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Notification;
