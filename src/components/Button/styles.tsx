import {StyleSheet} from 'react-native';

import COLORS from '../../utils/colors';

export default StyleSheet.create({
  button: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: COLORS.primary,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 28,
    fontFamily: 'Manrope-Regular',
    color: '#ffffff',
    textAlign: 'center',
  },
});
