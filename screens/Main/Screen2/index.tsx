import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Text } from 'react-native-elements';

const Screen2 = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Screen 2</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Screen2;
