import React from 'react';
import { View, StyleSheet } from 'react-native';
import MainHeader from '_components/MainHeader';
import palette from '_palette';
import { ListItem, Text } from 'react-native-elements';
import { connect } from 'react-redux';
import { RootState } from '_rootReducer';
import { User } from '_types';
import typography from '_typography';
import { AntDesign } from '@expo/vector-icons';
import { logOut } from '_actions/creators/app';
import globals from '_globals';
import reactotron from 'reactotronConfig';

interface Props {
  user: User;
  logOut: typeof logOut;
}

const Profile = (props: Props) => {
  if (props.user) {
    const { displayName, email } = props.user;
    const isGuest = props.user === globals.guest;

    return (
      <View style={{ flex: 1, backgroundColor: palette.secondary }}>
        <MainHeader title="Profile" />

        {!isGuest && (
          <ListItem
            containerStyle={{ backgroundColor: palette.secondary }}
            key="name"
            leftAvatar={() => {
              return <Text>Name: </Text>;
            }}
            title={displayName}
            titleStyle={styles.title}
            bottomDivider
          />
        )}
        {!isGuest && (
          <ListItem
            containerStyle={{ backgroundColor: palette.secondary }}
            key="email"
            leftAvatar={() => {
              return <Text>Email: </Text>;
            }}
            title={() => (
              <Text style={styles.email} numberOfLines={1}>
                {email}
              </Text>
            )}
            bottomDivider
          />
        )}
        {isGuest && (
          <View style={styles.guestInfoContainer}>
            <Text style={styles.guestInfo}>Guest account</Text>
            <Text style={styles.guestInfo}>
              You can only store data locally
            </Text>
          </View>
        )}
        <ListItem
          key="logout"
          onPress={() => {
            props.logOut();
          }}
          containerStyle={{ backgroundColor: palette.secondary }}
          key="email"
          leftIcon={() => (
            <View
              style={{
                padding: 3,
                borderRadius: 10,
              }}
            >
              <AntDesign style={styles.logOut} name="logout" />
            </View>
          )}
          title={'Log out'}
          titleStyle={{ fontSize: typography.fontSize.normal }}
        />
      </View>
    );
  } else {
    return <View />;
  }
};

const styles = StyleSheet.create({
  email: {
    color: palette.grayscale.dark,
    fontSize: typography.fontSize.small,
  },
  title: {
    color: palette.grayscale.dark,
    fontSize: typography.fontSize.normal,
  },
  logOut: {
    fontSize: 25,
    color: palette.text.primary,
  },
  guestInfo: {
    color: palette.grayscale.dark,
  },
  guestInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 35,
    paddingBottom: 15,
  },
});

const mapStateToProps = (state: RootState) => {
  return {
    user: state.app.user,
  };
};

export default connect(mapStateToProps, { logOut })(Profile);
