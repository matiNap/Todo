export type User = {
  email: string;
  displayName: string;
  uid: string;
};

export type Point = {
  title: string;
  id: string;
  done: boolean;
  imageUri: string | undefined;
};

export type NoteInfo = {
  date: string;
  title: string;
  noteId: string;
};

export type Note = {
  info: NoteInfo;
  points: Point[];
};
