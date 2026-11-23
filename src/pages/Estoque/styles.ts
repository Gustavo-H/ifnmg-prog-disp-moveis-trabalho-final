import { StyleSheet } from 'react-native';

import { themes } from '../../global/themes';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.background,
  },
  loading: {
    flex: 1,
  },
  content: {
    padding: themes.spacing.md,
  },
  summary: {
    flexDirection: 'row',
    gap: themes.spacing.sm,
    marginBottom: themes.spacing.sm,
  },
  totalValue: {
    fontSize: themes.font.sm,
    color: themes.colors.textMuted,
    marginBottom: themes.spacing.md,
  },
});
