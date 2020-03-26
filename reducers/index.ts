import { combineReducers, Action } from 'redux';
import AppReducer from './AppReducer';
import { ThunkAction } from 'redux-thunk';

const rootReducer = combineReducers({
  app: AppReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
