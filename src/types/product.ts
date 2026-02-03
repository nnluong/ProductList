export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  isPrescription: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export type Category = 
  | 'All' 
  | 'Pain Relief' 
  | 'Antibiotic' 
  | 'Supplement' 
  | 'Allergy' 
  | 'Gastro';

export const CATEGORIES: Category[] = [
  'All',
  'Pain Relief',
  'Antibiotic',
  'Supplement',
  'Allergy',
  'Gastro',
];

export const MAX_QUANTITY = 99;
export const MIN_QUANTITY = 0;
