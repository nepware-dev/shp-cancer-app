import {StyleSheet} from 'react-native';

import COLORS from 'utils/colors';

export default StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: COLORS.white,
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderRadius: 8,
    backgroundColor: COLORS.white,
    elevation: 5,
    shadowColor: 'rgba(0, 0, 0, 0.3)',
  },
  emoji: {
    height: 150,
    resizeMode: 'contain',
  },
  heading: {
    color: COLORS.titleText,
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'Manrope-Bold',
    marginTop: 42,
    marginBottom: 24,
  },
  message: {
    color: COLORS.descText,
    fontSize: 16,
    letterSpacing: 0.64,
    textAlign: 'center',
    fontFamily: 'Manrope-Regular',
  },
});
