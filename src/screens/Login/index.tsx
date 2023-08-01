import React, {useCallback} from 'react';
import {Button, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import styles from './styles';

const Login = () => {
  const navigation = useNavigation<any>();

  const handleLogin = useCallback(() => {
    navigation.navigate('Home');
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Button onPress={handleLogin} title="Login" />
    </View>
  );
};

export default Login;
