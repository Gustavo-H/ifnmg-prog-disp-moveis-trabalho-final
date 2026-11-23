import { Text, View } from 'react-native';

import { getStockStatus } from '../../global/stock';
import { StockStatus } from '../../global/types';
import { style } from './styles';

const LABELS: Record<StockStatus, string> = {
  ok: 'Em estoque',
  low: 'Estoque baixo',
  out: 'Esgotado',
};

interface StatusBadgeProps {
  quantity: number;
}

export function StatusBadge({ quantity }: StatusBadgeProps) {
  const status = getStockStatus(quantity);

  return (
    <View style={[style.badge, style[status]]}>
      <Text style={[style.text, style[`${status}Text`]]}>{LABELS[status]}</Text>
    </View>
  );
}
