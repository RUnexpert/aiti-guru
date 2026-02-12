import type { Product, SortField, SortOrder } from '../types/products';

const BASE_URL = 'https://dummyjson.com/products';
const LIMIT = 20;

interface GetProductsParams {
  search?: string;
  sortBy: SortField;
  order: SortOrder;
}

interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export const getProducts = async ({
  search,
  sortBy,
  order,
}: GetProductsParams): Promise<ProductsResponse> => {
  const url = search
    ? `${BASE_URL}/search?q=${encodeURIComponent(search)}`
    : `${BASE_URL}?limit=${LIMIT}&sortBy=${sortBy}&order=${order}`;

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error('Ошибка загрузки товаров');
  }

  return res.json();
};
