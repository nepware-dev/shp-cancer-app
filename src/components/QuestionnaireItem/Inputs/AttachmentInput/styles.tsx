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
  attachmentsContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    paddingRight: 20,
    minHeight: 64,
  },
  attachmentItem: {
    backgroundColor: 'pink',
    position: 'relative',
  },
  removeIcon: {
    position: 'absolute',
    top: 2,
    right: 2,
    backgroundColor: COLORS.primary,
    borderRadius: 25,
  },
  attachmentImage: {
    width: 100,
    height: 80,
    borderRadius: 4,
  },
  addIconContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 42,
    height: 42,
    borderRadius: 50,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: COLORS.primary,
    backgroundColor: COLORS.lightBlue,
  },
});
