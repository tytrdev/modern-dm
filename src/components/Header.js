import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import * as actions from '../actions/auth';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  UNSAFE_componentWillMount() {
    this.props.initUser();
  }

  render() {
    const { user, login, logout } = this.props;

    return (
      <div className="app-bar">
        <Link to="/" className="logo-link">
          <i className="fa fa-globe"></i>
        </Link>

        <Link to="/" className="brand-link">
          Modern DM
        </Link>

        {user && (
          <span className="app-actions">
            <span className="active-user">
              {user.displayName}
            </span>

            <a className="logout-button" onClick={logout}>
              <i className="fa fa-sign-out login-icon"></i>
              Logout
            </a>
          </span>
        )}

        {!user && (
          <span className="app-actions">
            <a onClick={login} className="login-button">
              <i className="fa fa-google login-icon"></i>
              Login with Google
            </a>
          </span>
        )}
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object,
  login: PropTypes.func,
  logout: PropTypes.func,
  initUser: PropTypes.func,
};

const mapStateToProps = state => ({
  user: state.user,
});

export default connect(
  mapStateToProps,
  actions,
)(Header);
