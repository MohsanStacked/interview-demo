import { NavLink } from 'react-router-dom';

interface Product {
  id: number;
  title: string;
  price: number;
  image_url: string;
  quantity: number;
  description: string;
}

interface ProductCardProps {
  product: Product; // Explicitly declare the props for better readability
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <div className="border rounded-lg shadow-lg p-4 flex flex-col h-full">
      {/* Product Image */}
      <img
        src={product.image_url}
        alt={product.title}
        className="w-full h-48 object-cover mb-4"
      />

      {/* Product Details */}
      <div className="flex flex-col flex-grow">
        <h3 className="text-lg font-bold">{product.title}</h3>
        <p className="text-gray-600">${product.price}</p>
        <div className="flex-grow" />

        {/* Navigation Link */}
        <NavLink
          to={`/product/${product.id}`}
          className="mt-4 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          View Details
        </NavLink>
      </div>
    </div>
  );
};

export default ProductCard;
