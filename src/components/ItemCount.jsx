import React, { useState } from 'react';

const ItemCount = ({ stock = 0, initial = 1, onAdd }) => {
  const [count, setCount] = useState(initial);

  const increment = () => setCount((c) => Math.min(c + 1, stock));
  const decrement = () => setCount((c) => Math.max(c - 1, 1));

  return (
    <div className="flex items-center space-x-3">
      <div className="flex items-center border border-gray-700 rounded-lg overflow-hidden">
        <button onClick={decrement} className="px-3 py-2 bg-gray-800 text-white">-</button>
        <div className="px-4 py-2 text-white">{count}</div>
        <button onClick={increment} className="px-3 py-2 bg-gray-800 text-white">+</button>
      </div>
      <button
        onClick={() => onAdd(count)}
        disabled={stock === 0}
        className="px-4 py-2 bg-cyan-600 text-white rounded-lg disabled:bg-gray-600"
      >
        Agregar
      </button>
    </div>
  );
};

export default ItemCount;
