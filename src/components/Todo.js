import React from 'react';
import PropTypes from 'prop-types';

const Todo = ({
  toggle, completed, text, complete,
}) => (
  <li
    onClick={toggle}
    style={ {
      textDecoration: completed ? 'line-through' : 'none',
    }}
  >
    {text}

    <i className="fa fa-times" onClick={complete}></i>
  </li>
);

Todo.propTypes = {
  toggle: PropTypes.func.isRequired,
  completed: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  complete: PropTypes.func.isRequired,
};

export default Todo;
