import React, {useCallback} from 'react';
import {Text, View, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import Button from 'components/Button';

import {authorize, appLogin} from 'services/auth';
import {NavigationProps} from 'navigation';

import styles from './styles';

const Login = () => {
  const navigation = useNavigation<NavigationProps>();

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
      <View style={styles.content}>
        <Image style={styles.logo} source={require('assets/images/logo.png')} />
        <Text style={styles.heading}>
          Welcome to Cervical Cancer Screening App
        </Text>
        <Text style={styles.message}>Login to manage your application</Text>
        <Image
          style={styles.doctorImage}
          source={require('assets/images/login.png')}
        />
      </View>
      <Button onPress={handleLogin} title="Login as Practitioner" />
    </View>
  );
};

export default Login;
