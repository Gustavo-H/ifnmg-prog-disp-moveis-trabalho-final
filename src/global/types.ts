export interface User {
  id: number;
  username: string;
}

export interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}

export type NewProduct = Omit<Product, 'id'>;

export interface StockExit {
  id: number;
  productId: number;
  productName: string;
  quantity: number;
  createdAt: string;
}

export type StockStatus = 'ok' | 'low' | 'out';
