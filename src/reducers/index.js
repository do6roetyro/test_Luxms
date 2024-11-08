import { combineReducers } from 'redux';
import dataReducer from './dataSlice';

const rootReducer = combineReducers({
  data: dataReducer,
});

export default rootReducer;