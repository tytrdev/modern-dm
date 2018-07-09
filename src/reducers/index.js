import { combineReducers } from 'redux';
import auth from './auth';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import { projection } from './geography';
import worlds from './worlds';

export default combineReducers({
  user: auth,
  todos,
  visibilityFilter,
  projection,
  worlds,
});
