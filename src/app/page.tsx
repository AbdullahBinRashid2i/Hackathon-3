"use client";

import { AppProps } from 'next/app';

import { useEffect, useState } from 'react';
import { getFoodProducts, getChefProducts } from '@/sanity/lib/data';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { CartProvider } from '@/components/CartContext';
import { AlertDialog, AlertDialogTrigger, AlertDialogContent, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { Product } from '@/components/types';

const builder = imageUrlBuilder(client);

const urlFor = (source: any) => {
  if (source && source.asset && source.asset._ref) {
    return builder.image(source).url();
  }
  return '/path/to/placeholder-image.jpg';
};

interface Item {
  _id: string;
  name: string;
  description: string;
  category: string;
  price?: number;
  available?: boolean;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

const HomePage = () => {
  const [foodProducts, setFoodProducts] = useState<Item[]>([]);
  const [chefProducts, setChefProducts] = useState<Item[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Item | null>(null);

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

  const handleAddToCart = (product: Item) => {
    const productWithRating: Product = {
      ...product,
      rating: 0,
      price: product.price ?? 0,
      image: urlFor(product.image),
      id: 0
    };

    addToCart(productWithRating);
    setSelectedProduct(null);
  };

  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="container mx-auto px-4 py-8 flex-grow">
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
                    <AlertDialog open={!!selectedProduct} onOpenChange={(open) => !open && setSelectedProduct(null)}>
                      <AlertDialogTrigger asChild>
                        <Button onClick={() => setSelectedProduct(food)}>View Details</Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogTitle>{selectedProduct?.name}</AlertDialogTitle>
                        <p>{selectedProduct?.description}</p>
                        <p>Price: ${selectedProduct?.price}</p>
                        <img
                          src={urlFor(selectedProduct?.image)}
                          alt={selectedProduct?.name}
                          className="w-full h-64 object-cover rounded-md mt-4"
                        />
                        <div className="mt-4 flex justify-between">
                          <Button 
                            className="bg-blue-500 text-white hover:bg-blue-600" 
                            onClick={() => handleAddToCart(selectedProduct!)}
                          >
                            Add to Cart
                          </Button>
                          <Button 
                            variant="outline" 
                            onClick={() => setSelectedProduct(null)} 
                            className="opacity-100 hover:opacity-80"
                          >
                            Close
                          </Button>
                        </div>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))
              ) : (
                <p>Loading food products...</p>
              )}
            </div>
          </section>

          <section className="mt-16 bg-gradient-to-r from-blue-50 to-blue-100 py-12 rounded-lg shadow-lg">
            <h2 className="text-4xl font-bold text-center text-blue-600 mb-8">Meet Our Chefs</h2>
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
    </CartProvider>
  );
};


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <Component {...pageProps} />
    </CartProvider>
  );
}


export default HomePage;

function addToCart(productWithRating: Product) {
  throw new Error('Function not implemented.');
}
