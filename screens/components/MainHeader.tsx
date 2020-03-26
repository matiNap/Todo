import React from 'react';
import { Text } from 'react-native';
import palette from '_palette';
import { Header } from 'react-native-elements';
import typography from '_typography';

export default (props: { title: string }) => {
  const { title } = props;
  return (
    <Header
      containerStyle={{
        borderBottomColor: palette.grayscale.light,
        borderBottomWidth: 1.5,
      }}
      barStyle="dark-content"
      backgroundColor={palette.secondary}
      centerComponent={() => (
        <Text style={{ fontSize: typography.fontSize.medium }}>
          {title}
        </Text>
      )}
    />
  );
};
