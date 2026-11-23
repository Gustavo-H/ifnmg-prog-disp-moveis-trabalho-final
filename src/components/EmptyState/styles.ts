import { StyleSheet } from 'react-native';

import { themes } from '../../global/themes';

export const style = StyleSheet.create({
  container: {
    alignItems: 'center',
    gap: themes.spacing.sm,
    paddingVertical: themes.spacing.xl,
  },
  message: {
    fontSize: themes.font.md,
    color: themes.colors.textMuted,
    textAlign: 'center',
  },
});
