import firebase from '_firebase';
import 'firebase/firestore';

export const getUserRef = () => {
  const { uid } = firebase.auth().currentUser;
  return firebase.firestore().collection('users').doc(uid);
};

export const getNoteRef = (noteId: string) => {
  return getUserRef().collection('notes').doc(noteId);
};
