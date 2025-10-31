export interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  priceValue: number;
  rating: number;
  category: 'topwear' | 'bottomwear' | string;
  range: 'men' | 'women' | 'kids' | string;
  image: string;
  imageurl?: string;
}
