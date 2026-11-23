import { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  View,
} from 'react-native';

import { Button } from '../../components/Button';
import { Dropdown, DropdownOption } from '../../components/Dropdown';
import { EmptyState } from '../../components/EmptyState';
import { ExitItem } from '../../components/ExitItem';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { StatusBadge } from '../../components/StatusBadge';
import { useProducts } from '../../context/ProductContext';
import { style } from './styles';

interface ExitErrors {
  product?: string;
  quantity?: string;
}

export default function Saida() {
  const { products, exits, registerExit } = useProducts();

  const [search, setSearch] = useState('');
  const [productId, setProductId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState('');
  const [errors, setErrors] = useState<ExitErrors>({});
  const [saving, setSaving] = useState(false);

  const selected = products.find((product) => product.id === productId);
  const term = search.trim().toLowerCase();

  // Keep the current selection visible even if it no longer matches the search
  const options: DropdownOption<number>[] = products
    .filter((product) => product.name.toLowerCase().includes(term) || product.id === productId)
    .map((product) => ({
      label: product.name,
      value: product.id,
      description: `Saldo: ${product.quantity} un.`,
    }));

  function validate(): boolean {
    const next: ExitErrors = {};
    const amount = Number(quantity);

    if (!selected) next.product = 'Selecione um produto.';
    if (!quantity) next.quantity = 'Informe a quantidade.';
    else if (!Number.isInteger(amount) || amount <= 0) next.quantity = 'Quantidade inválida.';
    else if (selected && amount > selected.quantity) {
      next.quantity = `Saldo insuficiente. Disponível: ${selected.quantity}.`;
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleRegister() {
    if (!validate() || !selected) return;

    setSaving(true);
    try {
      await registerExit(selected.id, Number(quantity));
      Alert.alert(
        'Baixa registrada',
        `${quantity} un. de ${selected.name}. Novo saldo: ${selected.quantity - Number(quantity)}.`,
      );
      setQuantity('');
      setErrors({});
    } catch (error) {
      setErrors({ quantity: error instanceof Error ? error.message : 'Erro ao registrar.' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={style.container}>
      <Header title="Saída de Produtos" />

      <KeyboardAvoidingView
        style={style.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={style.content} keyboardShouldPersistTaps="handled">
          <View style={style.card}>
            <Input
              label="Buscar produto"
              icon="search"
              placeholder="Digite o nome"
              value={search}
              onChangeText={setSearch}
              rightIcon={search ? 'close' : undefined}
              onRightIconPress={() => setSearch('')}
              autoCorrect={false}
            />

            <Dropdown
              label="Produto"
              placeholder="Selecione um produto"
              options={options}
              value={productId}
              onChange={(id) => {
                setProductId(id);
                setErrors({});
              }}
              emptyMessage="Nenhum produto encontrado."
              error={errors.product}
            />

            {selected && (
              <View style={style.balance}>
                <Text style={style.balanceText}>Saldo atual: {selected.quantity} un.</Text>
                <StatusBadge quantity={selected.quantity} />
              </View>
            )}

            <Input
              label="Quantidade de saída"
              icon="remove-circle-outline"
              placeholder="0"
              value={quantity}
              onChangeText={(text) => setQuantity(text.replace(/\D/g, ''))}
              keyboardType="number-pad"
              error={errors.quantity}
            />

            <Button
              title="Registrar baixa"
              icon="outbox"
              variant="danger"
              onPress={handleRegister}
              loading={saving}
            />
          </View>

          <Text style={style.sectionTitle}>Últimas saídas</Text>
          <View style={style.card}>
            {exits.length === 0 ? (
              <EmptyState message="Nenhuma saída registrada." icon="history" />
            ) : (
              exits.map((exit) => <ExitItem key={exit.id} exit={exit} />)
            )}
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
