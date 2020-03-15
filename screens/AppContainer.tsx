import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Screen1 from './Main/Screen1';
import Screen2 from './Main/Screen2';

const Stack = createStackNavigator();

export default () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="screen1" component={Screen1} />
        <Stack.Screen name="screen2" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
