import { useLoaderData } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Spinner from '../components/Spinner';

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  image_url: string;
  quantity: number;
}

const ProductDetailPage = () => {
  const product = useLoaderData() as Product;
  const { addProductToCart } = useCart();
  const [loading, setLoading] = useState(true);

  const handleAddToCart = () => {
    addProductToCart(product);
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  return (
    <div className="bg-gray-50 py-8">
      <div className="container mx-auto p-4 flex flex-wrap justify-center">
        {loading ? (
          <Spinner loading={true} />
        ) : (
          <>
            {/* Product Image Section */}
            <div className="w-full md:w-1/2 mb-6 md:mb-0 flex justify-center">
              <img
                src={product.image_url}
                alt={product.title}
                className="w-full max-w-xs h-auto rounded-xl shadow-lg object-cover"
              />
            </div>

            {/* Product Details Section */}
            <div className="w-full md:w-1/2 md:pl-8 flex flex-col justify-between">
              <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
                {product.title}
              </h1>
              <p className="text-lg text-gray-600 mb-6">
                {product.description}
              </p>

              {/* Price and Add to Cart Section */}
              <div className="flex items-center justify-between mt-4">
                <span className="text-2xl font-semibold text-green-600">
                  ${product.price}
                </span>
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-600 text-white py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;
