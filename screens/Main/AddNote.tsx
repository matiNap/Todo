import React from 'react';
import { View, StyleSheet } from 'react-native';
import palette from '_palette';
import { Ionicons } from '@expo/vector-icons';

const ICON_SIZE = 60;

export default () => {
  return (
    <View style={styles.container}>
      <Ionicons name="ios-add" style={styles.icon} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE,
    backgroundColor: palette.grayscale.light,
    borderWidth: 3,
    borderColor: palette.secondary,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    justifyContent: 'center',
    transform: [
      {
        translateY: -ICON_SIZE / 1.5,
      },
    ],
  },
  icon: {
    fontSize: ICON_SIZE,
    color: palette.text.primary,
    alignSelf: 'center',
  },
});
