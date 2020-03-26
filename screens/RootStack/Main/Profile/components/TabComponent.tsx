import React, { CSSProperties } from 'react';
import { Ionicons } from '@expo/vector-icons';

export default (props: { iconStyle: CSSProperties }) => {
  return <Ionicons name="ios-person" style={props.iconStyle} />;
};
