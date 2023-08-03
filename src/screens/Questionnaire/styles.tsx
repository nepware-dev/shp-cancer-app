import {StyleSheet} from 'react-native';

import COLORS from 'utils/colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    paddingTop: 12,
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Manrope-Bold',
    color: COLORS.titleText,
  },
  text: {
    fontFamily: 'Manrope-Regular',
    color: COLORS.textDarker,
    textAlign: 'center',
  },
});
