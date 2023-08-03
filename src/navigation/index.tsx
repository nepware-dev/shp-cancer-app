import React, {useCallback} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import Home from 'screens/HomeScreen';
import Login from 'screens/Login';
import ResultScreen from 'screens/ResultScreen';

import {BackButton} from 'components/HeaderButton';

import type {RootState} from 'store';
import COLORS from 'utils/colors';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);

  const renderBackButton = useCallback(() => {
    return <BackButton />;
  }, []);

  return (
    <Stack.Navigator
      screenOptions={{
        statusBarColor: COLORS.white,
        statusBarStyle: 'dark',
        statusBarTranslucent: true,
        headerLeft: renderBackButton,
        headerShadowVisible: false,
        headerTitleStyle: {
          fontSize: 18,
          fontFamily: 'Manrope-SemiBold',
          color: COLORS.textDarker,
        },
      }}
      initialRouteName={isAuthenticated ? 'Home' : 'Login'}>
      {isAuthenticated ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
      )}
      <Stack.Screen
        name="Result"
        component={ResultScreen}
        options={{
          statusBarColor: COLORS.lightBlue,
          headerStyle: {
            backgroundColor: COLORS.lightBlue,
          },
        }}
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
