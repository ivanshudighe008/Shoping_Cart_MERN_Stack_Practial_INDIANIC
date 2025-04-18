import ProductList from './components/ProductList/ProductList';
import CartSidebar from './components/CartSidebar/CartSidebar';
import './App.css';

function App() {
  return (
    <div className='flex'>
      <ProductList />
      <CartSidebar />
    </div>
  );
}

export default App;
