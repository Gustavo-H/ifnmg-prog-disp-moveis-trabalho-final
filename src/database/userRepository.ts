import { SQLiteDatabase } from 'expo-sqlite';

import { User } from '../global/types';

export function findUserByCredentials(
  db: SQLiteDatabase,
  username: string,
  password: string,
): Promise<User | null> {
  return db.getFirstAsync<User>(
    'SELECT id, username FROM users WHERE username = ? AND password = ?',
    username,
    password,
  );
}
