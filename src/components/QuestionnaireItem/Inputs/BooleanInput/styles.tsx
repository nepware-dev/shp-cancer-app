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
  optionsContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 24,
  },
  optionItem: {
    flex: 1,
    flexDirection: 'row-reverse',
    borderRadius: 4,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    gap: 12,
  },
  optionItemSelected: {
    backgroundColor: COLORS.lightBlue,
    borderColor: COLORS.primary,
  },
  optionItemText: {
    color: COLORS.descText,
    fontFamily: 'Manrope-SemiBold',
    fontSize: 14,
  },
});
