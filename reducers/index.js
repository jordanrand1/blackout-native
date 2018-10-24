import { combineReducers } from 'redux';
import codapi from './codapi';
import search from './search';

const rootReducer = combineReducers({
  codapi,
  search,
});

export default rootReducer;

