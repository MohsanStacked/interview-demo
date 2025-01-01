import { RouterProvider } from 'react-router-dom';
import router from '../app/routes/index';
import { CartProvider } from '../context/CartProvider';
const App = () => {
  return (
    <CartProvider>
      <RouterProvider router={router} />;
    </CartProvider>
  );
};

export default App;
