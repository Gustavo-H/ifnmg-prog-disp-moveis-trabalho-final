import { useRef, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TextInputInstance, View } from 'react-native';

import { Button } from '../../components/Button';
import { Header } from '../../components/Header';
import { Input } from '../../components/Input';
import { useProducts } from '../../context/ProductContext';
import { parsePrice } from '../../global/format';
import { style } from './styles';

interface FormErrors {
  name?: string;
  price?: string;
  quantity?: string;
}

export default function Cadastro() {
  const { addProduct } = useProducts();
  const priceRef = useRef<TextInputInstance>(null);
  const quantityRef = useRef<TextInputInstance>(null);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [errors, setErrors] = useState<FormErrors>({});
  const [saving, setSaving] = useState(false);

  function validate(): boolean {
    const next: FormErrors = {};
    const parsedPrice = parsePrice(price);
    const parsedQuantity = Number(quantity);

    if (!name.trim()) next.name = 'Informe o nome do produto.';
    if (!price.trim()) next.price = 'Informe o preço.';
    else if (!Number.isFinite(parsedPrice) || parsedPrice < 0) next.price = 'Preço inválido.';
    if (!quantity.trim()) next.quantity = 'Informe a quantidade inicial.';
    else if (!Number.isInteger(parsedQuantity) || parsedQuantity < 0) {
      next.quantity = 'Quantidade deve ser um número inteiro.';
    }

    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSave() {
    if (!validate()) return;

    setSaving(true);
    try {
      await addProduct({
        name: name.trim(),
        price: parsePrice(price),
        quantity: Number(quantity),
      });
      Alert.alert('Produto cadastrado', `${name.trim()} foi adicionado ao estoque.`);
      setName('');
      setPrice('');
      setQuantity('');
      setErrors({});
    } catch (error) {
      setErrors({ name: error instanceof Error ? error.message : 'Erro ao salvar.' });
    } finally {
      setSaving(false);
    }
  }

  return (
    <View style={style.container}>
      <Header title="Cadastro de Produtos" />

      <KeyboardAvoidingView
        style={style.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView contentContainerStyle={style.content} keyboardShouldPersistTaps="handled">
          <View style={style.card}>
            <Input
              label="Nome do produto"
              icon="label-outline"
              placeholder="Ex.: Caneta azul"
              value={name}
              onChangeText={setName}
              returnKeyType="next"
              onSubmitEditing={() => priceRef.current?.focus()}
              error={errors.name}
            />
            <Input
              ref={priceRef}
              label="Preço (R$)"
              icon="attach-money"
              placeholder="0,00"
              value={price}
              onChangeText={setPrice}
              keyboardType="decimal-pad"
              returnKeyType="next"
              onSubmitEditing={() => quantityRef.current?.focus()}
              error={errors.price}
            />
            <Input
              ref={quantityRef}
              label="Quantidade inicial"
              icon="numbers"
              placeholder="0"
              value={quantity}
              onChangeText={(text) => setQuantity(text.replace(/\D/g, ''))}
              keyboardType="number-pad"
              returnKeyType="done"
              onSubmitEditing={handleSave}
              error={errors.quantity}
            />

            <Button title="Cadastrar produto" icon="save" onPress={handleSave} loading={saving} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}
