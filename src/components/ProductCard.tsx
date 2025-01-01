import { NavLink } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <>
      <div className="border rounded-lg shadow-lg p-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-48 object-cover mb-4"
        />
        <h3 className="text-lg font-bold">{product.title}</h3>
        <p className="text-gray-600">${product.price.toFixed(2)}</p>
        <NavLink
          to={`/product/${product.id}`}
          className="mt-2 inline-block bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          View Details
        </NavLink>
      </div>
    </>
  );
};

export default ProductCard;
