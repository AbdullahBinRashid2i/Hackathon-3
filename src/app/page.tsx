'use client';

import { useEffect, useState } from 'react';
import { getAllProducts } from '@/sanity/lib/data'; // Assuming the getAllProducts method is imported from the correct path
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client'; // Import the client for image URL building
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Function to build the image URL from Sanity
const builder = imageUrlBuilder(client);

// Function to safely extract the image URL
const urlFor = (source: any) => {
  if (source && source.asset && source.asset._ref) {
    return builder.image(source).url();
  }
  return '/path/to/placeholder-image.jpg'; // Use a placeholder if the image is missing or invalid
};

interface ImageAsset {
  _ref: string;
  _type: string;
}

interface Image {
  _type: string;
  asset: ImageAsset;
}

interface FoodItem {
  _id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  originalPrice: number;
  available: boolean;
  image: Image;
  _createdAt: string;
  _updatedAt: string;
  _rev: string;
}

const HomePage = () => {
  const [products, setProducts] = useState<FoodItem[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getAllProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-grow">
        <h1 className="text-4xl font-bold text-center">Welcome to Our Food Menu</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
          {products.length > 0 ? (
            products.map((product) => (
              <div key={product._id} className="border p-4 rounded-lg shadow-md">
                {/* Check if image URL is available */}
                {product.image && product.image.asset && product.image.asset._ref ? (
                  <img
                    src={urlFor(product.image)}
                    alt={product.name}
                    className="w-full h-64 object-cover rounded-md"
                  />
                ) : (
                  <p>No image available</p> // Fallback if no image is found
                )}
                <h2 className="text-xl font-semibold mt-4">{product.name}</h2>
                <p className="text-gray-600 mt-2">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <span className="text-xl font-semibold">${product.price}</span>
                  {product.available ? (
                    <span className="text-green-500 font-medium">Available</span>
                  ) : (
                    <span className="text-red-500 font-medium">Out of Stock</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
