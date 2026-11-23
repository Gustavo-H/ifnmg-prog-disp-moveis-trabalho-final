import { StyleSheet } from 'react-native';

import { themes } from '../../global/themes';

export const style = StyleSheet.create({
  safeArea: {
    backgroundColor: themes.colors.primary,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: themes.spacing.md,
    paddingVertical: themes.spacing.md,
  },
  title: {
    fontSize: themes.font.xl,
    fontWeight: 'bold',
    color: themes.colors.surface,
  },
  subtitle: {
    fontSize: themes.font.sm,
    color: themes.colors.primaryLight,
  },
});
