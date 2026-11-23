import { useSQLiteContext } from 'expo-sqlite';
import { createContext, ReactNode, useCallback, useContext, useEffect, useState } from 'react';

import {
  insertProduct,
  insertStockExit,
  listProducts,
  listStockExits,
  productNameExists,
} from '../database/productRepository';
import { NewProduct, Product, StockExit } from '../global/types';

interface ProductContextData {
  products: Product[];
  exits: StockExit[];
  loading: boolean;
  addProduct: (product: NewProduct) => Promise<void>;
  registerExit: (productId: number, quantity: number) => Promise<void>;
}

const ProductContext = createContext<ProductContextData | undefined>(undefined);

export function ProductProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();
  const [products, setProducts] = useState<Product[]>([]);
  const [exits, setExits] = useState<StockExit[]>([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    const [productRows, exitRows] = await Promise.all([listProducts(db), listStockExits(db)]);
    setProducts(productRows);
    setExits(exitRows);
  }, [db]);

  useEffect(() => {
    refresh().finally(() => setLoading(false));
  }, [refresh]);

  async function addProduct(product: NewProduct) {
    if (await productNameExists(db, product.name)) {
      throw new Error('Já existe um produto com esse nome.');
    }
    await insertProduct(db, product);
    await refresh();
  }

  async function registerExit(productId: number, quantity: number) {
    await insertStockExit(db, productId, quantity);
    await refresh();
  }

  return (
    <ProductContext.Provider value={{ products, exits, loading, addProduct, registerExit }}>
      {children}
    </ProductContext.Provider>
  );
}

export function useProducts(): ProductContextData {
  const context = useContext(ProductContext);
  if (!context) throw new Error('useProducts must be used inside ProductProvider');
  return context;
}
