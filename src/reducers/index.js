import { combineReducers } from 'redux';
import auth from './auth';
import todos from './todos';
import visibilityFilter from './visibilityFilter';
import { projection } from './geography';

export default combineReducers({
  user: auth,
  todos,
  visibilityFilter,
  projection,
});
