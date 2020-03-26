import React from 'react';
import NoteHeader from './components/NoteHeader';
import { NoteInfo } from '_types';
import Edit from './components/Edit';
import reactotron from 'reactotronConfig';

interface Props {
  route: {
    params: NoteInfo;
  };
}

export default (props: Props) => {
  const info = props.route.params;
  reactotron.log(info);
  return (
    <>
      <NoteHeader info={info} />
      <Edit noteId={info.noteId} />
    </>
  );
};
