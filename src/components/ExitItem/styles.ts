import { StyleSheet } from 'react-native';

import { themes } from '../../global/themes';

export const style = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: themes.spacing.sm,
    paddingVertical: 12,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: themes.colors.border,
  },
  info: {
    flex: 1,
  },
  name: {
    fontSize: themes.font.md,
    color: themes.colors.text,
  },
  date: {
    fontSize: 12,
    color: themes.colors.textMuted,
  },
  quantity: {
    fontSize: themes.font.md,
    fontWeight: 'bold',
    color: themes.colors.danger,
  },
});
