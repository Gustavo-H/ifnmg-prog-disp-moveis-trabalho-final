import { ActivityIndicator, FlatList, Text, View } from 'react-native';

import { EmptyState } from '../../components/EmptyState';
import { Header } from '../../components/Header';
import { ProductCard } from '../../components/ProductCard';
import { SummaryCard } from '../../components/SummaryCard';
import { useProducts } from '../../context/ProductContext';
import { formatCurrency } from '../../global/format';
import { getStockStatus, LOW_STOCK_LIMIT } from '../../global/stock';
import { themes } from '../../global/themes';
import { style } from './styles';

export default function Estoque() {
  const { products, loading } = useProducts();

  const totalUnits = products.reduce((sum, product) => sum + product.quantity, 0);
  const totalValue = products.reduce((sum, product) => sum + product.price * product.quantity, 0);
  const alerts = products.filter((product) => getStockStatus(product.quantity) !== 'ok').length;

  return (
    <View style={style.container}>
      <Header title="Controle de Estoque" />

      {loading ? (
        <ActivityIndicator style={style.loading} size="large" color={themes.colors.primary} />
      ) : (
        <FlatList
          data={products}
          keyExtractor={(product) => String(product.id)}
          contentContainerStyle={style.content}
          renderItem={({ item }) => <ProductCard product={item} />}
          ListHeaderComponent={
            <>
              <View style={style.summary}>
                <SummaryCard
                  label="Produtos"
                  value={products.length}
                  icon="category"
                  color={themes.colors.primary}
                />
                <SummaryCard
                  label="Unidades"
                  value={totalUnits}
                  icon="inventory"
                  color={themes.colors.success}
                />
                <SummaryCard
                  label={`Até ${LOW_STOCK_LIMIT} un.`}
                  value={alerts}
                  icon="warning-amber"
                  color={themes.colors.warning}
                />
              </View>
              <Text style={style.totalValue}>Valor em estoque: {formatCurrency(totalValue)}</Text>
            </>
          }
          ListEmptyComponent={<EmptyState message="Nenhum produto cadastrado." />}
        />
      )}
    </View>
  );
}
