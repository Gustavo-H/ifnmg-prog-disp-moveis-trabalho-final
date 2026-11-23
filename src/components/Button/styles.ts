import { StyleSheet } from 'react-native';

import { themes } from '../../global/themes';

export const style = StyleSheet.create({
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: themes.spacing.sm,
    width: '100%',
    height: 50,
    borderRadius: themes.radius.md,
    backgroundColor: themes.colors.primary,
  },
  danger: {
    backgroundColor: themes.colors.danger,
  },
  disabled: {
    opacity: 0.6,
  },
  title: {
    fontSize: themes.font.md,
    fontWeight: 'bold',
    color: themes.colors.surface,
  },
});
