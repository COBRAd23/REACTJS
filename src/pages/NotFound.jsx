// React import not required with new JSX transform
import { Link } from 'react-router-dom';

const NotFound = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
    <div className="text-center">
      <h1 className="text-6xl font-extrabold mb-4">404</h1>
      <p className="text-xl mb-6">Página no encontrada. El enlace puede estar mal formateado.</p>
      <Link to="/" className="px-6 py-3 bg-cyan-600 rounded-lg">Volver al inicio</Link>
    </div>
  </div>
);

export default NotFound;
