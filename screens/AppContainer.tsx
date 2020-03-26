import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { connect } from 'react-redux';
import { RootState } from '_rootReducer';
import Main from './RootStack';

import Auth from './Auth';
import { User } from 'firebase';

const Stack = createStackNavigator();

interface Props {
  user: User;
}

const AppContainer = (props: Props) => {
  const { user } = props;

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          <Stack.Screen
            name="main"
            component={Main}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="auth"
            component={Auth}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const mapStateToProps = (state: RootState) => {
  return {
    user: state.app.user,
  };
};

export default connect(mapStateToProps)(AppContainer);
