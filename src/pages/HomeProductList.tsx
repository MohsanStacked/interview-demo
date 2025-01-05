import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}
const HomeProductList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner loading={true} />
      ) : (
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Featured Products</h1>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default HomeProductList;
