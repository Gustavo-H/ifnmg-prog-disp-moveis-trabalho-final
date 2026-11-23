import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { useRef, useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInputInstance,
  View,
} from 'react-native';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../context/AuthContext';
import { themes } from '../../global/themes';
import { RootStackParamList } from '../../routes/types';
import { style } from './styles';

interface LoginErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function Login() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  const { signIn } = useAuth();
  const passwordRef = useRef<TextInputInstance>(null);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<LoginErrors>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const next: LoginErrors = {};
    if (!email.trim()) next.email = 'Informe o e-mail ou usuário.';
    if (!password) next.password = 'Informe a senha.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleLogin() {
    if (!validate()) return;

    setLoading(true);
    try {
      const ok = await signIn(email, password);
      if (!ok) {
        setErrors({ general: 'Usuário ou senha inválidos.' });
        return;
      }
      setPassword('');
      navigation.reset({ index: 0, routes: [{ name: 'BottomRoutes' }] });
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={style.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={style.content} keyboardShouldPersistTaps="handled">
        <View style={style.logo}>
          <MaterialIcons name="inventory" size={48} color={themes.colors.surface} />
        </View>
        <Text style={style.title}>Gestão de Estoque</Text>

        <View style={style.form}>
          <Input
            label="E-mail"
            icon="person-outline"
            placeholder="admin"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="email-address"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
            error={errors.email}
          />
          <Input
            ref={passwordRef}
            label="Senha"
            icon="lock-outline"
            placeholder="••••••"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            rightIcon={showPassword ? 'visibility-off' : 'visibility'}
            onRightIconPress={() => setShowPassword((value) => !value)}
            returnKeyType="done"
            onSubmitEditing={handleLogin}
            error={errors.password}
          />

          {errors.general && <Text style={style.error}>{errors.general}</Text>}

          <Button title="Entrar" icon="login" onPress={handleLogin} loading={loading} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
