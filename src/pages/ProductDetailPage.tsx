import { useParams, useLoaderData } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useCart } from '../context/CartContext';
import Spinner from '../components/Spinner';
const ProductDetailPage = () => {
  const { product } = useLoaderData();
  const [loading, setLoading] = useState(true);
  const { addProductToCart } = useCart();

  const handleAddToCart = () => {
    addProductToCart(product);
  };

  useEffect(() => {
    if (product) {
      setLoading(false);
    }
  }, [product]);

  return (
    <div className="product-detail">
      <div className="container mx-auto p-4 flex">
        {loading ? (
          <Spinner loading={true} />
        ) : (
          <>
            <div className="w-1/2">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto"
              />
            </div>
            <div className="w-1/2 pl-8">
              <h1 className="text-3xl font-bold">{product.title}</h1>
              <p className="text-xl text-gray-600">{product.description}</p>
              <div className="mt-4 flex items-center space-x-4">
                <span className="text-xl font-semibold text-green-600">
                  {product.price}
                </span>
                <button
                  onClick={handleAddToCart}
                  className="bg-blue-500 text-white py-2 px-6 rounded hover:bg-blue-600"
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
