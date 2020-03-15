import React from 'react';
import { View, StyleSheet } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { Button, Text } from 'react-native-elements';

const Screen1 = props => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>Screen 1</Text>
      <Button
        title="Screen 2"
        onPress={() => {
          navigation.navigate('screen2');
        }}
      />
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

export default Screen1;
