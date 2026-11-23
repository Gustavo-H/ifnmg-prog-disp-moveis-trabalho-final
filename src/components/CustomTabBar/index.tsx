import { MaterialIcons } from '@expo/vector-icons';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { BottomTabParamList } from '../../routes/types';
import { themes } from '../../global/themes';
import { style } from './styles';

const TABS: Record<
  keyof BottomTabParamList,
  { label: string; icon: keyof typeof MaterialIcons.glyphMap }
> = {
  Cadastro: { label: 'Cadastro', icon: 'add-box' },
  Estoque: { label: 'Estoque', icon: 'inventory' },
  Saida: { label: 'Saída', icon: 'outbox' },
};

export function CustomTabBar({ state, navigation }: BottomTabBarProps) {
  return (
    <SafeAreaView edges={['bottom']} style={style.safeArea}>
      <View style={style.container}>
        {state.routes.map((route, index) => {
          const focused = state.index === index;
          const tab = TABS[route.name as keyof BottomTabParamList];
          const color = focused ? themes.colors.primary : themes.colors.textMuted;

          function handlePress() {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });
            if (!focused && !event.defaultPrevented) navigation.navigate(route.name);
          }

          return (
            <TouchableOpacity
              key={route.key}
              style={style.tab}
              onPress={handlePress}
              accessibilityRole="tab"
              accessibilityState={{ selected: focused }}
            >
              <View style={[style.iconBox, focused && style.iconBoxFocused]}>
                <MaterialIcons name={tab.icon} size={24} color={color} />
              </View>
              <Text style={[style.label, focused && style.labelFocused]}>{tab.label}</Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
}
