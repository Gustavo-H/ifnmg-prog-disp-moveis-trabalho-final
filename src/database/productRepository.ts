import { SQLiteDatabase } from 'expo-sqlite';

import { NewProduct, Product, StockExit } from '../global/types';

export function listProducts(db: SQLiteDatabase): Promise<Product[]> {
  return db.getAllAsync<Product>(
    'SELECT id, name, price, quantity FROM products ORDER BY name COLLATE NOCASE',
  );
}

export async function productNameExists(db: SQLiteDatabase, name: string): Promise<boolean> {
  const row = await db.getFirstAsync<{ id: number }>(
    'SELECT id FROM products WHERE name = ?',
    name,
  );
  return row !== null;
}

export async function insertProduct(db: SQLiteDatabase, product: NewProduct): Promise<void> {
  await db.runAsync(
    'INSERT INTO products (name, price, quantity) VALUES (?, ?, ?)',
    product.name,
    product.price,
    product.quantity,
  );
}

export function listStockExits(db: SQLiteDatabase, limit = 20): Promise<StockExit[]> {
  return db.getAllAsync<StockExit>(
    `SELECT e.id, e.product_id AS productId, p.name AS productName,
            e.quantity, e.created_at AS createdAt
       FROM stock_exits e
       JOIN products p ON p.id = e.product_id
      ORDER BY e.id DESC
      LIMIT ?`,
    limit,
  );
}

export async function insertStockExit(
  db: SQLiteDatabase,
  productId: number,
  quantity: number,
): Promise<void> {
  await db.withTransactionAsync(async () => {
    const product = await db.getFirstAsync<{ quantity: number }>(
      'SELECT quantity FROM products WHERE id = ?',
      productId,
    );
    if (!product) throw new Error('Produto não encontrado.');
    if (quantity > product.quantity) {
      throw new Error(`Saldo insuficiente. Disponível: ${product.quantity}.`);
    }

    await db.runAsync(
      'UPDATE products SET quantity = quantity - ? WHERE id = ?',
      quantity,
      productId,
    );
    await db.runAsync(
      'INSERT INTO stock_exits (product_id, quantity) VALUES (?, ?)',
      productId,
      quantity,
    );
  });
}
