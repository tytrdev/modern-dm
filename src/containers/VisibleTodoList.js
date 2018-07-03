import { connect } from 'react-redux';
import * as actions from '../actions/todos';
import TodoList from '../components/TodoList';

const getVisibleTodos = (todos, filter) => {
  switch (filter) {
    case actions.VisibilityFilters.SHOW_ALL:
      return todos;
    case actions.VisibilityFilters.SHOW_COMPLETED:
      return todos.filter(t => t.completed);
    case actions.VisibilityFilters.SHOW_ACTIVE:
      return todos.filter(t => !t.completed);
    default:
      throw new Error(`Unknown filter: ${filter}`);
  }
};

const mapStateToProps = state => ({
  todos: getVisibleTodos(state.todos, state.visibilityFilter),
});

// const mapDispatchToProps = dispatch => ({
//   toggleTodo: id => dispatch(toggleTodo(id)),
//   fetchTodos: () => dispatch(fetchTodos(dispatch)),
// });

export default connect(
  mapStateToProps,
  actions,
)(TodoList);
