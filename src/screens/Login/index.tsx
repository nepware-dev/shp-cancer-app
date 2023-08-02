import React, {useCallback} from 'react';
import {Button, Text, View} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {authorize} from 'react-native-app-auth';
import {useDispatch} from 'react-redux';
import {FHIR_BASE_URL, FHIR_CLIENT_ID} from '@env';

import FHIR from 'services/fhir';
import {encode} from 'utils/codec';
import {setLogin, setToken, setRefreshToken} from 'store/slices/auth';

import styles from './styles';

const DEFAULT_LAUNCH_PARAMS = {
  launch_type: 'provider-ehr',
  patient: '',
  provider: '',
  encounter: 'AUTO',
  skip_login: false,
  skip_auth: false,
  sim_ehr: false,
  scope:
    'patient/*.* user/*.* launch launch/patient launch/encounter openid fhirUser profile offline_access',
  redirect_uris: '',
  client_id: 'whatever',
  client_secret: '',
  client_type: 'public',
  pkce: 'auto',
};

const encodedLaunchParams = encode(DEFAULT_LAUNCH_PARAMS);
const config = {
  issuer: FHIR_BASE_URL,
  clientId: FHIR_CLIENT_ID,
  redirectUrl: 'com.nepware.fhr://oauth',
  scopes: ['user/*.*', 'openid', 'profile', 'fhirUser', 'offline_access'],
  additionalParameters: {
    responseType: 'code',
    launch: encodedLaunchParams,
    aud: `${FHIR_BASE_URL}/fhir`,
  },
  serviceConfiguration: {
    authorizationEndpoint: `${FHIR_BASE_URL}/auth/authorize`,
    tokenEndpoint: `${FHIR_BASE_URL}/auth/token`,
  },
};

const Login = () => {
  const navigation = useNavigation<any>();

  const dispatch = useDispatch();

  const handleLogin = useCallback(async () => {
    try {
      const result = await authorize(config);
      const {accessToken, refreshToken} = result;
      dispatch(setLogin());
      dispatch(setToken(accessToken));
      dispatch(setRefreshToken(refreshToken));
      FHIR.getUserInfo();
      navigation.navigate('Home');
    } catch (err) {
      console.log(err);
    }
  }, [navigation, dispatch]);
  return (
    <View style={styles.container}>
      <Text>Login Screen</Text>
      <Button onPress={handleLogin} title="Login" />
    </View>
  );
};

export default Login;
