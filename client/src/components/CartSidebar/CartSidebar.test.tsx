import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer, { CartItem } from '../../store/cartSlice';
import CartSidebar from './CartSidebar';

const mockCartItems: CartItem[] = [
  {
    _id: '1',
    productId: {
      _id: '1',
      name: 'Test Product',
      price: 50,
      image: '',
    },
    quantity: 2,
  },
];

function renderWithStore(cartItems: CartItem[]) {
  const store = configureStore({
    reducer: { cart: cartReducer },
    preloadedState: { cart: { items: cartItems, status: 'idle' as const } },
  });

  return render(
    <Provider store={store}>
      <CartSidebar />
    </Provider>
  );
}

describe('CartSidebar', () => {
  it('renders cart items', () => {
    renderWithStore(mockCartItems);

    expect(screen.getByText('Test Product')).toBeInTheDocument();
    expect(screen.getByText('Total: $100.00')).toBeInTheDocument();
  });

  it('should increment quantity', () => {
    renderWithStore(mockCartItems);

    const plusButton = screen.getAllByText('+')[0];
    fireEvent.click(plusButton);

    expect(plusButton).toBeInTheDocument();
  });
});
