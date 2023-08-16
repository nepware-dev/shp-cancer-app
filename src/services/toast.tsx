import React from 'react';
import {BaseToast, type BaseToastProps} from 'react-native-toast-message';

import COLORS from 'utils/colors';

const successToastStyle = {
  height: 'auto',
  paddingVertical: 18,
  backgroundColor: 'rgba(0,0,0,0.8)',
  borderLeftColor: COLORS.success,
};
const errorToastStyle = {
  height: 'auto',
  paddingVertical: 18,
  backgroundColor: 'rgba(0,0,0,0.8)',
  borderLeftColor: COLORS.error,
};

const text1Style = {
  color: COLORS.white,
  fontFamily: 'Manrope-SemiBold',
  fontSize: 14,
};
const text2Style = {
  color: COLORS.white,
  fontFamily: 'Manrope-Regular',
  fontSize: 14,
};

export const toastConfig = {
  success: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      // @ts-expect-error 'auto' works for height but typescript doesn't agree!
      style={successToastStyle}
      text1Style={text1Style}
      text2Style={text2Style}
      text1NumberOfLines={2}
      text2NumberOfLines={3}
    />
  ),
  error: (props: BaseToastProps) => (
    <BaseToast
      {...props}
      // @ts-expect-error 'auto' works for height but typescript doesn't agree!
      style={errorToastStyle}
      text1Style={text1Style}
      text2Style={text2Style}
      text1NumberOfLines={2}
      text2NumberOfLines={3}
    />
  ),
};
