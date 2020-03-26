import firebase from 'firebase';
import 'firebase/firestore';
import reactotron from 'reactotronConfig';

export const getUserRef = () => {
  const { uid } = firebase.auth().currentUser;
  reactotron.log(uid);
  return firebase
    .firestore()
    .collection('users')
    .doc(uid);
};

export const getNoteRef = (noteId: string) => {
  return getUserRef()
    .collection('notes')
    .doc(noteId);
};
