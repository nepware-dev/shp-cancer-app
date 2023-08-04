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
    borderColor: 'rgba(1, 112, 185, 0.16)',
    borderWidth: 1,
    backgroundColor: COLORS.white,
  },
  itemWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionSetItemText: {
    fontFamily: 'Manrope-Regular',
    color: COLORS.textDarker,
    fontSize: 13,
    flex: 1,
  },
  iconWrapper: {
    marginLeft: 10,
  },
});
