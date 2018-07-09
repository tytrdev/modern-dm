import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as Auth from '../actions/auth';
import * as Geography from '../actions/geography';
import World from './world/World';

const Welcome = ({
  user, login, logout, toggleProjection,
}) => (
  <div className="flex welcome">
    <World center target={'.welcome'}></World>

    <div className="welcome-banner">
      <span className="header">
        Welcome to Modern DM!
      </span>

      <button onClick={toggleProjection} className="create-now">
        <span>
          Start creating your world now!
        </span>
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

const mapDispatchToProps = dispatch => ({
  login: () => dispatch(Auth.login(dispatch)),
  logout: () => dispatch(Auth.logout(dispatch)),
  toggleProjection: () => dispatch(Geography.toggleProjection(dispatch)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Welcome);
