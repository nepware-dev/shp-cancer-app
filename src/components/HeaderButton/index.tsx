import React, {useCallback} from 'react';
import {Pressable} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';

import COLORS from 'utils/colors';

import styles from './styles';

export const BackButton = () => {
  const navigation = useNavigation();
  const onBackPress = useCallback(() => navigation.goBack(), [navigation]);
  return (
    <Pressable onPress={onBackPress} style={styles.backButton}>
      <Icon color={COLORS.textDarker} name="chevron-back" size={24} />
    </Pressable>
  );
};
