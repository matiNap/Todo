import React from 'react';
import { View, StyleSheet, KeyboardAvoidingView } from 'react-native';
import palette from '_palette';
import typography from '_typography';
import { Input, Button, Text } from 'react-native-elements';
import metrics from '_metrics';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import {
  useNavigation,
  NavigationProp,
  NavigationState,
} from '@react-navigation/native';
import firebase from '_firebase';
import ScreenLoader from '_components/ScreenLoader';
import { guestLogin } from '_actions/creators/app';
import { connect } from 'react-redux';

interface Props {
  navigation: NavigationProp<
    Record<string, object | undefined>,
    string,
    NavigationState,
    {},
    {}
  >;
  guestLogin: typeof guestLogin;
}

class SignIn extends React.Component<Props> {
  state = {
    password: '',
    email: '',
    errorMessage: null,
    loggingIn: false,
  };

  login = () => {
    const { email, password } = this.state;
    if (email.length !== 0 || password.length !== 0) {
      this.setState({ loggingIn: true });
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          this.setState({ loggingIn: false });
        })
        .catch((error) => {
          this.setState({
            errorMessage: error.message,
            loggingIn: false,
          });
        });
    } else {
      this.setState({
        errorMessage: 'Enter password and email',
      });
    }
  };

  render() {
    const { navigation } = this.props;
    const { loggingIn, errorMessage, password, email } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.contentContainer}>
          <KeyboardAvoidingView behavior="position" enabled>
            <View>
              <View style={styles.titleContainer}>
                <Text style={styles.appName}>Todo</Text>
                <MaterialCommunityIcons
                  name="playlist-check"
                  style={styles.mainIcon}
                />
              </View>
              <Text style={styles.title}>Login</Text>
            </View>
            <Input
              containerStyle={styles.inputContainer}
              placeholder="Email"
              leftIcon={{
                type: 'material',
                name: 'email',
                color: palette.grayscale.dark,
                size: 30,
              }}
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={(text) => {
                this.setState({ email: text });
              }}
            />
            <Input
              containerStyle={styles.inputContainer}
              placeholder="Password"
              leftIcon={{
                type: 'entypo',
                name: 'lock',
                color: palette.grayscale.dark,
                size: 30,
              }}
              autoCapitalize="none"
              secureTextEntry
              value={password}
              onChangeText={(text) => {
                this.setState({ password: text });
              }}
            />
            {errorMessage && (
              <Text style={styles.errorMessage}>{errorMessage}</Text>
            )}
            <Button
              title="Sign in"
              type="solid"
              buttonStyle={styles.buttonContainerStyle}
              onPress={() => {
                this.login();
              }}
            />

            <Button
              title="Enter as guest"
              type="solid"
              buttonStyle={styles.buttonContainerStyle}
              onPress={() => {
                this.props.guestLogin();
              }}
            />

            <TouchableWithoutFeedback
              onPress={() => {
                navigation.navigate('signUp');
              }}
            >
              <Text style={styles.createAccountLink}>
                {"Don't have any account? "}
              </Text>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
        <ScreenLoader visible={loggingIn} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  errorMessage: {
    fontSize: typography.fontSize.small,
    color: palette.actions.error,
    alignSelf: 'center',
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: '15%',
  },
  mainIcon: {
    fontSize: 50,
    color: palette.text.primary,
  },
  appName: {
    color: palette.text.primary,
    fontSize: 38,
    marginRight: 20,
  },
  title: {
    color: palette.text.primary,
    alignSelf: 'center',
    fontSize: typography.fontSize.medium,
    marginTop: '5%',
    marginBottom: metrics.margin.normal,
  },
  orText: {
    color: palette.grayscale.medium,
    fontSize: typography.fontSize.small,
    alignSelf: 'center',
    marginVertical: metrics.margin.normal,
  },
  buttonContainerStyle: {
    marginTop: metrics.margin.medium,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    width: '90%',
    alignSelf: 'center',
    marginTop: metrics.margin.big,
  },

  inputContainer: {
    marginVertical: metrics.margin.medium,
  },
  leftIconStyle: {
    color: palette.grayscale.dark,
    fontSize: 28,
  },
  googleButtonStyle: {
    backgroundColor: palette.grayscale.light,
  },

  createAccountLink: {
    textDecorationLine: 'underline',
    fontSize: typography.fontSize.small,
    marginTop: metrics.margin.medium,
    alignSelf: 'center',
  },
});

export default connect(null, { guestLogin })((props) => {
  const navigation = useNavigation();
  return <SignIn navigation={navigation} {...props} />;
});
