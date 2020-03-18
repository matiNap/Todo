import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Screen1 from './Screen1';

const Stack = createStackNavigator();

export default () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="sc1"
        component={Screen1}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
