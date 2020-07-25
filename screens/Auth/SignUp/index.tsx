import React from 'react';
import {
  Text,
  View,
  StyleSheet,
  KeyboardAvoidingView,
} from 'react-native';
import { Input, Button } from 'react-native-elements';
import metrics from '_metrics';
import typography from '_typography';
import {
  useNavigation,
  NavigationProp,
  NavigationState,
} from '@react-navigation/native';
import firebase from '_firebase';
import palette from '_palette';

interface Props {
  navigation: NavigationProp<
    Record<string, object | undefined>,
    string,
    NavigationState,
    {},
    {}
  >;
}

class SignUp extends React.Component<Props> {
  state = {
    email: '',
    password: '',
    username: '',
    errorMessage: null,
  };
  createAccount = () => {
    const { password, email, username } = this.state;
    const { navigation } = this.props;
    if (
      password.length !== 0 ||
      email.length !== 0 ||
      username.length !== 0
    ) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then((userRecord) => {
          userRecord.user?.updateProfile({ displayName: username });
          navigation.navigate('signIn');
        })
        .catch((error) => {
          this.setState({ errorMessage: error.message });
        });
    } else {
      this.setState({ errorMessage: 'Enter all fields.' });
    }
  };

  render() {
    const { errorMessage, email, password, username } = this.state;
    return (
      <View style={{ flex: 1 }}>
        <KeyboardAvoidingView behavior="position">
          <View style={styles.container}>
            <Text style={styles.title}>Create account</Text>
            <Input
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              onChangeText={(text) => {
                this.setState({ email: text });
              }}
              value={email}
            />
            <Input
              placeholder="Username"
              autoCapitalize="none"
              onChangeText={(text) => {
                this.setState({ username: text });
              }}
              value={username}
            />
            <Input
              placeholder="Password"
              secureTextEntry
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
              value={password}
            />
            <Button
              containerStyle={styles.buttonStyle}
              title="Sign up"
              onPress={this.createAccount}
            />
            {errorMessage && (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}
          </View>
        </KeyboardAvoidingView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    width: '90%',
    alignSelf: 'center',
    marginTop: '20%',
  },
  title: {
    fontSize: typography.fontSize.big,
    alignSelf: 'center',
    marginBottom: metrics.margin.medium,
  },
  buttonStyle: {
    marginTop: metrics.margin.medium,
  },
  errorMessage: {
    fontSize: typography.fontSize.small,
    color: palette.actions.error,
    alignSelf: 'center',
    marginTop: metrics.margin.medium,
  },
});

export default () => {
  const navigation = useNavigation();
  return <SignUp navigation={navigation} />;
};
