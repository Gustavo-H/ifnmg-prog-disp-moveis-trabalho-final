import { StyleSheet } from 'react-native';

import { themes } from '../../global/themes';

export const style = StyleSheet.create({
  safeArea: {
    backgroundColor: themes.colors.surface,
    borderTopWidth: 1,
    borderTopColor: themes.colors.border,
  },
  container: {
    flexDirection: 'row',
    paddingVertical: themes.spacing.sm,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  iconBox: {
    paddingHorizontal: themes.spacing.md,
    paddingVertical: 2,
    borderRadius: themes.radius.lg,
  },
  iconBoxFocused: {
    backgroundColor: themes.colors.primaryLight,
  },
  label: {
    fontSize: 12,
    color: themes.colors.textMuted,
  },
  labelFocused: {
    fontWeight: 'bold',
    color: themes.colors.primary,
  },
});
