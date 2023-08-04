import React, {useCallback} from 'react';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import {useSelector} from 'react-redux';

import Home from 'screens/HomeScreen';
import Login from 'screens/Login';
import ResultScreen from 'screens/ResultScreen';
import Questionnaire from 'screens/Questionnaire';
import QuestionSets from 'screens/QuestionSets';

import {BackButton} from 'components/HeaderButton';

import type {RootState} from 'store';
import COLORS from 'utils/colors';

type RootStackParamList = {
  Home: undefined;
  Login: undefined;
  Result: undefined;
  QuestionSets: undefined;
  Questionnaire: undefined;
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

const Stack = createNativeStackNavigator<RootStackParamList>();

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
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="QuestionSets"
            component={QuestionSets}
            options={{
              headerTitle: 'Questions sets',
              statusBarColor: COLORS.lightBlue,
              headerStyle: {
                backgroundColor: COLORS.lightBlue,
              },
            }}
          />
          <Stack.Screen
            name="Questionnaire"
            component={Questionnaire}
            options={{
              headerTitle: 'Questions',
              statusBarColor: COLORS.lightBlue,
              headerStyle: {
                backgroundColor: COLORS.lightBlue,
              },
            }}
          />
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
        </>
      ) : (
        <Stack.Screen
          options={{headerShown: false}}
          name="Login"
          component={Login}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;
