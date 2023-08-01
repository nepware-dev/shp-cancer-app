import React, {useEffect} from 'react';
import {StatusBar} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from 'react-native-splash-screen';

import AppNavigator from './navigation';

function App(): JSX.Element {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <>
      <StatusBar
        translucent
        barStyle={'dark-content'}
        backgroundColor={'white'}
      />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </>
  );
}

export default App;
