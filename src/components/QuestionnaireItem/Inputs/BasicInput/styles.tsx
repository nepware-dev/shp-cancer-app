import {StyleSheet} from 'react-native';

import COLORS from 'utils/colors';

export default StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  inputLabel: {
    color: COLORS.descText,
    fontFamily: 'Manrope-SemiBold',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: COLORS.textDarker,
    fontFamily: 'Manrope-SemiBold',
  },
});
