import React from 'react';
import NoteHeader from './components/NoteHeader';
import { NoteInfo } from '_types';
import Edit from './components/Edit';
import { View } from 'react-native';

interface Props {
  route: {
    params: NoteInfo;
  };
}

export default (props: Props) => {
  const info = props.route.params;
  return (
    <View style={{ flex: 1 }}>
      <NoteHeader info={info} />
      <Edit noteId={info.noteId} />
    </View>
  );
};
