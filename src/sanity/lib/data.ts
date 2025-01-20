import { client } from "./client";

// interfaces.ts

export interface ImageAsset {
    _ref: string;
    _type: string;
  }
  
  export interface Image {
    _type: string;
    asset: ImageAsset;
  }
  
  export interface FoodItem {
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
  
  
  



export const getFoodProducts = async () => {
    try
    {
        const queryAllProducts = "*[_type == 'food']";

    const products = await client.fetch(queryAllProducts);
    return products;
    }
    catch(error)
    {
    console.log(error);
    }
    };


    export const getChefProducts = async () => {
      try
      {
          const queryAllProducts = "*[_type == 'chef']";
  
      const products = await client.fetch(queryAllProducts);
      return products;
      }
      catch(error)
      {
      console.log(error);
      }
      };
    