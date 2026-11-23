import { StyleSheet } from 'react-native';

import { themes } from '../../global/themes';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.background,
  },
  content: {
    padding: themes.spacing.md,
  },
  card: {
    padding: themes.spacing.md,
    borderRadius: themes.radius.lg,
    backgroundColor: themes.colors.surface,
    borderWidth: 1,
    borderColor: themes.colors.border,
  },
});
