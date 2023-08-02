import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import Home from 'screens/HomeScreen';
import Login from 'screens/Login';

import type {RootState} from 'store';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {isAuthenticated} = useSelector((state: RootState) => state.auth);

  return (
    <Stack.Navigator initialRouteName={isAuthenticated ? 'Home' : 'Login'}>
      {isAuthenticated ? (
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      ) : (
        <Stack.Screen name="Login" component={Login} />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
