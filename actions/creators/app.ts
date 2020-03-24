import { User } from 'firebase';
import * as types from '_actions/app';
import { AppThunk } from '_rootReducer';
import { Point } from '_types';
import idGen from 'uid';
import firebase from 'firebase';
import reactotron from 'reactotron-react-native';
import 'firebase/firestore';
import NetInfo from '@react-native-community/netinfo';

export const updateUser = (
  user: User,
): AppThunk => async dispatch => {
  dispatch({
    type: types.UPDATE_USER,
    payload: user,
  });
};

export const addNote = (title: string): AppThunk => async (
  dispatch,
  getState,
) => {
  const noteId = idGen();
  const date = new Date().getTime();
  const { uid } = getState().app.user;
  try {
    dispatch({
      type: types.ADD_NOTE,
      payload: {
        title,
        noteId,
        date,
      },
    });
    firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('notes')
      .doc(noteId)
      .set({
        noteId,
        title,
        date,
      });
  } catch (error) {
    reactotron.log(error.message);
  }
};

export const syncDatabase = (): AppThunk => async (
  dispatch,
  getState,
) => {
  try {
    const { uid } = getState().app.user;
    const localSyncDate = getState().app.syncDate;
    const userRef = firebase
      .firestore()
      .collection('users')
      .doc(uid);
    const snapshot = await userRef.get();
    const data = snapshot.data();
    const serverSyncDate =
      data && data.syncDate ? data.syncDate : null;
    const netState = await NetInfo.fetch();
    if (
      netState.isConnected &&
      serverSyncDate &&
      serverSyncDate - localSyncDate <= 0
    ) {
      const { notes, points } = getState().app;
      reactotron.log('Sync');
      reactotron.log(notes);
      for (const (note) of Object.values(notes)) {
        const { noteId } = note;
        firebase
          .firestore()
          .collection('users')
          .doc(uid)
          .collection('notes')
          .doc(noteId)
          .update({
            ...note,
          });
        const imageUri = await uploadPhoto(
          points[noteId].imageUri,
          uid,
          noteId,
          points[noteId].id,
        );
        reactotron.log(imageUri);
        firebase
          .firestore()
          .collection('users')
          .doc(uid)
          .collection('notes')
          .doc(noteId)
          .update({
            points: points[noteId]
              ? {
                  ...points[noteId],
                  imageUri,
                }
              : {},
          });
      }

      const newSyncDate = new Date().getTime();
      userRef.update({
        syncDate: newSyncDate,
      });
      dispatch({
        type: types.SYNC_DATA,
        payload: {
          syncDate: newSyncDate,
        },
      });
    } else {
      if (netState.isConnected) {
        listenNotes()(dispatch, getState);
        const newSyncDate = new Date().getTime();
        userRef.set({
          syncDate: newSyncDate,
        });
      }
      dispatch({
        type: types.SYNC_DATA,
        payload: {
          syncDate: newSyncDate,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const uploadPhoto = async (
  uri: string,
  uid: string,
  noteId: string,
  pointId: string,
) => {
  const path = `photos/${uid}/${idGen()}`;
  const response = await fetch(uri);
  const file = await response.blob();

  return new Promise(async (resolve, reject) => {
    try {
      const imageResponse = await firebase
        .storage()
        .ref(path)
        .put(file);

      firebase
        .firestore()
        .collection('users')
        .doc(uid)
        .collection('notes')
        .doc(noteId)
        .update({
          [pointId]: {
            imageUri: imageResponse.downloadURL,
          },
        });

      resolve(path);
    } catch (error) {
      reactotron.log(error);
    }
  });
};

export const addImageToPoint = (
  uri: string,
  noteId: string,
  pointId: string,
): AppThunk => async (dispatch, getState) => {
  try {
    const { uid } = getState().app.user;
    dispatch({
      type: types.ADD_IMAGE,
      payload: {
        uri,
        noteId,
        pointId,
      },
    });
    const remoteUri = await uploadPhoto(uri, uid);
    reactotron.log(`remote ${remoteUri}`);
  } catch (error) {
    console.log(error);
  }
};

export const listenNotes = (): AppThunk => async (
  dispatch,
  getState,
) => {
  try {
    const { uid } = getState().app.user;

    const notesRef = firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('notes');

    const snapshot = await notesRef.limit(20).get();
    snapshot.docs.forEach(async snapshot => {
      dispatch({
        type: types.ADD_NOTE,
        payload: {
          ...snapshot.data(),
        },
      });
    });
  } catch (error) {
    reactotron.log(error.message);
  }
};

export const editPoint = (
  noteId: string,
  pointId: string,
  data: {
    title: string;
    done: boolean;
  },
) => ({
  type: types.EDIT_POINT,
  payload: {
    data,
    noteId,
    pointId,
  },
});

export const removePoint = (noteId: string, pointId: string) => ({
  type: types.REMOVE_POINT,
  payload: {
    noteId,
    pointId,
  },
});

export const addPoint = (
  noteId: string,
): AppThunk => async dispatch => {
  const pointId = idGen();
  const data = { noteId, id: pointId };

  try {
    dispatch({
      type: types.ADD_POINT,
      payload: {
        ...data,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

export const saveNote = (noteId: string): AppThunk => async (
  dispatch,
  getState,
) => {
  const state = getState();
  const note = state.app.notes[noteId];
  const { uid } = state.app.user;
  const points = state.app.points[noteId];

  try {
    firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('notes')
      .doc(noteId)
      .set({
        ...note,
        points,
      });
  } catch (error) {}
};

export const removeNote = (noteId: string): AppThunk => async (
  dispatch,
  getState,
) => {
  const { uid } = getState().app.user;

  try {
    dispatch({
      type: types.REMOVE_NOTE,
      payload: {
        noteId,
      },
    });
    firebase
      .firestore()
      .collection('users')
      .doc(uid)
      .collection('notes')
      .doc(noteId)
      .delete();
  } catch (error) {
    console.log(error);
  }
};

export const logOut = (): AppThunk => async dispatch => {
  try {
    dispatch({
      type: types.LOG_OUT,
    });
    firebase.auth().signOut();
  } catch (error) {
    console.log(error);
  }
};
