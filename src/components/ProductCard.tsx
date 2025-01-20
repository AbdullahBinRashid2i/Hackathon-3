// components/ProductCard.tsx
import { useState } from 'react';
import { Product } from '@/sanity/schemaTypes/index'; // Import the type for a product
import ProductModal from './ProductModal';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="product-card" onClick={handleCardClick}>
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.category}</p>
      <p>${product.price}</p>
      <ProductModal product={product} isOpen={isModalOpen} onClose={handleCloseModal} />
    </div>
  );
};

export default ProductCard;
