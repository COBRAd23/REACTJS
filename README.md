🚀 TechNova Store - E-commerce
ENTREGA 1

Este es el proyecto inicial de e-commerce, construido con React y estilizado usando Tailwind CSS para lograr un look and feel moderno y oscuro.

## 🎨 Estructura de Componentes

- **NavBar**: Barra de navegación con logo, enlaces y CartWidget
- **CartWidget**: Ícono del carrito de compras con un contador
- **ProductCard**: Componente para mostrar productos individuales
- **Home**: Página principal con catálogo de productos
- **Cart**: Página del carrito de compras
- **Footer**: Pie de página con información legal

## 🛠️ Tecnologías

- React 19
- Vite
- React Router (HashRouter para GitHub Pages)
- Tailwind CSS
- Context API para manejo de estado del carrito

## 🧭 Estructura y Convenciones

- **Context (global state)**: Todo lo relacionado al carrito (añadir, remover, limpiar, totales) está centralizado en `src/context/CartContext.jsx` y consumido a través del hook `src/context/useCart.js`.
- **Notificaciones**: Las notificaciones globales se manejan desde `src/App.jsx` y se exponen con `src/context/useNotification.js`; el componente visual está en `src/components/Notification.jsx`.
- **Contenedor vs Presentacional**: `ItemListContainer.jsx` solo se encarga de obtener datos (fetch simulado) y manejar la lógica; `ItemList.jsx` (presentacional) solo renderiza la UI usando `Cards.jsx`. `ItemDetailContainer.jsx` obtiene el producto y (`ItemDetail.jsx`) lo muestra.

## 📝 Características

- ✅ Carrito de compras funcional
- ✅ Catálogo de 12 productos
- ✅ Ordenamiento de productos
- ✅ Notificaciones de acciones
- ✅ Diseño responsive

## 🚀 Ejecutar el proyecto (desarrollo)

1. Instala dependencias:

```bash
npm install
```

2. Ejecuta el servidor de desarrollo:

```bash
npm run dev
```

3. Abre tu navegador en `http://localhost:5174/`.

## 🔧 Notas de desarrollo

- Para agregar/editar productos, edita `src/data/mockProducts.js`.
- Para revisar el estado del carrito, inspecciona `src/context/CartContext.jsx` y usa el hook `useCart()` en componentes.
- Los contenedores `ItemListContainer.jsx` y `ItemDetailContainer.jsx` usan Promises simuladas para fetch con delay para imitar latencia real.


🚀 TechNova Store - E-commerce
ENTREGA 2

## 📝 Características de los Ajustes Segun Consigna del TP

Pagina de Producto mas detalles
Galerias de Imagenes
Correccion de errores
Preferencias de Busqueda 

Añadí rutas y navegación: 
App.jsx ahora incluye rutas para /:, /category/:category, /product/:id, /cart y * (404).

Creé contenedores asíncronos:
ItemListContainer.jsx — lee useParams() y obtiene productos con una Promise + retardo (filtra por categoría).
ItemDetailContainer.jsx — obtiene producto por id con Promise + retardo y usa el contexto para agregar al carrito.

Creé componentes de presentación:
ItemDetail.jsx — muestra detalles y usa ItemCount.
ItemCount.jsx — selector de cantidad + botón Agregar.
Hero.jsx — mantuve el hero visual (antes estaba en ItemListContainer).
NotFound.jsx — página 404.

Actualicé:
ProductCard.jsx — ahora enlaza a la ruta de detalle (/product/:id).
NavBar.jsx — usa Link para navegar por categorías (genera slugs compatibles).
Home.jsx — ahora usa Hero para evitar conflicto de nombres.
