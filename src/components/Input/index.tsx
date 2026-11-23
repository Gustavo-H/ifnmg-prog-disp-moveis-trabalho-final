import { MaterialIcons } from '@expo/vector-icons';
import { Ref } from 'react';
import {
  Text,
  TextInput,
  TextInputInstance,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';

import { themes } from '../../global/themes';
import { style } from './styles';

type IconName = keyof typeof MaterialIcons.glyphMap;

export interface InputProps extends Omit<TextInputProps, 'ref'> {
  ref?: Ref<TextInputInstance>;
  label?: string;
  icon?: IconName;
  rightIcon?: IconName;
  onRightIconPress?: () => void;
  error?: string;
}

export function Input({ ref, label, icon, rightIcon, onRightIconPress, error, ...rest }: InputProps) {
  return (
    <View style={style.wrapper}>
      {label && <Text style={style.label}>{label}</Text>}

      <View style={[style.field, error ? style.fieldError : null]}>
        {icon && <MaterialIcons name={icon} size={20} color={themes.colors.textMuted} />}

        <TextInput
          ref={ref}
          style={style.input}
          placeholderTextColor={themes.colors.textMuted}
          {...rest}
        />

        {rightIcon && (
          <TouchableOpacity onPress={onRightIconPress} hitSlop={8}>
            <MaterialIcons name={rightIcon} size={20} color={themes.colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      {error && <Text style={style.error}>{error}</Text>}
    </View>
  );
}
