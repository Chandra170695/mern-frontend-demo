import { combineReducers } from 'redux';
import { authReducer } from './authReducer';
import { characterReducer } from './characterReducer';

export const rootReducer = combineReducers({
  auth: authReducer,
  characters: characterReducer,
});
