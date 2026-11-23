import { StyleSheet } from 'react-native';

import { themes } from '../../global/themes';

export const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: themes.colors.background,
  },
  content: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: themes.spacing.lg,
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: themes.colors.primary,
    marginBottom: themes.spacing.md,
  },
  title: {
    fontSize: themes.font.xl,
    fontWeight: 'bold',
    color: themes.colors.text,
    marginBottom: themes.spacing.xl,
  },
  form: {
    width: '100%',
    maxWidth: 400,
  },
  error: {
    fontSize: themes.font.sm,
    color: themes.colors.danger,
    textAlign: 'center',
    marginBottom: themes.spacing.md,
  },
});
