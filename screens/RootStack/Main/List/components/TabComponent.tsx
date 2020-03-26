import React, { CSSProperties } from 'react';
import { Entypo } from '@expo/vector-icons';

export default (props: { iconStyle: CSSProperties }) => {
  return <Entypo name="list" style={props.iconStyle} />;
};
