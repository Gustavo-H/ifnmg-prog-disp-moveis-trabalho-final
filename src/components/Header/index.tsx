import { MaterialIcons } from '@expo/vector-icons';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { useAuth } from '../../context/AuthContext';
import { themes } from '../../global/themes';
import { style } from './styles';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  const navigation = useNavigation();
  const { user, signOut } = useAuth();

  function handleLogout() {
    signOut();
    // Tabs are nested in the root stack, so reset the parent navigator
    (navigation.getParent() ?? navigation).dispatch(
      CommonActions.reset({ index: 0, routes: [{ name: 'Login' }] }),
    );
  }

  return (
    <SafeAreaView edges={['top']} style={style.safeArea}>
      <StatusBar style="light" />
      <View style={style.container}>
        <View>
          <Text style={style.title}>{title}</Text>
          {user && <Text style={style.subtitle}>{user.username}</Text>}
        </View>

        <TouchableOpacity onPress={handleLogout} hitSlop={8} accessibilityLabel="Sair">
          <MaterialIcons name="logout" size={24} color={themes.colors.surface} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
