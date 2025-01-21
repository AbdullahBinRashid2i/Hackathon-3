import React, { useState } from 'react';
import { Product } from '@/components/types'; 
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="border p-4 rounded-lg shadow-md">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-64 object-cover rounded-md"
        onClick={handleOpenModal}
      />
      <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
      <p className="text-gray-600 mt-2">{product.description}</p>
      <div className="flex justify-between items-center mt-4">
        <span className="text-xl font-semibold">${product.price}</span>
        <button className="bg-blue-500 text-white px-4 py-2 rounded">Add to Cart</button>
      </div>

      {showModal && <ProductModal product={product} onClose={handleCloseModal} />}
    </div>
  );
};

export default ProductCard;
