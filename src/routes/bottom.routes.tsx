import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CustomTabBar } from '../components/CustomTabBar';
import Cadastro from '../pages/Cadastro';
import Estoque from '../pages/Estoque';
import Saida from '../pages/Saida';
import { BottomTabParamList } from './types';

const Tab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="Estoque"
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <CustomTabBar {...props} />}
    >
      <Tab.Screen name="Cadastro" component={Cadastro} />
      <Tab.Screen name="Estoque" component={Estoque} />
      <Tab.Screen name="Saida" component={Saida} />
    </Tab.Navigator>
  );
}
