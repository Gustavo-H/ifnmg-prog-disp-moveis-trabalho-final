import { MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { formatDateTime } from '../../global/format';
import { themes } from '../../global/themes';
import { StockExit } from '../../global/types';
import { style } from './styles';

interface ExitItemProps {
  exit: StockExit;
}

export function ExitItem({ exit }: ExitItemProps) {
  return (
    <View style={style.item}>
      <MaterialIcons name="south-east" size={20} color={themes.colors.danger} />
      <View style={style.info}>
        <Text style={style.name} numberOfLines={1}>
          {exit.productName}
        </Text>
        <Text style={style.date}>{formatDateTime(exit.createdAt)}</Text>
      </View>
      <Text style={style.quantity}>-{exit.quantity}</Text>
    </View>
  );
}
