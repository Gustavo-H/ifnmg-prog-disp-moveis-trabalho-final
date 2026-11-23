import { NavigationContainer } from '@react-navigation/native';
import { SQLiteProvider } from 'expo-sqlite';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from './src/context/AuthContext';
import { ProductProvider } from './src/context/ProductContext';
import { DATABASE_NAME, migrate } from './src/database';
import Routes from './src/routes/index.routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <SQLiteProvider databaseName={DATABASE_NAME} onInit={migrate}>
        <AuthProvider>
          <ProductProvider>
            <NavigationContainer>
              <Routes />
            </NavigationContainer>
          </ProductProvider>
        </AuthProvider>
      </SQLiteProvider>
    </SafeAreaProvider>
  );
}
