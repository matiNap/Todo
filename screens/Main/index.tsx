import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import List from './List';
import Profile from './Profile';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ListTabComponent from './List/components/TabComponent';
import ProfileTabComponent from './Profile/components/TabComponent';
import palette from '_palette';
import typography from '_typography';
import AddNote from './AddNote';

const Tab = createBottomTabNavigator();

export default () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        return {
          tabBarIcon: ({ focused }) => {
            const iconStyle = focused
              ? styles.iconStyleFocused
              : styles.iconStyle;
            if (route.name === 'List') {
              return <ListTabComponent iconStyle={iconStyle} />;
            } else if (route.name == 'Profile') {
              return <ProfileTabComponent iconStyle={iconStyle} />;
            }
          },
        };
      }}
      tabBarOptions={{
        activeTintColor: palette.primary,
        inactiveTintColor: palette.text.primary,
        labelStyle: {
          fontFamily: typography.fonts.primary,
          fontWeight: 'bold',
          fontSize: typography.fontSize.verySmall,
        },
      }}
    >
      <Tab.Screen name="List" component={List} />
      {/* It is component for middle add button */}
      <Tab.Screen
        name=" "
        component={() => null}
        options={{
          tabBarButton: () => <AddNote />,
        }}
      />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  iconStyle: {
    color: palette.text.primary,
    fontSize: 28,
  },
  iconStyleFocused: {
    color: palette.primary,
    fontSize: 32,
  },
});
