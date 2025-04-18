import { useAppSelector, useAppDispatch } from '../../store/hooks';
import { fetchCart, removeFromCart, updateQuantity } from '../../store/cartSlice';
import { useEffect } from 'react';

const CartSidebar = () => {
  const items = useAppSelector((state) => state.cart.items);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCart());
  }, []);

  const total = items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);

  return (
    <div className='fixed top-0 right-0 w-80 h-full bg-white shadow-lg p-4 overflow-y-auto z-50'>
      <h2 className='text-xl font-bold mb-4'>Your Cart</h2>
      {items.length === 0 ? (
        <p className='text-gray-500'>Cart is empty.</p>
      ) : (
        items.map((item) => (
          <div
            key={item._id}
            className='flex items-center justify-between gap-2 mb-4'
          >
            <img
              src={item.productId.image}
              className='w-16 h-16 object-cover'
            />
            <div className='flex-1'>
              <p className='font-semibold'>{item.productId.name}</p>
              <p className='text-sm text-gray-600'>
                ${item.productId.price.toFixed(2)}
              </p>
              <div className='flex items-center gap-1 mt-1'>
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item._id,
                        quantity: item.quantity - 1,
                      })
                    )
                  }
                  disabled={item.quantity <= 1}
                  className='px-2 py-1 bg-gray-200 rounded'
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    dispatch(
                      updateQuantity({
                        id: item._id,
                        quantity: item.quantity + 1,
                      })
                    )
                  }
                  className='px-2 py-1 bg-gray-200 rounded'
                >
                  +
                </button>
              </div>
            </div>
            <button
              onClick={() => dispatch(removeFromCart(item._id))}
              className='text-red-500 font-bold text-lg'
            >
              ×
            </button>
          </div>
        ))
      )}

      {items.length > 0 && (
        <div className='border-t pt-4 mt-4'>
          <p className='text-lg font-semibold'>Total: ${total.toFixed(2)}</p>
        </div>
      )}
    </div>
  );
};

export default CartSidebar;
