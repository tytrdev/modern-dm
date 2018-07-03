import { Todos } from '../firebase';
import { FETCH_TODOS } from './types';

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_COMPLETED: 'SHOW_COMPLETED',
  SHOW_ACTIVE: 'SHOW_ACTIVE',
};

export const addTodo = todo => async (dispatch) => {
  Todos.push({
    text: todo,
    completed: false,
  });
};

export const completeTodo = id => async (dispatch) => {
  Todos.child(id).remove();
};

export const fetchTodos = () => async (dispatch) => {
  Todos.on('value', (snapshot) => {
    const items = snapshot.val() || {};
    const todos = [];

    Object.keys(items).forEach((id) => {
      todos.push({
        id,
        text: items[id].text,
        completed: items[id].completed,
      });
    });

    dispatch({
      type: FETCH_TODOS,
      payload: todos,
    });
  });
};

export const toggleTodo = (id, completed) => async (dispatch) => {
  Todos.child(id).update({
    completed,
  });
};

export const setVisibilityFilter = filter => ({
  type: 'SET_VISIBILITY_FILTER',
  filter,
});
