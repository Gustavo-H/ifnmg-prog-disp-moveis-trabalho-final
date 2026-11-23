import { MaterialIcons } from '@expo/vector-icons';
import { Text, View } from 'react-native';

import { style } from './styles';

interface SummaryCardProps {
  label: string;
  value: number | string;
  icon: keyof typeof MaterialIcons.glyphMap;
  color: string;
}

export function SummaryCard({ label, value, icon, color }: SummaryCardProps) {
  return (
    <View style={style.card}>
      <MaterialIcons name={icon} size={22} color={color} />
      <Text style={style.value}>{value}</Text>
      <Text style={style.label}>{label}</Text>
    </View>
  );
}
