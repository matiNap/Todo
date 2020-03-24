import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SignIn from './SignIn';
import SignUp from './SignUp';
import Loading from './Loading';
import { KeyboardAvoidingView } from 'react-native';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="loading" component={Loading} />

      <Stack.Screen name="signIn" component={SignIn} />

      <Stack.Screen name="signUp" component={SignUp} />
    </Stack.Navigator>
  );
};
