import React, { Component } from 'react';
import { View, ActivityIndicator } from 'react-native';
import palette from '_palette';
import { updateUser } from '_actions/creators/app';
import { connect } from 'react-redux';
import firebase from 'firebase';

interface Prop {
  updateUser: typeof updateUser;
}

class Loading extends Component<Prop> {
  componentDidMount() {
    firebase.auth().onAuthStateChanged(({ email, displayName }) => {
      this.props.updateUser({ displayName, email });
    });
  }

  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size={80} color={palette.primary} />
      </View>
    );
  }
}

export default connect(null, { updateUser })(Loading);