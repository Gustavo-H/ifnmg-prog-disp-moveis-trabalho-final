import { MaterialIcons } from '@expo/vector-icons';
import { useState } from 'react';
import { FlatList, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native';

import { themes } from '../../global/themes';
import { EmptyState } from '../EmptyState';
import { style } from './styles';

export interface DropdownOption<T> {
  label: string;
  value: T;
  description?: string;
}

interface DropdownProps<T> {
  label?: string;
  placeholder: string;
  options: DropdownOption<T>[];
  value: T | null;
  onChange: (value: T) => void;
  emptyMessage?: string;
  error?: string;
}

export function Dropdown<T extends string | number>({
  label,
  placeholder,
  options,
  value,
  onChange,
  emptyMessage = 'Nenhuma opção disponível.',
  error,
}: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const selected = options.find((option) => option.value === value);

  function handleSelect(option: DropdownOption<T>) {
    onChange(option.value);
    setOpen(false);
  }

  return (
    <View style={style.wrapper}>
      {label && <Text style={style.label}>{label}</Text>}

      <TouchableOpacity
        style={[style.field, error ? style.fieldError : null]}
        onPress={() => setOpen(true)}
        activeOpacity={0.7}
      >
        <Text style={selected ? style.value : style.placeholder} numberOfLines={1}>
          {selected?.label ?? placeholder}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color={themes.colors.textMuted} />
      </TouchableOpacity>

      {error && <Text style={style.error}>{error}</Text>}

      <Modal visible={open} transparent animationType="fade" onRequestClose={() => setOpen(false)}>
        <Pressable style={style.overlay} onPress={() => setOpen(false)}>
          <Pressable style={style.sheet}>
            <Text style={style.sheetTitle}>{label ?? placeholder}</Text>

            <FlatList
              data={options}
              keyExtractor={(option) => String(option.value)}
              ListEmptyComponent={<EmptyState message={emptyMessage} icon="search-off" />}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[style.option, item.value === value && style.optionSelected]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={style.optionLabel}>{item.label}</Text>
                  {item.description && (
                    <Text style={style.optionDescription}>{item.description}</Text>
                  )}
                </TouchableOpacity>
              )}
            />
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
