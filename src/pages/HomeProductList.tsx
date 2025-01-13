import { useEffect, useState } from 'react';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';
import { ShoppingBag } from 'lucide-react';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
  quantity: number;
}

const HomeProductList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/products', {
          method: 'GET',
        });
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();

    // Trigger content animation
    setTimeout(() => setShowContent(true), 300);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 flex items-center justify-center p-4">
      <div
        className={`max-w-6xl w-full transition-all duration-1000 transform ${
          showContent ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
      >
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <Spinner loading={true} />
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-3xl font-bold text-gray-800">
                <span className="flex items-center">
                  <ShoppingBag className="w-8 h-8 text-green-500 mr-2" />
                  Featured Products
                </span>
              </h1>
            </div>

            {products.length === 0 ? (
              <div className="text-center text-gray-600 py-10">
                No products available at the moment.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            <div className="mt-8 text-center">
              <p className="text-gray-500 text-sm">
                Looking for more? Stay tuned for new arrivals!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeProductList;
