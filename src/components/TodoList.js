import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Todo from './Todo';

export default class TodoList extends Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    this.props.fetchTodos();
  }

  render() {
    const { todos } = this.props;

    return (
      <ul>
        {todos.map(todo => <Todo
            key={todo.id}
            {...todo}
            toggle={() => this.props.toggleTodo(todo.id, !todo.completed)}
            complete={() => this.props.completeTodo(todo.id)}
          />)}
      </ul>
    );
  }
}

TodoList.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      completed: PropTypes.bool.isRequired,
      text: PropTypes.string.isRequired,
    }).isRequired,
  ).isRequired,
  toggleTodo: PropTypes.func.isRequired,
  fetchTodos: PropTypes.func.isRequired,
  completeTodo: PropTypes.func.isRequired,
};
