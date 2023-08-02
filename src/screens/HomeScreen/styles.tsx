import {StyleSheet} from 'react-native';
import COLORS from '../../utils/colors';

export default StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    display: 'flex',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  content: {
    display: 'flex',
    alignItems: 'center',
  },
  logo: {
    marginTop: 32,
    height: 100,
    resizeMode: 'contain',
  },
  heading: {
    color: COLORS.titleText,
    fontSize: 36,
    lineHeight: 49.18,
    textAlign: 'center',
    fontFamily: 'Manrope-Bold',
    marginVertical: 16,
  },
  message: {
    color: COLORS.descText,
    fontSize: 16,
    lineHeight: 21.86,
    letterSpacing: 0.64,
    textAlign: 'center',
    fontFamily: 'Manrope-Regular',
    maxWidth: 300,
  },
  doctorImage: {
    marginTop: 45,
    width: 301,
    height: 310,
    resizeMode: 'contain',
  },
  logoutButton: {
    marginVertical: 12,
  },
});
