import { StockStatus } from './types';

export const LOW_STOCK_LIMIT = 5;

export function getStockStatus(quantity: number): StockStatus {
  if (quantity <= 0) return 'out';
  if (quantity <= LOW_STOCK_LIMIT) return 'low';
  return 'ok';
}
