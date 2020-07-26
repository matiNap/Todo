import * as types from '_actions/app';
import _ from 'lodash';
import { User } from '_types';
import { REHYDRATE } from 'redux-persist';

interface AppState {
  user: User | null | string;
  notes: {};
  points: {};
  syncDate: number;
}

const initState: AppState = {
  user: null,
  notes: {},
  points: {},
  syncDate: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case REHYDRATE: {
      if (action.payload) {
        const { notes, syncDate, points } = action.payload.app;
        return { ...state, notes, points, syncDate };
      } else return { ...state };
    }
    case types.SYNC_DATA: {
      return { ...state, syncDate: action.payload.syncDate };
    }
    case types.UPDATE_USER: {
      return { ...state, user: action.payload };
    }
    case types.ADD_NOTE: {
      const { noteId, date, title, points } = action.payload;
      return {
        ...state,
        notes: {
          ...state.notes,
          [noteId]: {
            title,
            date,
            noteId,
          },
        },
        points: {
          ...state.points,
          [noteId]: points,
        },
      };
    }
    case types.ADD_POINT: {
      const { noteId, id } = action.payload;
      const oldPoints = state.points[noteId]
        ? state.points[noteId]
        : [];
      return {
        ...state,
        points: {
          ...state.points,
          [noteId]: {
            ...oldPoints,
            [id]: {
              title: 'new todo',
              id,
              done: false,
              iid: Object.values(oldPoints).length,
            },
          },
        },
      };
    }
    case types.EDIT_POINT: {
      const { noteId, pointId, data } = action.payload;

      return {
        ...state,
        points: {
          ...state.points,
          [noteId]: {
            ...state.points[noteId],
            [pointId]: {
              ...state.points[noteId][pointId],
              ...data,
            },
          },
        },
      };
    }
    case types.REMOVE_POINT: {
      const { noteId, pointId } = action.payload;

      return {
        ...state,
        points: {
          ...state.points,
          [noteId]: _.omit(state.points[noteId], [pointId]),
        },
      };
    }
    case types.REMOVE_NOTE: {
      const { noteId } = action.payload;
      return { ...state, notes: _.omit(state.notes, [noteId]) };
    }
    case types.LOG_OUT: {
      return { ...initState };
    }
    case types.ADD_IMAGE: {
      const { noteId, pointId, uri } = action.payload;
      return {
        ...state,
        points: {
          ...state.points,
          [noteId]: {
            ...state.points[noteId],
            [pointId]: {
              ...state.points[noteId][pointId],
              imageUri: uri,
            },
          },
        },
      };
    }
    case types.LOG_OUT_GUEST: {
      return { ...state, user: null };
    }
    default:
      return { ...state };
  }
};
