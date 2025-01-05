import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import HomePage from '../../pages/HomePage';
import ProductDetailPage from '../../pages/ProductDetailPage';
import CartPage from '../../pages/CartPage';
import CheckoutPage from '../../pages/CheckoutPage';
import MainLayout from '../../layout/MainLayout';
import { productLoader } from '../../utils/productLoader';
import SuccessPage from '../../pages/SuccessPage';
import CancelPage from '../../pages/CancelPage';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<MainLayout />}>
      <Route index element={<HomePage />} />
      <Route
        path="/product/:id"
        element={<ProductDetailPage />}
        loader={productLoader}
      />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/checkout" element={<CheckoutPage />} />
      <Route path="/success" element={<SuccessPage />} />
      <Route path="/cancel" element={<CancelPage />} />
    </Route>
  )
);

export default router;
