'use client';

import { useEffect, useState } from 'react';
import { getFoodProducts, getChefProducts } from '@/sanity/lib/data';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// Function to build the image URL from Sanity
const builder = imageUrlBuilder(client);

const urlFor = (source: any) => {
  if (source && source.asset && source.asset._ref) {
    return builder.image(source).url();
  }
  return '/path/to/placeholder-image.jpg';
};

interface ImageAsset {
  _ref: string;
  _type: string;
}

interface Image {
  _type: string;
  asset: ImageAsset;
}

interface Item {
  _id: string;
  name: string;
  description: string;
  category: string;
  price?: number;
  available?: boolean;
  image: Image;
}

const HomePage = () => {
  const [foodProducts, setFoodProducts] = useState<Item[]>([]);
  const [chefProducts, setChefProducts] = useState<Item[]>([]);

  useEffect(() => {
    const fetchFoodProducts = async () => {
      const fetchedFood = await getFoodProducts();
      setFoodProducts(fetchedFood);
    };

    const fetchChefProducts = async () => {
      const fetchedChefs = await getChefProducts();
      setChefProducts(fetchedChefs);
    };

    fetchFoodProducts();
    fetchChefProducts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="container mx-auto px-4 py-8 flex-grow">
        {/* Menu Section */}
        <h1 className="text-4xl font-bold text-center">Welcome to Our Menu</h1>
        <section className="mt-8">
          <h2 className="text-3xl font-semibold text-center mb-6">Our Food</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {foodProducts.length > 0 ? (
              foodProducts.map((food) => (
                <div key={food._id} className="border p-4 rounded-lg shadow-md">
                  {food.image && food.image.asset && food.image.asset._ref ? (
                    <img
                      src={urlFor(food.image)}
                      alt={food.name}
                      className="w-full h-64 object-cover rounded-md"
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                  <h2 className="text-xl font-semibold mt-4">{food.name}</h2>
                  <p className="text-gray-600 mt-2">{food.description}</p>
                  {food.price !== undefined && (
                    <div className="flex justify-between items-center mt-4">
                      <span className="text-xl font-semibold">${food.price}</span>
                      {food.available ? (
                        <span className="text-green-500 font-medium">Available</span>
                      ) : (
                        <span className="text-red-500 font-medium">Out of Stock</span>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p>Loading food products...</p>
            )}
          </div>
        </section>

        {/* Chef Section */}
        <section className="mt-16 bg-gradient-to-r from-blue-50 to-blue-100 py-12 rounded-lg shadow-lg">
          <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">
            Meet Our Chefs
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 px-4">
            {chefProducts.length > 0 ? (
              chefProducts.map((chef) => (
                <div key={chef._id} className="bg-white rounded-lg shadow-md p-6">
                  {chef.image && chef.image.asset && chef.image.asset._ref ? (
                    <img
                      src={urlFor(chef.image)}
                      alt={chef.name}
                      className="w-full h-56 object-cover rounded-lg mb-4"
                    />
                  ) : (
                    <p>No image available</p>
                  )}
                  <h3 className="text-2xl font-semibold text-gray-700">{chef.name}</h3>
                  <p className="text-gray-500 mt-2">{chef.description}</p>
                </div>
              ))
            ) : (
              <p>Loading chefs...</p>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
