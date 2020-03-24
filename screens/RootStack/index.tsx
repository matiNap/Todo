import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Main from './Main';
import Notepad from './Notepad';

const RootStack = createStackNavigator();

export default () => {
  return (
    <RootStack.Navigator>
      <RootStack.Screen
        name="main"
        component={Main}
        options={{ headerShown: false }}
      />
      <RootStack.Screen
        name="notepad"
        component={Notepad}
        options={{ headerShown: false }}
      />
    </RootStack.Navigator>
  );
};
