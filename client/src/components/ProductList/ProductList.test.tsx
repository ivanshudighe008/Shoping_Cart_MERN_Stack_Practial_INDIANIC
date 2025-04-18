import { render, screen, waitFor } from '@testing-library/react';
import ProductList from './ProductList';
import { Provider } from 'react-redux';
import { store } from '../../store';
import api from '../../api/axios';

jest.mock('../../api/axios');
const mockedApi = api as jest.Mocked<typeof api>;

test('renders product card', async () => {
  mockedApi.get.mockResolvedValueOnce({
    data: [
      {
        _id: '1',
        name: 'Test Product',
        price: 99,
        image: 'https://via.placeholder.com/150',
      },
    ],
  });

  render(
    <Provider store={store}>
      <ProductList />
    </Provider>
  );

  await waitFor(() => {
    expect(screen.getByText(/Test Product/i)).toBeInTheDocument();
  });
});
