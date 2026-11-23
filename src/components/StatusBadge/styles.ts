import { StyleSheet } from 'react-native';

import { themes } from '../../global/themes';

export const style = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    paddingHorizontal: themes.spacing.sm,
    paddingVertical: 2,
    borderRadius: themes.radius.sm,
  },
  text: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  ok: { backgroundColor: themes.colors.successLight },
  low: { backgroundColor: themes.colors.warningLight },
  out: { backgroundColor: themes.colors.dangerLight },
  okText: { color: themes.colors.success },
  lowText: { color: themes.colors.warning },
  outText: { color: themes.colors.danger },
});
