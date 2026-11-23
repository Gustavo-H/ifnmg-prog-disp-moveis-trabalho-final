import { useSQLiteContext } from 'expo-sqlite';
import { createContext, ReactNode, useContext, useState } from 'react';

import { findUserByCredentials } from '../database/userRepository';
import { User } from '../global/types';

interface AuthContextData {
  user: User | null;
  signIn: (username: string, password: string) => Promise<boolean>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextData | undefined>(undefined);

// Simulated network latency so the loading indicator is visible
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export function AuthProvider({ children }: { children: ReactNode }) {
  const db = useSQLiteContext();
  const [user, setUser] = useState<User | null>(null);

  async function signIn(username: string, password: string): Promise<boolean> {
    await delay(800);
    const found = await findUserByCredentials(db, username.trim(), password);
    setUser(found);
    return found !== null;
  }

  function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used inside AuthProvider');
  return context;
}
