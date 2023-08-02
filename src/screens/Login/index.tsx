import React, {useCallback} from 'react';
import {Button, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import {authorize, appLogin} from 'services/auth';

import styles from './styles';

const Login = () => {
  const navigation = useNavigation<any>();

  const handleLogin = useCallback(async () => {
    try {
      const result = await authorize();
      if (result) {
        appLogin(result);
        navigation.navigate('Home');
      }
    } catch (err) {
      console.log(err);
    }
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Button onPress={handleLogin} title="Login" />
    </View>
  );
};

export default Login;
