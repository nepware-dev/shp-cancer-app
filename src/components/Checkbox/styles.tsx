import {StyleSheet} from 'react-native';

import COLORS from 'utils/colors';

export default StyleSheet.create({
  checkboxItem: {
    paddingVertical: 4,
    marginVertical: 4,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  label: {
    fontFamily: 'Manrope-Regular',
    color: COLORS.textDarker,
  },
});
