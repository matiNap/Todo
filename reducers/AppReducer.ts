import * as types from '_actions/app';
import _ from 'lodash';
import { User } from '_types';
import { REHYDRATE } from 'redux-persist';
import { Point } from '_types';

interface AppState {
  user: User | null;
  notes: {};
  points: Point[];
  syncDate: number;
}

const initState: AppState = {
  user: null,
  notes: {},
  points: [],
  syncDate: 0,
};

export default (state = initState, action) => {
  switch (action.type) {
    case REHYDRATE: {
      const { notes, syncDate, points } =
        action.payload && action.payload.app
          ? action.payload.app
          : initState;
      return { ...state, notes, points, syncDate };
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
      return {
        ...state,
        points: [...state.points, action.payload],
      };
    }
    case types.EDIT_POINT: {
      const { noteId, data } = action.payload;

      return {
        ...state,
        points: state.points.map((currentPoint) => {
          if (currentPoint.id === noteId) {
            return {
              ...currentPoint,
              ...data,
            };
          }
          return currentPoint;
        }),
      };
    }
    case types.REMOVE_POINT: {
      const { pointId } = action.payload;

      return {
        ...state,
        points: _.remove(
          state.points,
          (currentPoint) => currentPoint.id === pointId,
        ),
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
      const { noteId, uri } = action.payload;
      return {
        ...state,
        points: state.points.map((currentPoint) => {
          if (currentPoint.id === noteId) {
            return {
              ...currentPoint,
              imageUri: uri,
            };
          }
          return currentPoint;
        }),
      };
    }
    default:
      return { ...state };
  }
};
