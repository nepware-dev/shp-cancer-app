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
  text: {
    fontFamily: 'Manrope-Regular',
    color: COLORS.textDarker,
    textAlign: 'center',
  },
  questionSetItem: {
    marginVertical: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 4,
    borderColor: COLORS.inputBorder,
    borderWidth: 1,
    backgroundColor: COLORS.white,
    // elevation: 1,
    // shadowColor: '#3D3A40',
    // shadowOpacity: 0.16,
  },
  questionSetItemText: {
    fontFamily: 'Manrope-Regular',
    color: COLORS.textDarker,
  },
});
