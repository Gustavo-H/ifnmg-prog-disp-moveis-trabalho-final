import { MaterialIcons } from '@expo/vector-icons';
import { ActivityIndicator, Text, TouchableOpacity } from 'react-native';

import { themes } from '../../global/themes';
import { style } from './styles';

interface ButtonProps {
  title: string;
  onPress: () => void;
  icon?: keyof typeof MaterialIcons.glyphMap;
  loading?: boolean;
  disabled?: boolean;
  variant?: 'primary' | 'danger';
}

export function Button({
  title,
  onPress,
  icon,
  loading = false,
  disabled = false,
  variant = 'primary',
}: ButtonProps) {
  const inactive = disabled || loading;

  return (
    <TouchableOpacity
      style={[style.button, variant === 'danger' && style.danger, inactive && style.disabled]}
      onPress={onPress}
      disabled={inactive}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={themes.colors.surface} />
      ) : (
        <>
          {icon && <MaterialIcons name={icon} size={20} color={themes.colors.surface} />}
          <Text style={style.title}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
}
