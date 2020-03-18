import { User } from 'firebase';
import { UPDATE_USER } from '_actions/app';

export const updateUser = (user: User) => async dispatch => {
  dispatch({
    type: UPDATE_USER,
    payload: user,
  });
};
