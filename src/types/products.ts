export interface Product {
  id: number;
  title: string;
  brand: string;
  sku: string;
  price: number;
  rating: number;
  category: string;
}

export type SortField = 'price' | 'rating' | 'title';
export type SortOrder = 'asc' | 'desc';
