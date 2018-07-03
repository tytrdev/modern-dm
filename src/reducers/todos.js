import { Todos } from '../firebase';

const newTodo = action => ({
  text: action.text,
  completed: false,
});

const appendTodo = (state, action) => {
  const created = newTodo(action);
  Todos.push(created);

  return [
    ...state,
    created,
  ];
};

const todos = (state = [], action) => {
  switch (action.type) {
    case 'FETCH_TODOS':
      return action.payload;
    case 'ADD_TODO':
      return appendTodo(state, action);
    case 'TOGGLE_TODO':
      return state.map(todo => ((todo.id === action.id)
        ? { ...todo, completed: !todo.completed }
        : todo));
    default:
      return state;
  }
};

export default todos;
