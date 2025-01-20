import { type SchemaTypeDefinition } from 'sanity';
import chef from './chefs';
import food from './foods';


export interface Product {
  _id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  image: string;
  rating: number;
}


export const schema: { types: SchemaTypeDefinition[] } = {
  types: [food, chef],
};

