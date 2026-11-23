import { StyleSheet } from 'react-native';

import { themes } from '../../global/themes';

export const style = StyleSheet.create({
  wrapper: {
    width: '100%',
    marginBottom: themes.spacing.md,
  },
  label: {
    fontSize: themes.font.sm,
    fontWeight: '600',
    color: themes.colors.text,
    marginBottom: themes.spacing.xs,
  },
  field: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: themes.spacing.sm,
    height: 50,
    paddingHorizontal: themes.spacing.md,
    borderWidth: 1,
    borderColor: themes.colors.border,
    borderRadius: themes.radius.md,
    backgroundColor: themes.colors.surface,
  },
  fieldError: {
    borderColor: themes.colors.danger,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: themes.font.md,
    color: themes.colors.text,
  },
  error: {
    fontSize: themes.font.sm,
    color: themes.colors.danger,
    marginTop: themes.spacing.xs,
  },
});
