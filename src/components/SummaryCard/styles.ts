import { StyleSheet } from 'react-native';

import { themes } from '../../global/themes';

export const style = StyleSheet.create({
  card: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    paddingVertical: themes.spacing.md,
    borderRadius: themes.radius.md,
    backgroundColor: themes.colors.surface,
    borderWidth: 1,
    borderColor: themes.colors.border,
  },
  value: {
    fontSize: themes.font.lg,
    fontWeight: 'bold',
    color: themes.colors.text,
  },
  label: {
    fontSize: 12,
    color: themes.colors.textMuted,
  },
});
