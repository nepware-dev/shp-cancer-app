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
  pickerContainer: {
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    borderRadius: 4,
  },
  picker: {
    color: COLORS.textDarker,
    fontFamily: 'Manrope-SemiBold',
  },
});
