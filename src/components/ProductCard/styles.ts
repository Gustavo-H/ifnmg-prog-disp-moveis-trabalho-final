import { StyleSheet } from 'react-native';

import { themes } from '../../global/themes';

export const style = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: themes.spacing.md,
    marginBottom: themes.spacing.sm,
    borderRadius: themes.radius.md,
    backgroundColor: themes.colors.surface,
    borderWidth: 1,
    borderColor: themes.colors.border,
  },
  info: {
    flex: 1,
    gap: themes.spacing.xs,
  },
  name: {
    fontSize: themes.font.md,
    fontWeight: 'bold',
    color: themes.colors.text,
  },
  price: {
    fontSize: themes.font.sm,
    color: themes.colors.textMuted,
  },
  quantityBox: {
    alignItems: 'center',
    minWidth: 56,
  },
  quantity: {
    fontSize: themes.font.xl,
    fontWeight: 'bold',
    color: themes.colors.text,
  },
  unit: {
    fontSize: 12,
    color: themes.colors.textMuted,
  },
});
