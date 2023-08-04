import React, {useEffect} from 'react';
import {ActivityIndicator, Modal, View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import COLORS from 'utils/colors';

import styles from './styles';

interface AnalyzingLoaderProps {
  loading?: boolean;
}

export const AnalyzingLoader = (props: AnalyzingLoaderProps) => {
  const {loading} = props;

  const navigation = useNavigation();
  useEffect(() => {
    if (loading) {
      navigation.setOptions({
        statusBarColor: '#000000CC',
      });
    } else {
      navigation.setOptions({
        statusBarColor: COLORS.lightBlue,
      });
    }
  }, [navigation, loading]);

  return (
    <Modal transparent animationType="fade" visible={loading}>
      <View style={styles.modalBackground}>
        <ActivityIndicator
          animating={loading}
          size="large"
          color={COLORS.primary}
        />
        <Text style={styles.loaderText}>Analyzing</Text>
      </View>
    </Modal>
  );
};
