import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Home from 'screens/Home';
import Login from 'screens/Login';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
