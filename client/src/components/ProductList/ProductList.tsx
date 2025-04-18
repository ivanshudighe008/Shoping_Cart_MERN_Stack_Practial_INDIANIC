import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../store';
import { addToCart } from '../../store/cartSlice';
import { Product } from '../../types/Product';
import api from '../../api/axios';

const ProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Failed to fetch products', err));
  }, []);

  return (
    <div className="grid grid-cols-2 gap-4">
      {products.map((p) => (
        <div key={p._id} className="p-4 border rounded-xl shadow">
          <img src={p.image} alt={p.name} className="w-full h-32 object-cover" />
          <h2 className="text-lg font-semibold">{p.name}</h2>
          <p className="text-sm text-gray-600">${p.price}</p>
          <button
            onClick={() => dispatch(addToCart({ productId: p._id, quantity: 1 }))}
            className="bg-blue-600 text-white px-4 py-1 rounded mt-2"
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
