import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import metrics from '_metrics';
import palette from '_palette';

export default (props: { title: string }) => {
  const { title } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: palette.secondary,
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: metrics.statusBarHeight + 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    paddingBottom: 15,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
  },
});
