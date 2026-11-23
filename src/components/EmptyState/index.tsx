import { MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { themes } from '../../global/themes';
import { style } from './styles';

interface EmptyStateProps {
  message: string;
  icon?: keyof typeof MaterialIcons.glyphMap;
}

export function EmptyState({ message, icon = 'inventory-2' }: EmptyStateProps) {
  return (
    <View style={style.container}>
      <MaterialIcons name={icon} size={48} color={themes.colors.border} />
      <Text style={style.message}>{message}</Text>
    </View>
  );
}
