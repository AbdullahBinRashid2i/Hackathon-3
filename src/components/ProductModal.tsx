import React from 'react';
import { Product } from '@/components/types';

interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <button onClick={onClose} className="text-xl font-semibold">X</button>
        <h2 className="text-2xl font-semibold mt-4">{product.name}</h2>
        <img src={product.image} alt={product.name} className="w-full h-64 object-cover rounded-md mt-4" />
        <p className="mt-4">{product.description}</p>
        <span className="text-xl font-semibold mt-4">${product.price}</span>
        <button className="bg-blue-500 text-white px-4 py-2 rounded mt-4">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductModal;
