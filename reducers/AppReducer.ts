import { User } from 'firebase';
import { UPDATE_USER } from '_actions/app';

interface AppState {
  user: User | null;
}

const initState: AppState = {
  user: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case UPDATE_USER: {
      return { ...state, user: action.payload };
    }
    default:
      return { ...state };
  }
};
