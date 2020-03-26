import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import palette from '_palette';

interface Props {
  visible: boolean;
}

export default (props: Props) => {
  const { visible } = props;
  if (visible) {
    return (
      <View
        style={[
          StyleSheet.absoluteFill,
          {
            justifyContent: 'center',
            backgroundColor: 'rgba(0,0,0,0.5)',
          },
        ]}
      >
        <ActivityIndicator size={80} color={palette.primary} />
      </View>
    );
  } else return null;
};
