import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

interface Props {
  value: string;
  onChangeText(text: string): void;
}

export default (props: Props) => {
  const { onChangeText, value } = props;
  return (
    <TextInput
      value={value}
      style={styles.input}
      onChangeText={onChangeText}
    />
  );
};

const styles = StyleSheet.create({
  input: { marginLeft: 5 },
});
