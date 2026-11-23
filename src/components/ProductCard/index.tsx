import { Text, View } from 'react-native';

import { formatCurrency } from '../../global/format';
import { Product } from '../../global/types';
import { StatusBadge } from '../StatusBadge';
import { style } from './styles';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <View style={style.card}>
      <View style={style.info}>
        <Text style={style.name} numberOfLines={1}>
          {product.name}
        </Text>
        <Text style={style.price}>{formatCurrency(product.price)}</Text>
        <StatusBadge quantity={product.quantity} />
      </View>

      <View style={style.quantityBox}>
        <Text style={style.quantity}>{product.quantity}</Text>
        <Text style={style.unit}>un.</Text>
      </View>
    </View>
  );
}
