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
    justifyContent: 'space-between',
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
  value: {
    flex: 1,
    fontSize: themes.font.md,
    color: themes.colors.text,
  },
  placeholder: {
    flex: 1,
    fontSize: themes.font.md,
    color: themes.colors.textMuted,
  },
  error: {
    fontSize: themes.font.sm,
    color: themes.colors.danger,
    marginTop: themes.spacing.xs,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    padding: themes.spacing.lg,
    backgroundColor: themes.colors.overlay,
  },
  sheet: {
    maxHeight: '70%',
    paddingVertical: themes.spacing.md,
    borderRadius: themes.radius.lg,
    backgroundColor: themes.colors.surface,
  },
  sheetTitle: {
    fontSize: themes.font.lg,
    fontWeight: 'bold',
    color: themes.colors.text,
    paddingHorizontal: themes.spacing.md,
    marginBottom: themes.spacing.sm,
  },
  option: {
    paddingVertical: 12,
    paddingHorizontal: themes.spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: themes.colors.border,
  },
  optionSelected: {
    backgroundColor: themes.colors.primaryLight,
  },
  optionLabel: {
    fontSize: themes.font.md,
    color: themes.colors.text,
  },
  optionDescription: {
    fontSize: themes.font.sm,
    color: themes.colors.textMuted,
  },
});
