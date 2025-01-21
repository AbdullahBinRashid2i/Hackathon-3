export interface Product {
  [x: string]: unknown;
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  originalPrice?: number;  // Optional
  rating: number;          // Rating between 0 and 5
  category: string;        // Product category
  tag?: string;            // Optional tag (e.g., "Best Seller", "New")
}