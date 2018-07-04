import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as actions from '../actions/auth';
import { toggleProjection } from '../actions/geography';
import BlankWorld from './geography/BlankWorld';

const Welcome = ({
  user, login, logout, toggleProjection,
}) => (
  <div className="flex welcome">
    <BlankWorld></BlankWorld>

    <div className="welcome-banner">
      <span className="header">
        Welcome to Modern DM!
      </span>

      <button onClick={toggleProjection} className="create-now">
        Start creating your first world now
      </button>
    </div>
  </div>
);

Welcome.propTypes = {
  user: PropTypes.object,
  login: PropTypes.func,
  logout: PropTypes.func,
  toggleProjection: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  [
    ...actions,
    toggleProjection,
  ],
)(Welcome);
