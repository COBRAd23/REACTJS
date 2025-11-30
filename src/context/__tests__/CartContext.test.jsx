import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect } from 'vitest';
import { CartProvider } from '../CartContext';
import { useCart } from '../useCart';

// Small helper component to interact with the cart for testing
const CartTester = ({ product }) => {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    getTotalItems,
    getTotalPrice,
    increaseQuantity,
    decreaseQuantity,
  } = useCart();

  return (
    <div>
      <div data-testid="count">{getTotalItems()}</div>
      <div data-testid="price">{getTotalPrice()}</div>
      <div data-testid="items">{cartItems.map((i) => `${i.id}:${i.quantity}`).join(',')}</div>
      <button onClick={() => addToCart(product, 1)}>add1</button>
      <button onClick={() => addToCart(product, 3)}>add3</button>
      <button onClick={() => increaseQuantity(product.id)}>inc</button>
      <button onClick={() => decreaseQuantity(product.id)}>dec</button>
      <button onClick={() => removeFromCart(product.id)}>remove</button>
      <button onClick={() => clearCart()}>clear</button>
    </div>
  );
};

describe('CartContext', () => {
  const product = { id: 'p1', title: 'Test', price: 10 };

  it('adds items with quantity and computes totals', async () => {
    render(
      <CartProvider>
        <CartTester product={product} />
      </CartProvider>
    );

    await userEvent.click(screen.getByText('add1'));
    expect(screen.getByTestId('count').textContent).toBe('1');
    expect(screen.getByTestId('price').textContent).toBe('10');

    await userEvent.click(screen.getByText('add3'));
    // Now should have 4 units => 40
    expect(screen.getByTestId('count').textContent).toBe('4');
    expect(screen.getByTestId('price').textContent).toBe('40');
  });

  it('increase/decrease and remove work', async () => {
    render(
      <CartProvider>
        <CartTester product={product} />
      </CartProvider>
    );

    await userEvent.click(screen.getByText('add1'));
    await userEvent.click(screen.getByText('inc'));
    expect(screen.getByTestId('count').textContent).toBe('2');
    await userEvent.click(screen.getByText('dec'));
    expect(screen.getByTestId('count').textContent).toBe('1');
    await userEvent.click(screen.getByText('remove'));
    expect(screen.getByTestId('count').textContent).toBe('0');
  });

  it('clear empties cart', async () => {
    render(
      <CartProvider>
        <CartTester product={product} />
      </CartProvider>
    );
    await userEvent.click(screen.getByText('add3'));
    expect(screen.getByTestId('count').textContent).toBe('3');
    await userEvent.click(screen.getByText('clear'));
    expect(screen.getByTestId('count').textContent).toBe('0');
  });
});
